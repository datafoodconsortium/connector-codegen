import { Semanticable } from "@virtual-assembly/semantizer";
import IConnectorExporterOptions from "./IConnectorExporterOptions";

export default interface IConnectorExporter {

    export(semanticObjets: Array<Semanticable>, options?: IConnectorExporterOptions): Promise<string>;
    
}