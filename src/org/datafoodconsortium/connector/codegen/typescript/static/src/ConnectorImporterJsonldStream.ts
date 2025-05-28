import { JsonLdParser } from "jsonld-streaming-parser";
import { Readable } from 'readable-stream';
import DatasetExt from "rdf-ext/lib/Dataset";
import datasetFactory from 'rdf-ext';
import QuadExt from "rdf-ext/lib/Quad";

import IConnectorImporter from "./IConnectorImporter";
import IConnectorImporterOptions from "./IConnectorImporterOptions";
import IConnectorImportObserver from "./IConnectorImportObserver";
import { Observable } from "./observer.js";

export default class ConnectorImporterJsonldStream extends Observable<DatasetExt[]> implements IConnectorImporter {

    private context: string | undefined;
    private documentLoader: any;

    // TODO: add the optional parameters of the JsonLdParser class.
    public constructor(parameters?: { context?: any, documentLoader?: any }) {
        super();
        this.context = parameters?.context;
        this.documentLoader = parameters?.documentLoader;
    }

    public async import(json: string, options?: IConnectorImporterOptions): Promise<Array<DatasetExt>> {
        const context = options?.context? options.context : this.context;
        const parser = new JsonLdParser({ context: context, documentLoader: this.documentLoader });

        // imported datasets results.
        const datasets: Array<DatasetExt> = new Array<DatasetExt>();

        // imported blank nodes.
        const blankNodes: Array<DatasetExt> = new Array<DatasetExt>();
        
        // Map<blank node name, index in the blankNodes array>.
        const blankNodesIndex: Map<string, number> = new Map<string, number>();
        
        // Holds the dataset(s) which contain quad(s) pointing to blank node(s).
        const datasetsWithMissingBlankNodes: Map<string, DatasetExt> = new Map<string, DatasetExt>();

        // Make a stream with the data to import.
        const input = new Readable();
        input.push(json);
        input.push(null);

        // Start the import processing.
        const output = parser.import(input);
        
        // On each quad imported we fill the appropriate datasets.
        // If the quad is a blank node we add it to the blankNodes array, 
        // otherwise we add it to the datasets array.
        output.on('data', (quad: QuadExt) => {
            const subject: string = quad.subject.value;
            const isBlankNode: boolean = (quad.subject.termType === "BlankNode");

            // Defines the array to add the quad into.
            const source: Array<DatasetExt> = isBlankNode? blankNodes: datasets;

            // We try to find the existing dataset on which this quad belongs to.
            let dataset: DatasetExt | undefined = source.find((dataset) => dataset.some((quad: QuadExt) => quad.subject.value === subject));

            // If this is the first quad of its dataset, we create the dataset.
            if (!dataset) {
                dataset = datasetFactory.dataset();
                const length: number = source.push(dataset);
                
                // For a blank node we also keep a track to it associating 
                // its name to its index in the blankNodes array. This will 
                // be used to attach the blank nodes at the end of the process.
                if (isBlankNode)
                    blankNodesIndex.set(subject, length - 1);
            }
            
            // At this point we have a valid dataset to add the quad to.
            dataset.add(quad);

            // If the quad refers to a blank node, we keep a track of this dataset 
            // so the blank node could be attached later.
            if (quad.object.termType === "BlankNode")
                datasetsWithMissingBlankNodes.set(quad.object.value, dataset);

            // Some other objects could be notified when a quad is imported.
            if (options && options.callbacks)
                options.callbacks.forEach(callback => callback(quad));
        });

        return new Promise((resolve, reject) => {
            // If an error occured during the import process, we reject the promise.
            output.on('error', (error: Error) => reject(error));

            // When the import is done without any error.
            output.on('finish', () => {
                // We atatch the blank nodes to the datasets which refer to them.
                datasetsWithMissingBlankNodes.forEach((dataset, blankNodeName) => {
                    const blankNodeIndex: number | undefined = blankNodesIndex.get(blankNodeName);
                    const errorMessage: string = "An imported object refers to a mising blank node " + blankNodeName + ". Check the imported data.";

                    // We should find a blank node index associated to the blank node name.
                    if (blankNodeIndex !== undefined) {
                        const blankNodeDataset: DatasetExt | undefined = blankNodes.at(blankNodeIndex); // FIXME: requires tsconfig target >= es2022

                        // When we find the blank node we add its quads to the corresponding dataset.
                        if (blankNodeDataset) dataset.addAll(blankNodeDataset);

                        // Otherwise the blank node was not be added to the blankNodes array.
                        else throw new Error(errorMessage);
                    }

                    // Otherwise, the blank node was not been tracked at the dataset creation.
                    else throw new Error(errorMessage);
                });

                // If we are just importing one blank node,
                // we have to add it to the result set.
                if (datasets.length === 0 && blankNodes.length === 1) {
                    datasets.push(blankNodes[0]);
                }

                this.subscribers.forEach((observer: IConnectorImportObserver) => {
                    observer.next(datasets);
                });
                resolve(datasets);
            });
        });
    }

}