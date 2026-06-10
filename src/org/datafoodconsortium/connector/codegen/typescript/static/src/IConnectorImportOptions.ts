import IConnectorFactory from "./IConnectorFactory";
import IConnectorImporter from "./IConnectorImporter";
import IConnectorImporterOptions from "./IConnectorImporterOptions";

export default interface IConnectorImportOptions extends IConnectorImporterOptions {
    
    only?: string;
    limit?: number;
    importer?: IConnectorImporter;
    factory?: IConnectorFactory;
    doNotStore?: boolean;

}