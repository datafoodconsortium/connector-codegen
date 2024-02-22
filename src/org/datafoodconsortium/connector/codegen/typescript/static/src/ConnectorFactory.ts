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

// Generated Interfaces
import IAgent from "./IAgent.js";
import IAddress from "./IAddress.js";
import IAllergenCharacteristic from "./IAllergenCharacteristic.js";
import IAllergenDimension from "./IAllergenDimension.js";
import ICatalog from "./ICatalog.js";
import ICatalogItem from "./ICatalogItem.js";
import ICertification from "./ICertification.js";
import IClaim from "./IClaim.js";
import ICustomerCategory from "./ICustomerCategory.js";
import IEnterprise from "./IEnterprise.js";
import IGeographicalOrigin from "./IGeographicalOrigin.js";
import IPrice from "./IPrice.js";
import ISuppliedProduct from "./ISuppliedProduct.js";
import INatureOrigin from "./INatureOrigin.js";
import INutrientCharacteristic from "./INutrientCharacteristic.js";
import INutrientDimension from "./INutrientDimension.js";
import IOffer from "./IOffer.js";
import IOrder from "./IOrder.js";
import IOrderLine from "./IOrderLine.js";
import IPartOrigin from "./IPartOrigin.js";
import IPerson from "./IPerson.js";
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js";
import IPhysicalDimension from "./IPhysicalDimension.js";
import IProductType from "./IProductType.js";
import IQuantity from "./IQuantity.js";
import ISaleSession from "./ISaleSession.js";
import IUnit from "./IUnit.js";


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

    public createAllergenCharacteristic(parameters: {other?: Semanticable, unit?: IUnit, value?: number, allergenDimension?: IAllergenDimension}): IAllergenCharacteristic {
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

    public createNutrientCharacteristic(parameters: {other?: Semanticable, unit?: IUnit, value?: number, nutrientDimension?: INutrientDimension}): INutrientCharacteristic {
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

    public createPhysicalCharacteristic(parameters: {other?: Semanticable, unit?: IUnit, value?: number, physicalDimension?: IPhysicalDimension}): IPhysicalCharacteristic {
        return new PhysicalCharacteristic({ connector: this.connector, ...parameters });
    }

    public createPrice(parameters: {other?: Semanticable, value?: number, vatRate?: number, unit?: IUnit}): IPrice {
        return new Price({ connector: this.connector, ...parameters });
    }

    public createQuantity(parameters: {other?: Semanticable, unit?: IUnit, value?: number}): IQuantity {
        return new QuantitativeValue({ connector: this.connector, ...parameters });
    }

    public createSaleSession(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, beginDate?: string, endDate?: string, quantity?: number, offers?: IOffer[]}): ISaleSession {
        return new SaleSession({ connector: this.connector, ...parameters });
    }

    public createSuppliedProduct(parameters: {doNotStore?: boolean, semanticId?: string, other?: Semanticable, name?: string, description?: string, productType?: IProductType, quantity?: IQuantity, alcoholPercentage?: number, lifetime?: string, claims?: IClaim[], usageOrStorageConditions?: string, allergenCharacteristics?: IAllergenCharacteristic[], nutrientCharacteristics?: INutrientCharacteristic[], physicalCharacteristics?: IPhysicalCharacteristic[], geographicalOrigin?: IGeographicalOrigin, catalogItems?: ICatalogItem[], certifications?: ICertification[], natureOrigin?: INatureOrigin[], partOrigin?: IPartOrigin[], totalTheoreticalStock?: number}): ISuppliedProduct {
        return new SuppliedProduct({ connector: this.connector, ...parameters });
    }

    public createFromType(type: string): Semanticable | undefined {
        let result: Semanticable | undefined = undefined;
        const prefix: string = "http://static.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#";
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

            case prefix + "SaleSession":
                result = this.createSaleSession({ semanticId: "" });
                break;

            case "http://www.w3.org/2004/02/skos/core#Concept":
                result = new SKOSConcept({ connector: this.connector });
                break;

            case "http://www.w3.org/2004/02/skos/core#ConceptScheme":
                result = new SKOSConcept({ connector: this.connector });
                // @ts-ignore
                result._semanticType = "http://www.w3.org/2004/02/skos/core#ConceptScheme";
                break;
        
            default:
                console.log(type);
                break;
        }

        //if (!result)
          //  throw new Error;

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