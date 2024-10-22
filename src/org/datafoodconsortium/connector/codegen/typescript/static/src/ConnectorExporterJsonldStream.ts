import { Semanticable } from "@virtual-assembly/semantizer";
import SerializerJsonld from '@rdfjs/serializer-jsonld-ext';
import { ContextDefinition } from "jsonld";
import { Readable } from 'readable-stream';

import IConnectorExporter from "./IConnectorExporter";
import IConnectorExporterOptions from "./IConnectorExporterOptions";

export default class ConnectorExporterJsonldStream implements IConnectorExporter {

    private context?: ContextDefinition;
    private outputContext?: any;

    public constructor(context?: ContextDefinition, outputContext?: any) {
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
                semanticObjets.forEach((semanticObject) => semanticObject.toRdfDatasetExt().forEach((quad) => input.push(quad)));
                input.push(null)
            }
        });

        const output = serializer.import(input);

        return new Promise<string>((resolve, reject) => {
            output.on('error', (error) => reject(error));
            output.on('data', (json) => {
                if (outputContext) {
                    json["@context"] = outputContext;
                }
                resolve(JSON.stringify(json));
            });
        });
    }

}