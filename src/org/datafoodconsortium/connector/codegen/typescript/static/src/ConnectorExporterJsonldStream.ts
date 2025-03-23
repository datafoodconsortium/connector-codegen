import { Semanticable } from "@virtual-assembly/semantizer";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import Quad from "rdf-ext/lib/Quad";
import { ContextDefinition, ExpandedTermDefinition } from "jsonld";
import { Readable } from 'readable-stream';

import IConnectorExporter from "./IConnectorExporter";
import IConnectorExporterOptions from "./IConnectorExporterOptions";
import IConnectorExportObserver from "./IConnectorExportObserver";
import { Observable } from "./observer.js";

export default class ConnectorExporterJsonldStream extends Observable<string> implements IConnectorExporter {

    private context?: ContextDefinition;
    private outputContext?: any;

    public constructor(context?: ContextDefinition, outputContext?: any) {
        super();
        this.context = context;
        this.outputContext = outputContext;
    }

    public async export(semanticObjets: Array<Semanticable>, options?: IConnectorExporterOptions): Promise<string> {
        const context = options?.inputContext? options.inputContext : this.context;
        const outputContext = options?.outputContext? options.outputContext : this.outputContext;
        const serializer = new SerializerJsonld({ compact: true, context: context });

        const input = new Readable({
            objectMode: true,
            read: () => {
                semanticObjets.forEach((semanticObject) => semanticObject.toRdfDatasetExt().forEach((quad: Quad) => input.push(quad)));
                input.push(null)
            }
        });

        const output = serializer.import(input);

        return new Promise<string>((resolve, reject) => {
            output.on('error', (error: Error) => reject(error));
            output.on('data', (json: ExpandedTermDefinition) => {
                if (outputContext) {
                    json["@context"] = outputContext;
                }
                const serialized = JSON.stringify(json);
                this.subscribers.forEach((observer: IConnectorExportObserver) => {
                    observer.next(serialized);
                });
                resolve(serialized);
            });
        });
    }

}