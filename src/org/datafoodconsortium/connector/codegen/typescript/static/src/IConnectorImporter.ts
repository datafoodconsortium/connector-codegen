import DatasetExt from "rdf-ext/lib/Dataset";
import IConnectorImporterOptions from "./IConnectorImporterOptions";

export default interface IConnectorImporter {

    import(data: string, options?: IConnectorImporterOptions): Promise<Array<DatasetExt>>;
    
}