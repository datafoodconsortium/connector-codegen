import DatasetExt from "rdf-ext/lib/Dataset";
import IConnectorImporterOptions from "./IConnectorImporterOptions";
import { Observable } from "./observer";

export default interface IConnectorImporter extends Observable<DatasetExt[]> {

    import(data: string, options?: IConnectorImporterOptions): Promise<Array<DatasetExt>>;
    
}