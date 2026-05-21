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
import IPlannedConsumptionFlow from "./IPlannedConsumptionFlow";
import IPlannedProductionFlow from "./IPlannedProductionFlow";
import IPlannedTransformation from "./IPlannedTransformation";
import IDefinedProduct from "./IDefinedProduct";
import IDeliveryOption from "./IDeliveryOption";
import IPhysicalPlace from "./IPhysicalPlace";
import ITechnicalProduct from "./ITechnicalProduct";
import IRealStock from "./IRealStock";
import ITheoreticalStock from "./ITheoreticalStock";
import IPhoneNumber from "./IPhoneNumber";
import IOpeningHoursSpecification from "./IOpeningHoursSpecification";
import IPhysicalProduct from "./IPhysicalProduct";
import IPlannedLocalConsumptionFlow from "./IPlannedLocalConsumptionFlow";
import IPlannedLocalProductionFlow from "./IPlannedLocalProductionFlow";
import ILocalizedProduct from "./ILocalizedProduct";
import IPaymentMethod from "./IPaymentMethod";
import IProductBatch from "./IProductBatch";
import IRealizedConsumptionFlow from "./IRealizedConsumptionFlow";
import IRealizedProductionFlow from "./IRealizedProductionFlow";
import IPickupOption from "./IPickupOption";
import IPlannedLocalTransformation from "./IPlannedLocalTransformation";
import IRealizedTransformation from "./IRealizedTransformation";
import ISocialMedia from "./ISocialMedia";
import IVirtualPlace from "./IVirtualPlace";

export default interface IConnectorFactory {
    createFromRdfDataset(dataset: DatasetExt): Semanticable | undefined;
    createFromRdfDatasetCore(dataset: DatasetCore): Semanticable | undefined;
    createFromType(type: string): Semanticable | undefined;

    createAddress(parameters: IConnectorFactoryAddressCreateParams): IAddress;
    createAllergenCharacteristic(parameters: IConnectorFactoryAllergenCharacteristicCreateParams): IAllergenCharacteristic;
    createCatalog(parameters: IConnectorFactoryCatalogCreateParams): ICatalog;
    createCatalogItem(parameters: IConnectorFactoryCatalogItemCreateParams): ICatalogItem;
    createCustomerCategory(parameters: IConnectorFactoryCustomerCategoryCreateParams): ICustomerCategory;
    createDeliveryOption(parameters: IConnectorFactoryDeliveryOptionCreateParams): IDeliveryOption;
    createEnterprise(parameters: IConnectorFactoryEnterpriseCreateParams): IEnterprise;
    createLocalizedProduct(parameters: IConnectorFactoryLocalizedProductCreateParams): ILocalizedProduct;
    createNutrientCharacteristic(parameters: IConnectorFactoryNutrientCharacteristicCreateParams): INutrientCharacteristic;
    createOffer(parameters: IConnectorFactoryOfferCreateParams): IOffer;
    createOpeningHoursSpecification(parameters: IConnectorFactoryOpeningHoursSpecificationCreateParams): IOpeningHoursSpecification;
    createOrder(parameters: IConnectorFactoryOrderCreateParams): IOrder;
    createOrderLine(parameters: IConnectorFactoryOrderLineCreateParams): IOrderLine;
    createPaymentMethod(parameters: IConnectorFactoryPaymentMethodCreateParams): IPaymentMethod;
    createPerson(parameters: IConnectorFactoryPersonCreateParams): IPerson;
    createPhoneNumber(parameters: IConnectorFactoryPhoneNumberCreateParams): IPhoneNumber;
    createPhysicalCharacteristic(parameters: IConnectorFactoryPhysicalCharacteristicCreateParams): IPhysicalCharacteristic;
    createPhysicalPlace(parameters: IConnectorFactoryPhysicalPlaceCreateParams): IPhysicalPlace;
    createPhysicalProduct(parameters: IConnectorFactoryPhysicalProductCreateParams): IPhysicalProduct;
    createPickupOption(parameters: IConnectorFactoryPickupOptionCreateParams): IPickupOption;
    createPlannedConsumptionFlow(parameters: IConnectorFactoryPlannedConsumptionFlowCreateParams): IPlannedConsumptionFlow;
    createPlannedLocalConsumptionFlow(parameters: IConnectorFactoryPlannedLocalConsumptionFlowCreateParams): IPlannedLocalConsumptionFlow;
    createPlannedLocalProductionFlow(parameters: IConnectorFactoryPlannedLocalProductionFlowCreateParams): IPlannedLocalProductionFlow;
    createPlannedLocalTransformation(parameters: IConnectorFactoryPlannedLocalTransformationCreateParams): IPlannedLocalTransformation;
    createPlannedProductionFlow(parameters: IConnectorFactoryPlannedProductionFlowCreateParams): IPlannedProductionFlow;
    createPlannedTransformation(parameters: IConnectorFactoryPlannedTransformationCreateParams): IPlannedTransformation;
    createPrice(parameters: IConnectorFactoryPriceCreateParams): IPrice;
    createProductBatch(parameters: IConnectorFactoryProductBatchCreateParams): IProductBatch;
    createQuantity(parameters: IConnectorFactoryQuantityCreateParams): IQuantity;
    createRealizedConsumptionFlow(parameters: IConnectorFactoryRealizedConsumptionFlowCreateParams): IRealizedConsumptionFlow;
    createRealizedProductionFlow(parameters: IConnectorFactoryRealizedProductionFlowCreateParams): IRealizedProductionFlow;
    createRealizedTransformation(parameters: IConnectorFactoryRealizedTransformationCreateParams): IRealizedTransformation;
    createRealStock(parameters: IConnectorFactoryRealStockCreateParams): IRealStock;
    createSaleSession(parameters: IConnectorFactorySaleSessionCreateParams): ISaleSession;
    createSocialMedia(parameters: IConnectorFactorySocialMediaCreateParams): ISocialMedia;
    createSuppliedProduct(parameters: IConnectorFactorySuppliedProductCreateParams): ISuppliedProduct;
    createTechnicalProduct(parameters: IConnectorFactoryTechnicalProductCreateParams): ITechnicalProduct;
    createTheoreticalStock(parameters: IConnectorFactoryTheoreticalStockCreateParams): ITheoreticalStock;
    createVirtualPlace(parameters: IConnectorFactoryVirtualPlaceCreateParams): IVirtualPlace;
}

export type IConnectorFactoryAddressCreateParams = IConnectorFactoryCreateParams & AddressCreateParams;
export type IConnectorFactoryAllergenCharacteristicCreateParams = IConnectorFactoryCreateParamsBlankNode & AllergenCharacteristicCreateParams;
export type IConnectorFactoryCatalogCreateParams = IConnectorFactoryCreateParams & CatalogCreateParams;
export type IConnectorFactoryCatalogItemCreateParams = IConnectorFactoryCreateParams & CatalogItemCreateParams;
export type IConnectorFactoryCustomerCategoryCreateParams = IConnectorFactoryCreateParams & CustomerCategoryCreateParams;
export type IConnectorFactoryDeliveryOptionCreateParams = IConnectorFactoryCreateParams & DeliveryOptionCreateParams;
export type IConnectorFactoryEnterpriseCreateParams = IConnectorFactoryCreateParams & EnterpriseCreateParams;
export type IConnectorFactoryLocalizedProductCreateParams = IConnectorFactoryCreateParams & LocalizedProductCreateParams;
export type IConnectorFactoryNutrientCharacteristicCreateParams = IConnectorFactoryCreateParams & NutrientCharacteristicCreateParams;
export type IConnectorFactoryOfferCreateParams = IConnectorFactoryCreateParams & OfferCreateParams;
export type IConnectorFactoryOpeningHoursSpecificationCreateParams = IConnectorFactoryCreateParams & OpeningHoursSpecificationCreateParams;
export type IConnectorFactoryOrderCreateParams = IConnectorFactoryCreateParams & OrderCreateParams;
export type IConnectorFactoryOrderLineCreateParams = IConnectorFactoryCreateParams & OrderLineCreateParams;
export type IConnectorFactoryPaymentMethodCreateParams = IConnectorFactoryCreateParams & PaymentMethodCreateParams;
export type IConnectorFactoryPersonCreateParams = IConnectorFactoryCreateParams & PersonCreateParams;
export type IConnectorFactoryPhoneNumberCreateParams = IConnectorFactoryCreateParams & PhoneNumberCreateParams;
export type IConnectorFactoryPhysicalCharacteristicCreateParams = IConnectorFactoryCreateParamsBlankNode & PhysicalCharacteristicCreateParams;
export type IConnectorFactoryPhysicalPlaceCreateParams = IConnectorFactoryCreateParams & PhysicalPlaceCreateParams;
export type IConnectorFactoryPhysicalProductCreateParams = IConnectorFactoryCreateParams & PhysicalProductCreateParams;
export type IConnectorFactoryPickupOptionCreateParams = IConnectorFactoryCreateParams & PickupOptionCreateParams;
export type IConnectorFactoryPlannedConsumptionFlowCreateParams = IConnectorFactoryCreateParams & PlannedConsumptionFlowCreateParams;
export type IConnectorFactoryPlannedLocalConsumptionFlowCreateParams = IConnectorFactoryCreateParams & PlannedLocalConsumptionFlowCreateParams;
export type IConnectorFactoryPlannedLocalProductionFlowCreateParams = IConnectorFactoryCreateParams & PlannedLocalProductionFlowCreateParams;
export type IConnectorFactoryPlannedLocalTransformationCreateParams = IConnectorFactoryCreateParams & PlannedLocalTransformationCreateParams;
export type IConnectorFactoryPlannedProductionFlowCreateParams = IConnectorFactoryCreateParams & PlannedProductionFlowCreateParams;
export type IConnectorFactoryPlannedTransformationCreateParams = IConnectorFactoryCreateParams & PlannedTransformationCreateParams;
export type IConnectorFactoryPriceCreateParams = IConnectorFactoryCreateParamsBlankNode & PriceCreateParams;
export type IConnectorFactoryProductBatchCreateParams = IConnectorFactoryCreateParams & ProductBatchCreateParams;
export type IConnectorFactoryQuantityCreateParams = IConnectorFactoryCreateParamsBlankNode & QuantityCreateParams;
export type IConnectorFactoryRealizedConsumptionFlowCreateParams = IConnectorFactoryCreateParams & RealizedConsumptionFlowCreateParams;
export type IConnectorFactoryRealizedProductionFlowCreateParams = IConnectorFactoryCreateParams & RealizedProductionFlowCreateParams;
export type IConnectorFactoryRealizedTransformationCreateParams = IConnectorFactoryCreateParams & RealizedTransformationCreateParams;
export type IConnectorFactoryRealStockCreateParams = IConnectorFactoryCreateParams & RealStockCreateParams;
export type IConnectorFactorySaleSessionCreateParams = IConnectorFactoryCreateParams & SaleSessionCreateParams;
export type IConnectorFactorySocialMediaCreateParams = IConnectorFactoryCreateParams & SocialMediaCreateParams;
export type IConnectorFactorySuppliedProductCreateParams = IConnectorFactoryCreateParams & SuppliedProductCreateParams;
export type IConnectorFactoryTechnicalProductCreateParams = IConnectorFactoryCreateParams & TechnicalProductCreateParams;
export type IConnectorFactoryTheoreticalStockCreateParams = IConnectorFactoryCreateParams & TheoreticalStockCreateParams;
export type IConnectorFactoryVirtualPlaceCreateParams = IConnectorFactoryCreateParams & VirtualPlaceCreateParams;

export interface IConnectorFactoryCreateParamsBlankNode {
    other?: Semanticable;
}

export interface IConnectorFactoryCreateParams {
    semanticId?: string;
    other?: Semanticable;
    doNotStore?: boolean;
}

export interface AddressCreateParams {
    street?: string;
    postalCode?: string;
    city?: string;
    country?: ISKOSConcept;
    latitude?: number;
    longitude?: number;
    region?: string;
}

export interface AllergenCharacteristicCreateParams {
    unit?: ISKOSConcept;
    value?: number;
    allergenDimension?: ISKOSConcept;
}

export interface CatalogCreateParams {
    maintainers?: IEnterprise[];
    items?: ICatalogItem[];
}

export interface CatalogItemCreateParams {
    product?: ISuppliedProduct;
    sku?: string;
    stockLimitation?: number;
    offers?: IOffer[];
    catalogs?: ICatalog[];
}

export interface CustomerCategoryCreateParams {
    description?: string;
}

export interface DeliveryOptionCreateParams {
    name?: string;
    description?: string;
    fee?: number;
    quantity?: IQuantity;
    order?: IOrder;
    saleSession?: ISaleSession;
    deliveredPlace?: IPhysicalPlace;
    deliveryConstraint?: string;
    accessibilityInformation?: string;
    beginDate?: string;
    endDate?: string;
}

export interface EnterpriseCreateParams {
    name?: string;
    localizations?: IAddress[];
    description?: string;
    vatNumber?: string;
    customerCategories?: ICustomerCategory[];
    catalogs?: ICatalog[];
    catalogItems?: ICatalogItem[];
    suppliedProducts?: ISuppliedProduct[];
    technicalProducts?: ITechnicalProduct[];
    mainContact?: IPerson;
    logo?: string;
}

export interface LocalizedProductCreateParams {
    name?: string;
    description?: string;
    quantity?: IQuantity;
    images?: string[];
    cost?: number;
    suppliedProducts?: ISuppliedProduct[];
    physicalProducts?: IPhysicalProduct[];
    theoreticalStocks?: ITheoreticalStock[];
    plannedLocalConsumptionFlows?: IPlannedLocalConsumptionFlow[];
    plannedLocalProductionFlows?: IPlannedLocalProductionFlow[];
}

export interface NutrientCharacteristicCreateParams {
    unit?: ISKOSConcept;
    value?: number;
    nutrientDimension?: ISKOSConcept;
}

export interface OfferCreateParams {
    offeredItem?: ICatalogItem;
    offeredTo?: ICustomerCategory;
    price?: IPrice;
    stockLimitation?: number;
}

export interface OpeningHoursSpecificationCreateParams {
    dayOfWeek?: string;
    opens?: string;
    closes?: string;
}

export interface OrderCreateParams {
    number?: string;
    date?: string;
    saleSession?: ISaleSession;
    client?: IAgent;
    lines?: IOrderLine[];
    soldBy?: IAgent;
    fulfilmentStatus?: ISKOSConcept;
    orderStatus?: ISKOSConcept;
    paymentStatus?: ISKOSConcept;
    paymentMethod?: IPaymentMethod;
}

export interface OrderLineCreateParams {
    quantity?: number;
    price?: IPrice;
    offer?: IOffer;
    order?: IOrder;
}

export interface PaymentMethodCreateParams {
    name?: string;
    description?: string;
    price?: IPrice;
    provider?: string;
    type?: string;
}

export interface PersonCreateParams {
    firstName?: string;
    lastName?: string;
    localizations?: IAddress[];
    organizations?: IEnterprise[];
    logo?: string;
}

export interface PhoneNumberCreateParams {
    countryCode?: number;
    phoneNumber?: string;
}

export interface PhysicalCharacteristicCreateParams {
    unit?: ISKOSConcept;
    value?: number;
    physicalDimension?: ISKOSConcept;
}

export interface PhysicalPlaceCreateParams {
    name?: string;
    description?: string;
    hostedSaleSessions?: ISaleSession[];
    phoneNumbers?: IPhoneNumber[];
    openingHours?: IOpeningHoursSpecification[];
    address?: IAddress;
    mainContacts?: IPerson[];
    theoreticalStocks?: ITheoreticalStock[];
    realStocks?: IRealStock[];
}

export interface PhysicalProductCreateParams {
    name?: string;
    description?: string;
    quantity?: IQuantity;
    images?: string[];
    localizedProducts?: ILocalizedProduct[];
    productBatches?: IProductBatch[];
    realStocks?: IRealStock[];
    realizedConsumptionFlows?: IRealizedConsumptionFlow[];
    realizedProductionFlows?: IRealizedProductionFlow[];
}

export interface PickupOptionCreateParams {
    name?: string;
    description?: string;
    fee?: number;
    quantity?: IQuantity;
    order?: IOrder;
    saleSession?: ISaleSession;
    pickupPlace?: IPhysicalPlace;
    beginDate?: string;
    endDate?: string;
}

export interface PlannedConsumptionFlowCreateParams {
    quantity?: IQuantity;
    transformation?: IPlannedTransformation;
    product?: IDefinedProduct;
}

export interface PlannedLocalConsumptionFlowCreateParams {
    quantity?: IQuantity;
    transformation?: IPlannedLocalTransformation;
    product?: ILocalizedProduct;
}

export interface PlannedLocalProductionFlowCreateParams {
    quantity?: IQuantity;
    transformation?: IPlannedLocalTransformation;
    product?: ILocalizedProduct;
}

export interface PlannedLocalTransformationCreateParams {
    transformationType?: ISKOSConcept;
    cost?: number;
    startDate?: string;
    endDate?: string;
    consumptionFlows?: IPlannedLocalConsumptionFlow[];
    productionFlows?: IPlannedLocalProductionFlow[];
}

export interface PlannedProductionFlowCreateParams {
    quantity?: IQuantity;
    transformation?: IPlannedTransformation;
    product?: ISuppliedProduct;
}

export interface PlannedTransformationCreateParams {
    transformationType?: ISKOSConcept;
    consumptionFlows?: IPlannedConsumptionFlow[];
    productionFlows?: IPlannedProductionFlow[];
}

export interface PriceCreateParams {
    value?: number;
    vatRate?: number;
    unit?: ISKOSConcept;
}

export interface ProductBatchCreateParams {
    name?: string;
    description?: string;
    batchNumber?: string;
    realStock?: IRealStock;
    physicalProduct?: IPhysicalProduct;
    bestBeforeDate?: string;
    expirationDate?: string;
    productionDate?: string;
}

export interface QuantityCreateParams {
    unit?: ISKOSConcept;
    value?: number;
}

export interface RealizedConsumptionFlowCreateParams {
    quantity?: IQuantity;
    transformation?: IRealizedTransformation;
    product?: IPhysicalProduct;
}

export interface RealizedProductionFlowCreateParams {
    quantity?: IQuantity;
    transformation?: IRealizedTransformation;
    product?: IPhysicalProduct;
}

export interface RealizedTransformationCreateParams {
    transformationType?: ISKOSConcept;
    startDate?: string;
    endDate?: string;
    consumptionFlows?: IRealizedConsumptionFlow[];
    productionFlows?: IRealizedProductionFlow[];
}

export interface RealStockCreateParams {
    physicalProduct?: IPhysicalProduct;
    quantity?: IQuantity;
    physicalPlace?: IPhysicalPlace;
    availabilityDate?: string;
    productBatches?: IProductBatch[];
}

export interface SaleSessionCreateParams {
    beginDate?: string;
    endDate?: string;
    quantity?: number;
    offers?: IOffer[];
}

export interface SocialMediaCreateParams {
    name?: string;
    url?: string;
}

export interface SuppliedProductCreateParams {
    name?: string;
    description?: string;
    productType?: ISKOSConcept;
    quantity?: IQuantity;
    alcoholPercentage?: number;
    lifetime?: string;
    claims?: ISKOSConcept[];
    usageOrStorageConditions?: string;
    allergenCharacteristics?: IAllergenCharacteristic[];
    nutrientCharacteristics?: INutrientCharacteristic[];
    physicalCharacteristics?: IPhysicalCharacteristic[];
    geographicalOrigin?: ISKOSConcept;
    catalogItems?: ICatalogItem[];
    certifications?: ISKOSConcept[];
    natureOrigin?: ISKOSConcept[];
    partOrigin?: ISKOSConcept[];
    totalTheoreticalStock?: number;
    images?: string[];
    localizedProducts?: ILocalizedProduct[];
}

export interface TechnicalProductCreateParams {
    name?: string;
    description?: string;
    productType?: ISKOSConcept;
    quantity?: IQuantity;
    alcoholPercentage?: number;
    lifetime?: string;
    claims?: ISKOSConcept[];
    usageOrStorageConditions?: string;
    allergenCharacteristics?: IAllergenCharacteristic[];
    nutrientCharacteristics?: INutrientCharacteristic[];
    physicalCharacteristics?: IPhysicalCharacteristic[];
    geographicalOrigin?: ISKOSConcept;
    catalogItems?: ICatalogItem[];
    certifications?: ISKOSConcept[];
    natureOrigin?: ISKOSConcept[];
    partOrigin?: ISKOSConcept[];
    images?: string[];
}

export interface TheoreticalStockCreateParams {
    localizedProduct?: ILocalizedProduct;
    quantity?: IQuantity;
    physicalPlace?: IPhysicalPlace;
    availabilityDate?: string;
}

export interface VirtualPlaceCreateParams {
    name?: string;
    description?: string;
    hostedSaleSessions?: ISaleSession[];
    urls?: string[];
}