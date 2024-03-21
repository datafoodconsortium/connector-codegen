// External
import { ISemantizer, Semanticable } from "@virtual-assembly/semantizer";

// Static
import IConnectorFactory from "./IConnectorFactory.js";
import IGetterOptions from "./IGetterOptions.js";
import IConnectorExportOptions from "./IConnectorExportOptions.js";
import IConnectorImportOptions from "./IConnectorImportOptions.js";

// Generated Code
import IAddress from "./IAddress";
import IAgent from "./IAgent";
import IAllergenCharacteristic from "./IAllergenCharacteristic";
import ICatalog from "./ICatalog";
import ICatalogItem from "./ICatalogItem";
import ICustomerCategory from "./ICustomerCategory";
import IEnterprise from "./IEnterprise";
import INutrientCharacteristic from "./INutrientCharacteristic";
import IOffer from "./IOffer";
import IOrder from "./IOrder";
import IOrderLine from "./IOrderLine";
import IPerson from "./IPerson";
import IPhysicalCharacteristic from "./IPhysicalCharacteristic";
import IPrice from "./IPrice";
import IQuantity from "./IQuantity";
import ISaleSession from "./ISaleSession";
import ISKOSConcept from "./ISKOSConcept";
import ISuppliedProduct from "./ISuppliedProduct";
import IPlannedConsumptionFlow from "./IPlannedConsumptionFlow.js";
import IPlannedProductionFlow from "./IPlannedProductionFlow.js";
import IPlannedTransformation from "./IPlannedTransformation.js";
import IDefinedProduct from "./IDefinedProduct.js";

export default interface IConnector {
    
    createAddress(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, street?: string, postalCode?: string, city?: string, country?: string }): IAddress;
    createAllergenCharacteristic(parameters: { other?: Semanticable, unit?: ISKOSConcept, value?: number, allergenDimension?: ISKOSConcept }): IAllergenCharacteristic;
    createCatalog(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, maintainers?: IEnterprise[], items?: ICatalogItem[] }): ICatalog;
    createCatalogItem(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, product?: ISuppliedProduct, sku?: string, stockLimitation?: number, offers?: IOffer[], catalogs?: ICatalog[] }): ICatalogItem;
    createCustomerCategory(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, description?: string }): ICustomerCategory;
    createEnterprise(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, localizations?: IAddress[], description?: string, vatNumber?: string, customerCategories?: ICustomerCategory[], catalogs?: ICatalog[], catalogItems?: ICatalogItem[], suppliedProducts?: ISuppliedProduct[] }): IEnterprise;
    createNutrientCharacteristic(parameters: { other?: Semanticable, unit?: ISKOSConcept, value?: number, nutrientDimension?: ISKOSConcept }): INutrientCharacteristic;
    createOffer(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, offeredItem?: ICatalogItem, offeredTo?: ICustomerCategory, price?: IPrice, stockLimitation?: number }): IOffer;
    createOrder(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, number?: string, date?: string, saleSession?: ISaleSession, client?: IAgent, lines?: IOrderLine[] }): IOrder;
    createOrderLine(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: number, price?: IPrice, offer?: IOffer, order?: IOrder }): IOrderLine;
    createPerson(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, firstName?: string, lastName?: string, localizations?: IAddress[], organizations?: IEnterprise[] }): IPerson;
    createPhysicalCharacteristic(parameters: { other?: Semanticable, unit?: ISKOSConcept, value?: number, physicalDimension?: ISKOSConcept }): IPhysicalCharacteristic;
    createPrice(parameters: { other?: Semanticable, value?: number, vatRate?: number, unit?: ISKOSConcept }): IPrice;
    createQuantity(parameters: { other?: Semanticable, unit?: ISKOSConcept, value?: number }): IQuantity;
    createSaleSession(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, beginDate?: string, endDate?: string, quantity?: number, offers?: IOffer[] }): ISaleSession;
    createSuppliedProduct(parameters: { doNotStore?: boolean, semanticId?: string, other?: Semanticable, name?: string, description?: string, productType?: ISKOSConcept, quantity?: IQuantity, alcoholPercentage?: number, lifetime?: string, claims?: ISKOSConcept[], usageOrStorageConditions?: string, allergenCharacteristics?: IAllergenCharacteristic[], nutrientCharacteristics?: INutrientCharacteristic[], physicalCharacteristics?: IPhysicalCharacteristic[], geographicalOrigin?: ISKOSConcept, catalogItems?: ICatalogItem[], certifications?: ISKOSConcept[], natureOrigin?: ISKOSConcept[], partOrigin?: ISKOSConcept[], totalTheoreticalStock?: number }): ISuppliedProduct;
    createPlannedTransformation(parameters: {doNotStore?: boolean, semanticId?: string,other?: Semanticable, transformationType?: ISKOSConcept, consumptionFlow?: IPlannedConsumptionFlow, productionFlow?: IPlannedProductionFlow}): IPlannedTransformation;
    createPlannedConsumptionFlow(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: IQuantity, transformation?: IPlannedTransformation, product?: IDefinedProduct}): IPlannedConsumptionFlow;
    createPlannedProductionFlow(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: IQuantity, transformation?: IPlannedTransformation, product?: ISuppliedProduct}): IPlannedProductionFlow;
   
    export(objects: Array<Semanticable>, options?: IConnectorExportOptions): Promise<string>;
    fetch(semanticObjectId: string, options?: IGetterOptions): Promise<Semanticable | undefined>;
    
    getSemantizer(): ISemantizer;

    // TODO: remove
    getDefaultFactory(): IConnectorFactory;

    import(data: string, options?: IConnectorImportOptions): Promise<Array<Semanticable>>;
    importOne(data: string, options?: IConnectorImportOptions): Promise<Semanticable | undefined>;
    importOneTyped<Type>(data: string, options?: IConnectorImportOptions): Promise<Type | undefined>;
    
    store(semanticObject: Semanticable): void;

}