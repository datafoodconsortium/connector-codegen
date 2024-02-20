import IConnectorExporter from "./IConnectorExporter";

export default interface IConnectorExportOptions {
    
    exporter?: IConnectorExporter;
    inputContext?: any;
    outputContext?: any;

}