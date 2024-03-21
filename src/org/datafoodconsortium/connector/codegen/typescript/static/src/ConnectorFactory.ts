// External
import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset.js";
import { DatasetCore } from '@rdfjs/types';

// Static
import IConnector from "./IConnector.js";
import IConnectorFactory from "./IConnectorFactory.js";

// Generated Classes
import Address from "./Address.js";
import AllergenCharacteristic from "./AllergenCharacteristic.js";
import Catalog from "./Catalog.js";
import CatalogItem from "./CatalogItem.js";
import CustomerCategory from "./CustomerCategory.js";
import Enterprise from "./Enterprise.js";
import NutrientCharacteristic from "./NutrientCharacteristic.js";
import Offer from "./Offer.js";
import Order from "./Order.js";
import OrderLine from "./OrderLine.js";
import Person from "./Person.js";
import PhysicalCharacteristic from "./PhysicalCharacteristic.js";
import Price from "./Price.js";
import QuantitativeValue from "./QuantitativeValue.js";
import SaleSession from "./SaleSession.js";
import SKOSConcept from "./SKOSConcept.js";
import SuppliedProduct from "./SuppliedProduct.js";
import PlannedTransformation from "./PlannedTransformation.js";
import PlannedConsumptionFlow from "./PlannedConsumptionFlow.js";
import PlannedProductionFlow from "./PlannedProductionFlow.js";

// Generated Interfaces
import IAgent from "./IAgent.js";
import IAddress from "./IAddress.js";
import IAllergenCharacteristic from "./IAllergenCharacteristic.js";
import ICatalog from "./ICatalog.js";
import ICatalogItem from "./ICatalogItem.js";
import ICustomerCategory from "./ICustomerCategory.js";
import IEnterprise from "./IEnterprise.js";
import IPrice from "./IPrice.js";
import ISuppliedProduct from "./ISuppliedProduct.js";
import INutrientCharacteristic from "./INutrientCharacteristic.js";
import IOffer from "./IOffer.js";
import IOrder from "./IOrder.js";
import IOrderLine from "./IOrderLine.js";
import IPerson from "./IPerson.js";
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js";
import IQuantity from "./IQuantity.js";
import ISaleSession from "./ISaleSession.js";
import ISKOSConcept from "./ISKOSConcept.js";
import IPlannedConsumptionFlow from "./IPlannedConsumptionFlow.js";
import IPlannedProductionFlow from "./IPlannedProductionFlow.js";
import IPlannedTransformation from "./IPlannedTransformation.js";
import IDefinedProduct from "./IDefinedProduct.js";

export default class ConnectorFactory implements IConnectorFactory {

    private connector: IConnector;

    public constructor(connector: IConnector) {
        this.connector = connector;
    }

    public createFromRdfDatasetCore(dataset: DatasetCore): Semanticable | undefined {
        const datasetExt = new DatasetExt();
        datasetExt.addAll(dataset);
        return this.createFromRdfDataset(datasetExt);
    }
    
    public createAddress(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, street?: string, postalCode?: string, city?: string, country?: string}): IAddress {
        return new Address({ connector: this.connector, ...parameters });
    }

    public createAllergenCharacteristic(parameters: {other?: Semanticable, unit?: ISKOSConcept, value?: number, allergenDimension?: ISKOSConcept}): IAllergenCharacteristic {
        return new AllergenCharacteristic({ connector: this.connector, ...parameters });
    }

    public createCatalog(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, maintainers?: IEnterprise[], items?: ICatalogItem[]}): ICatalog {
        return new Catalog({ connector: this.connector, ...parameters });
    }

    public createCatalogItem(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, product?: ISuppliedProduct, sku?: string, stockLimitation?: number, offers?: IOffer[], catalogs?: ICatalog[]}): ICatalogItem {
        return new CatalogItem({ connector: this.connector, ...parameters });
    }

    public createCustomerCategory(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, description?: string}): ICustomerCategory {
        return new CustomerCategory({ connector: this.connector, ...parameters });
    }

    public createEnterprise(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, localizations?: IAddress[], description?: string, vatNumber?: string, customerCategories?: ICustomerCategory[], catalogs?: ICatalog[], catalogItems?: ICatalogItem[], suppliedProducts?: ISuppliedProduct[]}): IEnterprise {
        return new Enterprise({ connector: this.connector, ...parameters });
    }

    public createNutrientCharacteristic(parameters: {other?: Semanticable, unit?: ISKOSConcept, value?: number, nutrientDimension?: ISKOSConcept}): INutrientCharacteristic {
        return new NutrientCharacteristic({ connector: this.connector, ...parameters });
    }

    public createOffer(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, offeredItem?: ICatalogItem, offeredTo?: ICustomerCategory, price?: IPrice, stockLimitation?: number}): IOffer {
        return new Offer({ connector: this.connector, ...parameters });
    }

    public createOrder(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, number?: string, date?: string, saleSession?: ISaleSession, client?: IAgent, lines?: IOrderLine[]}): IOrder {
        return new Order({ connector: this.connector, ...parameters });
    }

    public createOrderLine(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: number, price?: IPrice, offer?: IOffer, order?: IOrder}): IOrderLine {
        return new OrderLine({ connector: this.connector, ...parameters });
    }

    public createPerson(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, firstName?: string, lastName?: string, localizations?: IAddress[], organizations?: IEnterprise[]}): IPerson {
        return new Person({ connector: this.connector, ...parameters });
    }

    public createPhysicalCharacteristic(parameters: {other?: Semanticable, unit?: ISKOSConcept, value?: number, physicalDimension?: ISKOSConcept }): IPhysicalCharacteristic {
        return new PhysicalCharacteristic({ connector: this.connector, ...parameters });
    }

    public createPrice(parameters: {other?: Semanticable, value?: number, vatRate?: number, unit?: ISKOSConcept}): IPrice {
        return new Price({ connector: this.connector, ...parameters });
    }

    public createQuantity(parameters: {other?: Semanticable, unit?: ISKOSConcept, value?: number}): IQuantity {
        return new QuantitativeValue({ connector: this.connector, ...parameters });
    }

    public createSaleSession(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, beginDate?: string, endDate?: string, quantity?: number, offers?: IOffer[]}): ISaleSession {
        return new SaleSession({ connector: this.connector, ...parameters });
    }

    public createSuppliedProduct(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, name?: string, description?: string, productType?: ISKOSConcept, quantity?: IQuantity, alcoholPercentage?: number, lifetime?: string, claims?: ISKOSConcept[], usageOrStorageConditions?: string, allergenCharacteristics?: IAllergenCharacteristic[], nutrientCharacteristics?: INutrientCharacteristic[], physicalCharacteristics?: IPhysicalCharacteristic[], geographicalOrigin?: ISKOSConcept, catalogItems?: ICatalogItem[], certifications?: ISKOSConcept[], natureOrigin?: ISKOSConcept[], partOrigin?: ISKOSConcept[], totalTheoreticalStock?: number}): ISuppliedProduct {
        return new SuppliedProduct({ connector: this.connector, ...parameters });
    }

    public createPlannedTransformation(parameters: {doNotStore?: boolean, semanticId?: string,other?: Semanticable, transformationType?: ISKOSConcept, consumptionFlow?: IPlannedConsumptionFlow, productionFlow?: IPlannedProductionFlow}): IPlannedTransformation {
        return new PlannedTransformation({ connector: this.connector, ...parameters });
    }

    public createPlannedConsumptionFlow(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: IQuantity, transformation?: IPlannedTransformation, product?: IDefinedProduct}): IPlannedConsumptionFlow {
        return new PlannedConsumptionFlow({ connector: this.connector, ...parameters });
    }

    public createPlannedProductionFlow(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, quantity?: IQuantity, transformation?: IPlannedTransformation, product?: ISuppliedProduct}): IPlannedProductionFlow {
        return new PlannedProductionFlow({ connector: this.connector, ...parameters });
    }

    public createFromType(type: string): Semanticable | undefined {
        let result: Semanticable | undefined = undefined;
        const prefix: string = "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#";
        switch (type) {
            case prefix + "Enterprise":
                result = this.createEnterprise({ semanticId: "" });
                break;
            
            case prefix + "Address":
                result = this.createAddress({ semanticId: "" });
                break;

            case prefix + "Person":
                result = this.createPerson({ semanticId: "" });
                break;
            
            case prefix + "CustomerCategory":
                result = this.createCustomerCategory({ semanticId: "" });
                break;

            case prefix + "QuantitativeValue":
                result = this.createQuantity({});
                break;
            
            case prefix + "AllergenCharacteristic":
                result = this.createAllergenCharacteristic({});
                break;

            case prefix + "NutrientCharacteristic":
                result = this.createNutrientCharacteristic({});
                break;
            
            case prefix + "PhysicalCharacteristic":
                result = this.createPhysicalCharacteristic({});
                break;

            case prefix + "SuppliedProduct":
                result = this.createSuppliedProduct({ semanticId: "" });
                break;
            
            case prefix + "Price":
                result = this.createPrice({});
                break;

            case prefix + "Catalog":
                result = this.createCatalog({ semanticId: "" });
                break;

            case prefix + "CatalogItem":
                result = this.createCatalogItem({ semanticId: "" });
                break;
            
            case prefix + "Offer":
                result = this.createOffer({ semanticId: "" });
                break;

            case prefix + "Order":
                result = this.createOrder({ semanticId: "" });
                break;

            case prefix + "OrderLine":
                result = this.createOrderLine({ semanticId: "" });
                break;

            case prefix + "AsPlannedTransformation":
                result = this.createPlannedTransformation({ semanticId: "" });
                break;
            
            case prefix + "AsPlannedConsumptionFlow":
                result = this.createPlannedConsumptionFlow({ semanticId: "" });
                break;
            
            case prefix + "AsPlannedProductionFlow":
                result = this.createPlannedProductionFlow({ semanticId: "" });
                break;

            case prefix + "SaleSession":
                result = this.createSaleSession({ semanticId: "" });
                break;

            case "http://www.w3.org/2004/02/skos/core#Concept":
                result = new SKOSConcept({ connector: this.connector, semanticId: "" });
                break;

            case "http://www.w3.org/2004/02/skos/core#ConceptScheme":
                result = new SKOSConcept({ connector: this.connector, semanticId: "" });
                // @ts-ignore
                result._semanticType = "http://www.w3.org/2004/02/skos/core#ConceptScheme";
                break;
        
            default:
                throw new Error(`Unknown type "${type}"`);
        }
    
        return result;
    }

    public createFromRdfDataset(dataset: DatasetExt): Semanticable | undefined {
        const rdfType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
        const quad = Array.from(dataset.filter((quad: any) => quad.predicate.value === rdfType))[0];
        const type = quad.object.value;
        const semanticObject: Semanticable | undefined = this.createFromType(type);
        if (semanticObject) 
            semanticObject.setSemanticPropertyAllFromRdfDataset(dataset);
        return semanticObject;
    }
    
}