// External
import { Semanticable } from "@virtual-assembly/semantizer";
import DatasetExt from "rdf-ext/lib/Dataset.js";
import { DatasetCore } from '@rdfjs/types';

// Static
import IConnector from "./IConnector.js";
import IConnectorFactory, { IConnectorFactoryAddressCreateParams, IConnectorFactoryAllergenCharacteristicCreateParams, IConnectorFactoryCatalogCreateParams, IConnectorFactoryCatalogItemCreateParams, IConnectorFactoryCustomerCategoryCreateParams, IConnectorFactoryDeliveryOptionCreateParams, IConnectorFactoryEnterpriseCreateParams, IConnectorFactoryLocalizedProductCreateParams, IConnectorFactoryNutrientCharacteristicCreateParams, IConnectorFactoryOfferCreateParams, IConnectorFactoryOpeningHoursSpecificationCreateParams, IConnectorFactoryOrderCreateParams, IConnectorFactoryOrderLineCreateParams, IConnectorFactoryPaymentMethodCreateParams, IConnectorFactoryPersonCreateParams, IConnectorFactoryPhoneNumberCreateParams, IConnectorFactoryPhysicalCharacteristicCreateParams, IConnectorFactoryPhysicalPlaceCreateParams, IConnectorFactoryPhysicalProductCreateParams, IConnectorFactoryPickupOptionCreateParams, IConnectorFactoryPlannedConsumptionFlowCreateParams, IConnectorFactoryPlannedLocalConsumptionFlowCreateParams, IConnectorFactoryPlannedLocalProductionFlowCreateParams, IConnectorFactoryPlannedLocalTransformationCreateParams, IConnectorFactoryPlannedProductionFlowCreateParams, IConnectorFactoryPlannedTransformationCreateParams, IConnectorFactoryPriceCreateParams, IConnectorFactoryProductBatchCreateParams, IConnectorFactoryQuantityCreateParams, IConnectorFactoryRealizedConsumptionFlowCreateParams, IConnectorFactoryRealizedProductionFlowCreateParams, IConnectorFactoryRealizedTransformationCreateParams, IConnectorFactoryRealStockCreateParams, IConnectorFactorySaleSessionCreateParams, IConnectorFactorySocialMediaCreateParams, IConnectorFactorySuppliedProductCreateParams, IConnectorFactoryTechnicalProductCreateParams, IConnectorFactoryTheoreticalStockCreateParams, IConnectorFactoryVirtualPlaceCreateParams } from "./IConnectorFactory.js";

// Generated Classes
import Address from "./Address.js";
import AllergenCharacteristic from "./AllergenCharacteristic.js";
import Catalog from "./Catalog.js";
import CatalogItem from "./CatalogItem.js";
import CustomerCategory from "./CustomerCategory.js";
import DeliveryOption from "./DeliveryOption.js";
import Enterprise from "./Enterprise.js";
import NutrientCharacteristic from "./NutrientCharacteristic.js";
import Offer from "./Offer.js";
import Order from "./Order.js";
import OrderLine from "./OrderLine.js";
import Person from "./Person.js";
import PhysicalCharacteristic from "./PhysicalCharacteristic.js";
import Price from "./Price.js";
import SaleSession from "./SaleSession.js";
import SKOSConcept from "./SKOSConcept.js";
import SuppliedProduct from "./SuppliedProduct.js";
import PlannedTransformation from "./PlannedTransformation.js";
import PlannedConsumptionFlow from "./PlannedConsumptionFlow.js";
import PlannedProductionFlow from "./PlannedProductionFlow.js";
import LocalizedProduct from "./LocalizedProduct.js";
import PaymentMethod from "./PaymentMethod.js";
import PhoneNumber from "./PhoneNumber.js";
import PhysicalProduct from "./PhysicalProduct.js";
import PickupOption from "./PickupOption.js";
import PlannedLocalConsumptionFlow from "./PlannedLocalConsumptionFlow.js";
import PlannedLocalProductionFlow from "./PlannedLocalProductionFlow.js";
import PlannedLocalTransformation from "./PlannedLocalTransformation.js";
import ProductBatch from "./ProductBatch.js";
import QuantitativeValue from "./QuantitativeValue.js";
import RealizedConsumptionFlow from "./RealizedConsumptionFlow.js";
import RealizedProductionFlow from "./RealizedProductionFlow.js";
import RealizedTransformation from "./RealizedTransformation.js";
import RealStock from "./RealStock.js";
import SocialMedia from "./SocialMedia.js";
import TechnicalProduct from "./TechnicalProduct.js";
import TheoreticalStock from "./TheoreticalStock.js";
import VirtualPlace from "./VirtualPlace.js";
import PhysicalPlace from "./PhysicalPlace.js";

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
import IDeliveryOption from "./IDeliveryOption.js";
import IPhysicalPlace from "./IPhysicalPlace.js";
import ITechnicalProduct from "./ITechnicalProduct.js";
import IRealStock from "./IRealStock.js";
import ITheoreticalStock from "./ITheoreticalStock.js";
import IOpeningHoursSpecification from "./IOpeningHoursSpecification.js";
import IPhoneNumber from "./IPhoneNumber.js";
import ILocalizedProduct from "./ILocalizedProduct.js";
import IPaymentMethod from "./IPaymentMethod.js";
import IPhysicalProduct from "./IPhysicalProduct.js";
import IPickupOption from "./IPickupOption.js";
import IPlannedLocalConsumptionFlow from "./IPlannedLocalConsumptionFlow.js";
import IPlannedLocalProductionFlow from "./IPlannedLocalProductionFlow.js";
import IPlannedLocalTransformation from "./IPlannedLocalTransformation.js";
import IProductBatch from "./IProductBatch.js";
import IRealizedConsumptionFlow from "./IRealizedConsumptionFlow.js";
import IRealizedProductionFlow from "./IRealizedProductionFlow.js";
import IRealizedTransformation from "./IRealizedTransformation.js";
import ISocialMedia from "./ISocialMedia.js";
import IVirtualPlace from "./IVirtualPlace.js";
import OpeningHoursSpecification from "./OpeningHoursSpecification.js";

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

    public createAddress(parameters: IConnectorFactoryAddressCreateParams): IAddress {
        return new Address({ connector: this.connector, ...parameters });
    }

    public createAllergenCharacteristic(parameters: IConnectorFactoryAllergenCharacteristicCreateParams): IAllergenCharacteristic {
        return new AllergenCharacteristic({ connector: this.connector, ...parameters });
    }

    public createCatalog(parameters: IConnectorFactoryCatalogCreateParams): ICatalog {
        return new Catalog({ connector: this.connector, ...parameters });
    }

    public createCatalogItem(parameters: IConnectorFactoryCatalogItemCreateParams): ICatalogItem {
        return new CatalogItem({ connector: this.connector, ...parameters });
    }

    public createCustomerCategory(parameters: IConnectorFactoryCustomerCategoryCreateParams): ICustomerCategory {
        return new CustomerCategory({ connector: this.connector, ...parameters });
    }

    public createDeliveryOption(parameters: IConnectorFactoryDeliveryOptionCreateParams): IDeliveryOption {
        return new DeliveryOption({ connector: this.connector, ...parameters });
    }

    public createEnterprise(parameters: IConnectorFactoryEnterpriseCreateParams): IEnterprise {
        return new Enterprise({ connector: this.connector, ...parameters });
    }

    public createLocalizedProduct(parameters: IConnectorFactoryLocalizedProductCreateParams): ILocalizedProduct {
        return new LocalizedProduct({ connector: this.connector, ...parameters });
    }

    public createNutrientCharacteristic(parameters: IConnectorFactoryNutrientCharacteristicCreateParams): INutrientCharacteristic {
        return new NutrientCharacteristic({ connector: this.connector, ...parameters });
    }

    public createOffer(parameters: IConnectorFactoryOfferCreateParams): IOffer {
        return new Offer({ connector: this.connector, ...parameters });
    }

    public createOpeningHoursSpecification(parameters: IConnectorFactoryOpeningHoursSpecificationCreateParams): IOpeningHoursSpecification {
        return new OpeningHoursSpecification({ connector: this.connector, ...parameters });
    }

    public createOrder(parameters: IConnectorFactoryOrderCreateParams): IOrder {
        return new Order({ connector: this.connector, ...parameters });
    }

    public createOrderLine(parameters: IConnectorFactoryOrderLineCreateParams): IOrderLine {
        return new OrderLine({ connector: this.connector, ...parameters });
    }

    public createPaymentMethod(parameters: IConnectorFactoryPaymentMethodCreateParams): IPaymentMethod {
        return new PaymentMethod({ connector: this.connector, ...parameters });
    }

    public createPerson(parameters: IConnectorFactoryPersonCreateParams): IPerson {
        return new Person({ connector: this.connector, ...parameters });
    }

    public createPhoneNumber(parameters: IConnectorFactoryPhoneNumberCreateParams): IPhoneNumber {
        return new PhoneNumber({ connector: this.connector, ...parameters });
    }

    public createPhysicalCharacteristic(parameters: IConnectorFactoryPhysicalCharacteristicCreateParams): IPhysicalCharacteristic {
        return new PhysicalCharacteristic({ connector: this.connector, ...parameters });
    }

    public createPhysicalPlace(parameters: IConnectorFactoryPhysicalPlaceCreateParams): IPhysicalPlace {
        return new PhysicalPlace({ connector: this.connector, ...parameters });
    }

    public createPhysicalProduct(parameters: IConnectorFactoryPhysicalProductCreateParams): IPhysicalProduct {
        return new PhysicalProduct({ connector: this.connector, ...parameters });
    }

    public createPickupOption(parameters: IConnectorFactoryPickupOptionCreateParams): IPickupOption {
        return new PickupOption({ connector: this.connector, ...parameters });
    }

    public createPlannedConsumptionFlow(parameters: IConnectorFactoryPlannedConsumptionFlowCreateParams): IPlannedConsumptionFlow {
        return new PlannedConsumptionFlow({ connector: this.connector, ...parameters });
    }

    public createPlannedLocalConsumptionFlow(parameters: IConnectorFactoryPlannedLocalConsumptionFlowCreateParams): IPlannedLocalConsumptionFlow {
        return new PlannedLocalConsumptionFlow({ connector: this.connector, ...parameters });
    }

    public createPlannedLocalProductionFlow(parameters: IConnectorFactoryPlannedLocalProductionFlowCreateParams): IPlannedLocalProductionFlow {
        return new PlannedLocalProductionFlow({ connector: this.connector, ...parameters });
    }

    public createPlannedLocalTransformation(parameters: IConnectorFactoryPlannedLocalTransformationCreateParams): IPlannedLocalTransformation {
        return new PlannedLocalTransformation({ connector: this.connector, ...parameters });
    }

    public createPlannedProductionFlow(parameters: IConnectorFactoryPlannedProductionFlowCreateParams): IPlannedProductionFlow {
        return new PlannedProductionFlow({ connector: this.connector, ...parameters });
    }

    public createPlannedTransformation(parameters: IConnectorFactoryPlannedTransformationCreateParams): IPlannedTransformation {
        return new PlannedTransformation({ connector: this.connector, ...parameters });
    }

    public createPrice(parameters: IConnectorFactoryPriceCreateParams): IPrice {
        return new Price({ connector: this.connector, ...parameters });
    }

    public createProductBatch(parameters: IConnectorFactoryProductBatchCreateParams): IProductBatch {
        return new ProductBatch({ connector: this.connector, ...parameters });
    }

    public createQuantity(parameters: IConnectorFactoryQuantityCreateParams): IQuantity {
        return new QuantitativeValue({ connector: this.connector, ...parameters });
    }

    public createRealizedConsumptionFlow(parameters: IConnectorFactoryRealizedConsumptionFlowCreateParams): IRealizedConsumptionFlow {
        return new RealizedConsumptionFlow({ connector: this.connector, ...parameters });
    }

    public createRealizedProductionFlow(parameters: IConnectorFactoryRealizedProductionFlowCreateParams): IRealizedProductionFlow {
        return new RealizedProductionFlow({ connector: this.connector, ...parameters });
    }

    public createRealizedTransformation(parameters: IConnectorFactoryRealizedTransformationCreateParams): IRealizedTransformation {
        return new RealizedTransformation({ connector: this.connector, ...parameters });
    }

    public createRealStock(parameters: IConnectorFactoryRealStockCreateParams): IRealStock {
        return new RealStock({ connector: this.connector, ...parameters });
    }

    public createSaleSession(parameters: IConnectorFactorySaleSessionCreateParams): ISaleSession {
        return new SaleSession({ connector: this.connector, ...parameters });
    }

    public createSocialMedia(parameters: IConnectorFactorySocialMediaCreateParams): ISocialMedia {
        return new SocialMedia({ connector: this.connector, ...parameters });
    }

    public createSuppliedProduct(parameters: IConnectorFactorySuppliedProductCreateParams): ISuppliedProduct {
        return new SuppliedProduct({ connector: this.connector, ...parameters });
    }

    public createTechnicalProduct(parameters: IConnectorFactoryTechnicalProductCreateParams): ITechnicalProduct {
        return new TechnicalProduct({ connector: this.connector, ...parameters });
    }

    public createTheoreticalStock(parameters: IConnectorFactoryTheoreticalStockCreateParams): ITheoreticalStock {
        return new TheoreticalStock({ connector: this.connector, ...parameters });
    }

    public createVirtualPlace(parameters: IConnectorFactoryVirtualPlaceCreateParams): IVirtualPlace {
        return new VirtualPlace({ connector: this.connector, ...parameters });
    }

    public createFromType(type: string): Semanticable | undefined {
        let result: Semanticable | undefined = undefined;
        const prefix: string = "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#";
        switch (type) {
            case prefix + "Address":
                result = this.createAddress({ semanticId: "" });
                break;

            case prefix + "AllergenCharacteristic":
                result = this.createAllergenCharacteristic({});
                break;

            case prefix + "AsPlannedConsumptionFlow":
                result = this.createPlannedConsumptionFlow({ semanticId: "" });
                break;

            case prefix + "AsPlannedLocalConsumptionFlow":
                result = this.createPlannedLocalConsumptionFlow({ semanticId: "" });
                break;

            case prefix + "AsPlannedLocalProductionFlow":
                result = this.createPlannedLocalProductionFlow({ semanticId: "" });
                break;

            case prefix + "AsPlannedLocalTransformation":
                result = this.createPlannedLocalTransformation({ semanticId: "" });
                break;

            case prefix + "AsPlannedProductionFlow":
                result = this.createPlannedProductionFlow({ semanticId: "" });
                break;

            case prefix + "AsPlannedTransformation":
                result = this.createPlannedTransformation({ semanticId: "" });
                break;

            case prefix + "AsRealizedConsumptionFlow":
                result = this.createRealizedConsumptionFlow({ semanticId: "" });
                break;

            case prefix + "AsRealizedProductionFlow":
                result = this.createRealizedProductionFlow({ semanticId: "" });
                break;

            case prefix + "AsRealizedTransformation":
                result = this.createRealizedTransformation({ semanticId: "" });
                break;

            case prefix + "Catalog":
                result = this.createCatalog({ semanticId: "" });
                break;

            case prefix + "CatalogItem":
                result = this.createCatalogItem({ semanticId: "" });
                break;

            case prefix + "CustomerCategory":
                result = this.createCustomerCategory({ semanticId: "" });
                break;

            case prefix + "DeliveryOption":
                result = this.createDeliveryOption({ semanticId: "" });
                break;

            case prefix + "Enterprise":
                result = this.createEnterprise({ semanticId: "" });
                break;

            case prefix + "LocalizedProduct":
                result = this.createLocalizedProduct({ semanticId: "" });
                break;

            case prefix + "NutrientCharacteristic":
                result = this.createNutrientCharacteristic({});
                break;

            case prefix + "Offer":
                result = this.createOffer({ semanticId: "" });
                break;

            case "https://schema.org/OpeningHoursSpecification":
                result = this.createOpeningHoursSpecification({ semanticId: "" });
                break;

            case prefix + "Order":
                result = this.createOrder({ semanticId: "" });
                break;

            case prefix + "OrderLine":
                result = this.createOrderLine({ semanticId: "" });
                break;

            case prefix + "PaymentMethod":
                result = this.createPaymentMethod({ semanticId: "" });
                break;

            case prefix + "Person":
                result = this.createPerson({ semanticId: "" });
                break;

            case prefix + "PhoneNumber":
                result = this.createPhoneNumber({ semanticId: "" });
                break;

            case prefix + "PhysicalCharacteristic":
                result = this.createPhysicalCharacteristic({});
                break;

            case prefix + "PhysicalPlace":
                result = this.createPhysicalPlace({ semanticId: "" });
                break;

            case prefix + "PhysicalProduct":
                result = this.createPhysicalProduct({ semanticId: "" });
                break;

            case prefix + "PickupOption":
                result = this.createPickupOption({ semanticId: "" });
                break;

            case prefix + "Price":
                result = this.createPrice({});
                break;

            case prefix + "ProductBatch":
                result = this.createProductBatch({ semanticId: "" });
                break;

            case prefix + "QuantitativeValue":
                result = this.createQuantity({});
                break;

            case prefix + "RealStock":
                result = this.createRealStock({ semanticId: "" });
                break;

            case prefix + "SaleSession":
                result = this.createSaleSession({ semanticId: "" });
                break;

            case prefix + "SocialMedia":
                result = this.createSocialMedia({ semanticId: "" });
                break;

            case prefix + "SuppliedProduct":
                result = this.createSuppliedProduct({ semanticId: "" });
                break;

            case prefix + "TechnicalProduct":
                result = this.createTechnicalProduct({ semanticId: "" });
                break;

            case prefix + "TheoreticalStock":
                result = this.createTheoreticalStock({ semanticId: "" });
                break;

            case prefix + "VirtualPlace":
                result = this.createVirtualPlace({ semanticId: "" });
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