import DatasetExt from "rdf-ext/lib/Dataset";
import IConnectorImporterOptions from "./IConnectorImporterOptions";
import { Observable, Subscription } from "./observer";
import IConnectorImportObserver from "./IConnectorImportObserver";

export default interface IConnectorImporter extends Observable<DatasetExt[]> {

    import(data: string, options?: IConnectorImporterOptions): Promise<Array<DatasetExt>>;

    subscribe(observer: IConnectorImportObserver): Subscription;
}