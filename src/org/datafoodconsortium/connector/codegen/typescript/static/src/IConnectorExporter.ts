import { Semanticable } from "@virtual-assembly/semantizer";
import IConnectorExporterOptions from "./IConnectorExporterOptions";
import { Observable, Subscription } from "./observer";
import IConnectorExportObserver from "./IConnectorExportObserver";

export default interface IConnectorExporter extends Observable<string> {

    export(semanticObjets: Array<Semanticable>, options?: IConnectorExporterOptions): Promise<string>;

    subscribe(observer: IConnectorExportObserver): Subscription;
}