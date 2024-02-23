// External
import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset";
import { DatasetCore } from '@rdfjs/types';

// Generated Interfaces
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

export default interface IConnectorFactory {

    createFromRdfDataset(dataset: DatasetExt): Semanticable | undefined;
    createFromRdfDatasetCore(dataset: DatasetCore): Semanticable | undefined;
    createFromType(type: string): Semanticable | undefined;
    createAddress(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, street?: string, postalCode?: string, city?: string, country?: string}): IAddress;
    createAllergenCharacteristic(parameters: {other?: Semanticable, unit?: ISKOSConcept, value?: number, allergenDimension?: ISKOSConcept}): IAllergenCharacteristic;
    createCatalog(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, maintainers?: IEnterprise[], items?: ICatalogItem[]}): ICatalog;
    createCatalogItem(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, product?: ISuppliedProduct, sku?: string, stockLimitation?: number, offers?: IOffer[], catalogs?: ICatalog[]}): ICatalogItem;
    createCustomerCategory(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, description?: string}): ICustomerCategory;
    createEnterprise(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, localizations?: IAddress[], description?: string, vatNumber?: string, customerCategories?: ICustomerCategory[], catalogs?: ICatalog[], catalogItems?: ICatalogItem[], suppliedProducts?: ISuppliedProduct[]}): IEnterprise;
    createNutrientCharacteristic(parameters: {other?: Semanticable, unit?: ISKOSConcept, value?: number, nutrientDimension?: ISKOSConcept}): INutrientCharacteristic;
    createOffer(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, offeredItem?: ICatalogItem, offeredTo?: ICustomerCategory, price?: IPrice, stockLimitation?: number}): IOffer;
    createOrder(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, number?: string, date?: string, saleSession?: ISaleSession, client?: IAgent, lines?: IOrderLine[]}): IOrder;
    createOrderLine(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: number, price?: IPrice, offer?: IOffer, order?: IOrder}): IOrderLine;
    createPerson(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, firstName?: string, lastName?: string, localizations?: IAddress[], organizations?: IEnterprise[]}): IPerson;
    createPhysicalCharacteristic(parameters: {other?: Semanticable, unit?: ISKOSConcept, value?: number, physicalDimension?: ISKOSConcept}): IPhysicalCharacteristic;
    createPrice(parameters: {other?: Semanticable, value?: number, vatRate?: number, unit?: ISKOSConcept}): IPrice;
    createQuantity(parameters: {other?: Semanticable, unit?: ISKOSConcept, value?: number}): IQuantity;
    createSaleSession(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, beginDate?: string, endDate?: string, quantity?: number, offers?: IOffer[]}): ISaleSession;
    createSuppliedProduct(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, name?: string, description?: string, productType?: ISKOSConcept, quantity?: IQuantity, alcoholPercentage?: number, lifetime?: string, claims?: ISKOSConcept[], usageOrStorageConditions?: string, allergenCharacteristics?: IAllergenCharacteristic[], nutrientCharacteristics?: INutrientCharacteristic[], physicalCharacteristics?: IPhysicalCharacteristic[], geographicalOrigin?: ISKOSConcept, catalogItems?: ICatalogItem[], certifications?: ISKOSConcept[], natureOrigin?: ISKOSConcept[], partOrigin?: ISKOSConcept[], totalTheoreticalStock?: number}): ISuppliedProduct;

}