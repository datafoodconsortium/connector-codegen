// External
import { ISemantizer, Semanticable } from "@virtual-assembly/semantizer";

// Static
import IConnectorFactory from "./IConnectorFactory.js";
import IGetterOptions from "./IGetterOptions.js";
import IConnectorExportOptions from "./IConnectorExportOptions.js";
import IConnectorImportOptions from "./IConnectorImportOptions.js";

export default interface IConnector extends IConnectorFactory {

    export(objects: Array<Semanticable>, options?: IConnectorExportOptions): Promise<string>;
    fetch(semanticObjectId: string, options?: IGetterOptions): Promise<Semanticable | undefined>;

    getSemantizer(): ISemantizer;

    // TODO: remove
    getDefaultFactory(): IConnectorFactory;

    import(data: string, options?: IConnectorImportOptions): Promise<Array<Semanticable>>;
    importOne(data: string, options?: IConnectorImportOptions): Promise<Semanticable | undefined>;
    importOneTyped<Type>(data: string, options?: IConnectorImportOptions): Promise<Type | undefined>;

    store(semanticObject: Semanticable): void;
    removeFromStore(semanticObjectId: string): void;

}

export interface IConnectorCreateParams {
    semanticId: string;
    doNotStore?: boolean;
}