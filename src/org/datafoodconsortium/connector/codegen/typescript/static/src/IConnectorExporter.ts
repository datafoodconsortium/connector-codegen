import { Semanticable } from "@virtual-assembly/semantizer";
import IConnectorExporterOptions from "./IConnectorExporterOptions";
import { Observable } from "./Observable";

export default interface IConnectorExporter extends Observable<string> {

    export(semanticObjets: Array<Semanticable>, options?: IConnectorExporterOptions): Promise<string>;
    
}