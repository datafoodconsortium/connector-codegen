// Exernal
import { ISemantizer, Semanticable, Semantizer } from "@virtual-assembly/semantizer"
import DatasetExt from "rdf-ext/lib/Dataset";

// Static
import ConnectorExporterJsonldStream from "./ConnectorExporterJsonldStream.js";
import ConnectorFactory from "./ConnectorFactory.js";
import ConnectorImporterJsonldStream from "./ConnectorImporterJsonldStream.js";
import ConnectorStoreMap from "./ConnectorStoreMap.js";
import context from "./context.js";
import IConnector, { IConnectorCreateParams } from "./IConnector.js";
import IConnectorExporter from "./IConnectorExporter";
import IConnectorExportOptions from "./IConnectorExportOptions.js";
import IConnectorFactory, { AddressCreateParams, AllergenCharacteristicCreateParams, CatalogCreateParams, CatalogItemCreateParams, CertificationCreateParams, CustomerCategoryCreateParams, DeliveryOptionCreateParams, OrganizationCreateParams, IConnectorFactoryAddressCreateParams, IConnectorFactoryAllergenCharacteristicCreateParams, IConnectorFactoryCatalogCreateParams, IConnectorFactoryCatalogItemCreateParams, IConnectorFactoryCustomerCategoryCreateParams, IConnectorFactoryDeliveryOptionCreateParams, IConnectorFactoryOrganizationCreateParams, IConnectorFactoryLocalizedProductCreateParams, IConnectorFactoryNutrientCharacteristicCreateParams, IConnectorFactoryOfferCreateParams, IConnectorFactoryOpeningHoursSpecificationCreateParams, IConnectorFactoryOrderCreateParams, IConnectorFactoryOrderLineCreateParams, IConnectorFactoryPaymentMethodCreateParams, IConnectorFactoryPersonCreateParams, IConnectorFactoryPhoneNumberCreateParams, IConnectorFactoryPhysicalCharacteristicCreateParams, IConnectorFactoryPhysicalPlaceCreateParams, IConnectorFactoryPhysicalProductCreateParams, IConnectorFactoryPickupOptionCreateParams, IConnectorFactoryPlannedConsumptionFlowCreateParams, IConnectorFactoryPlannedLocalConsumptionFlowCreateParams, IConnectorFactoryPlannedLocalProductionFlowCreateParams, IConnectorFactoryPlannedLocalTransformationCreateParams, IConnectorFactoryPlannedProductionFlowCreateParams, IConnectorFactoryPlannedTransformationCreateParams, IConnectorFactoryPriceCreateParams, IConnectorFactoryProductBatchCreateParams, IConnectorFactoryQuantityCreateParams, IConnectorFactoryRealizedConsumptionFlowCreateParams, IConnectorFactoryRealizedProductionFlowCreateParams, IConnectorFactoryRealizedTransformationCreateParams, IConnectorFactoryRealStockCreateParams, IConnectorFactorySaleSessionCreateParams, IConnectorFactorySocialMediaCreateParams, IConnectorFactorySuppliedProductCreateParams, IConnectorFactoryTechnicalProductCreateParams, IConnectorFactoryTheoreticalStockCreateParams, IConnectorFactoryVirtualPlaceCreateParams, LocalizedProductCreateParams, NutrientCharacteristicCreateParams, OfferCreateParams, OpeningHoursSpecificationCreateParams, OrderCreateParams, OrderLineCreateParams, PaymentMethodCreateParams, PersonCreateParams, PhoneNumberCreateParams, PhysicalCharacteristicCreateParams, PhysicalPlaceCreateParams, PhysicalProductCreateParams, PickupOptionCreateParams, PlannedConsumptionFlowCreateParams, PlannedLocalConsumptionFlowCreateParams, PlannedLocalProductionFlowCreateParams, PlannedLocalTransformationCreateParams, PlannedProductionFlowCreateParams, PlannedTransformationCreateParams, PriceCreateParams, ProductBatchCreateParams, QuantityCreateParams, RealizedConsumptionFlowCreateParams, RealizedProductionFlowCreateParams, RealizedTransformationCreateParams, RealStockCreateParams, SaleSessionCreateParams, SocialMediaCreateParams, SuppliedProductCreateParams, TechnicalProductCreateParams, TheoreticalStockCreateParams, VirtualPlaceCreateParams, IConnectorFactoryCertificationCreateParams, DeliveryStepCreateParams, IConnectorFactoryDeliveryStepCreateParams, PickUpStepCreateParams, IConnectorFactoryPickUpStepCreateParams, ProductOptionCreateParams, IConnectorFactoryProductOptionCreateParams, ProductOptionValueCreateParams, IConnectorFactoryProductOptionValueCreateParams, RouteCreateParams, IConnectorFactoryRouteCreateParams, TemplateSaleSessionCreateParams, IConnectorFactoryTemplateSaleSessionCreateParams, VariantCreateParams, IConnectorFactoryVariantCreateParams, VariantCharacteristicCreateParams, IConnectorFactoryVariantCharacteristicCreateParams } from "./IConnectorFactory.js";
import IConnectorImporter from "./IConnectorImporter";
import IConnectorImportOptions from "./IConnectorImportOptions.js";
import IConnectorStore from "./IConnectorStore";
import IGetterOptions from "./IGetterOptions.js";

// Generated Code
import IAddress from "./IAddress.js";
import IAgent from "./IAgent.js";
import IAllergenCharacteristic from "./IAllergenCharacteristic.js";
import ICatalog from "./ICatalog.js";
import ICatalogItem from "./ICatalogItem.js";
import ICertification from "./ICertification.js";
import ICustomerCategory from "./ICustomerCategory.js";
import IOrganization from "./IOrganization.js";
import INutrientCharacteristic from "./INutrientCharacteristic.js";
import IOffer from "./IOffer.js";
import IOrder from "./IOrder.js";
import IOrderLine from "./IOrderLine.js";
import IPerson from "./IPerson.js";
import IPhysicalCharacteristic from "./IPhysicalCharacteristic.js";
import IPrice from "./IPrice.js";
import IQuantity from "./IQuantity.js";
import ISaleSession from "./ISaleSession.js";
import ISKOSConcept from "./ISKOSConcept";
import ISuppliedProduct from "./ISuppliedProduct.js";
import IPlannedTransformation from "./IPlannedTransformation.js";
import IPlannedConsumptionFlow from "./IPlannedConsumptionFlow.js";
import IPlannedProductionFlow from "./IPlannedProductionFlow.js";
import IDefinedProduct from "./IDefinedProduct.js";
import IDeliveryOption from "./IDeliveryOption.js";
import IPhysicalPlace from "./IPhysicalPlace.js";
import IRealStock from "./IRealStock.js";
import ITheoreticalStock from "./ITheoreticalStock.js";
import IOpeningHoursSpecification from "./IOpeningHoursSpecification.js";
import IPhoneNumber from "./IPhoneNumber.js";
import { ConnectorImporterJsonldStreamDocumentLoader } from "./ConnectorImporterJsonldStreamDocumentLoader.js";
import ITechnicalProduct from "./ITechnicalProduct.js";
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
import { DatasetCore } from "@rdfjs/types";
import IDeliveryStep from "./IDeliveryStep.js";
import IPickUpStep from "./IPickUpStep.js";
import IProductOption from "./IProductOption.js";
import IProductOptionValue from "./IProductOptionValue.js";
import IRoute from "./IRoute.js";
import ITemplateSaleSession from "./ITemplateSaleSession.js";
import IVariant from "./IVariant.js";
import IVariantCharacteristic from "./IVariantCharacteristic.js";
export default class Connector implements IConnector {

    public FACETS?: ISKOSConcept;
    public MEASURES?: ISKOSConcept;
    public PRODUCT_TYPES?: ISKOSConcept;
    public VOCABULARY?: ISKOSConcept;
    public COUNTRIES?: ISKOSConcept;

    private semantizer: ISemantizer;
    private fetchFunction: (semanticId: string) => Promise<Response>;
    private factory: IConnectorFactory;
    private importer: IConnectorImporter;
    private exporter: IConnectorExporter;
    private storeObject: IConnectorStore;

    public constructor() {
        this.semantizer = new Semantizer(context);
        this.storeObject = new ConnectorStoreMap();
        this.fetchFunction = async (semanticId: string) => (await fetch(semanticId));
        this.factory = new ConnectorFactory(this);
        this.importer = new ConnectorImporterJsonldStream({ context: context, documentLoader: new ConnectorImporterJsonldStreamDocumentLoader });
        const outputContext = "https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld";
        this.exporter = new ConnectorExporterJsonldStream(context, outputContext);
    }

    public createFromRdfDataset(dataset: DatasetExt): Semanticable | undefined {
        return this.factory.createFromRdfDataset(dataset);
    }

    public createFromRdfDatasetCore(dataset: DatasetCore): Semanticable | undefined {
        return this.factory.createFromRdfDatasetCore(dataset);
    }

    public createFromType(type: string): Semanticable | undefined {
        return this.factory.createFromType(type);
    }

    public createAddress(parameters: IConnectorCreateParams & AddressCreateParams): IAddress;
    public createAddress(parameters: { other: IAddress, doNotStore?: boolean }): IAddress;
    public createAddress(parameters: IConnectorFactoryAddressCreateParams): IAddress {
        return this.factory.createAddress(parameters);
    }

    public createAllergenCharacteristic(parameters: AllergenCharacteristicCreateParams): IAllergenCharacteristic;
    public createAllergenCharacteristic(parameters: { other: IAllergenCharacteristic }): IAllergenCharacteristic;
    public createAllergenCharacteristic(parameters: IConnectorFactoryAllergenCharacteristicCreateParams): IAllergenCharacteristic {
        return this.factory.createAllergenCharacteristic(parameters);
    }

    public createCatalog(parameters: IConnectorCreateParams & CatalogCreateParams): ICatalog;
    public createCatalog(parameters: { other: ICatalog, doNotStore?: boolean }): ICatalog;
    public createCatalog(parameters: IConnectorFactoryCatalogCreateParams): ICatalog {
        return this.factory.createCatalog(parameters);
    }

    public createCatalogItem(parameters: IConnectorCreateParams & CatalogItemCreateParams): ICatalogItem;
    public createCatalogItem(parameters: { other: ICatalogItem, doNotStore?: boolean }): ICatalogItem;
    public createCatalogItem(parameters: IConnectorFactoryCatalogItemCreateParams): ICatalogItem {
        return this.factory.createCatalogItem(parameters);
    }

    public createCertification(parameters: IConnectorCreateParams & CertificationCreateParams): ICertification;
    public createCertification(parameters: { other: ICertification, doNotStore?: boolean }): ICertification;
    public createCertification(parameters: IConnectorFactoryCertificationCreateParams): ICertification {
        return this.factory.createCertification(parameters);
    }

    public createCustomerCategory(parameters: IConnectorCreateParams & CustomerCategoryCreateParams): ICustomerCategory;
    public createCustomerCategory(parameters: { other: ICustomerCategory, doNotStore?: boolean }): ICustomerCategory;
    public createCustomerCategory(parameters: IConnectorFactoryCustomerCategoryCreateParams): ICustomerCategory {
        return this.factory.createCustomerCategory(parameters);
    }

    public createDeliveryOption(parameters: IConnectorCreateParams & DeliveryOptionCreateParams): IDeliveryOption;
    public createDeliveryOption(parameters: { other: IDeliveryOption, doNotStore?: boolean }): IDeliveryOption;
    public createDeliveryOption(parameters: IConnectorFactoryDeliveryOptionCreateParams): IDeliveryOption {
        return this.factory.createDeliveryOption(parameters);
    }

    public createDeliveryStep(parameters: IConnectorCreateParams & DeliveryStepCreateParams): IDeliveryStep;
    public createDeliveryStep(parameters: { other: IDeliveryStep, doNotStore?: boolean }): IDeliveryStep;
    public createDeliveryStep(parameters: IConnectorFactoryDeliveryStepCreateParams): IDeliveryStep {
        return this.factory.createDeliveryStep(parameters);
    }

    public createLocalizedProduct(parameters: IConnectorCreateParams & LocalizedProductCreateParams): ILocalizedProduct;
    public createLocalizedProduct(parameters: { other: ILocalizedProduct, doNotStore?: boolean }): ILocalizedProduct;
    public createLocalizedProduct(parameters: IConnectorFactoryLocalizedProductCreateParams): ILocalizedProduct {
        return this.factory.createLocalizedProduct(parameters);
    }

    public createNutrientCharacteristic(parameters: NutrientCharacteristicCreateParams): INutrientCharacteristic;
    public createNutrientCharacteristic(parameters: { other: INutrientCharacteristic, doNotStore?: boolean }): INutrientCharacteristic;
    public createNutrientCharacteristic(parameters: IConnectorFactoryNutrientCharacteristicCreateParams): INutrientCharacteristic {
        return this.factory.createNutrientCharacteristic(parameters);
    }

    public createOffer(parameters: IConnectorCreateParams & OfferCreateParams): IOffer;
    public createOffer(parameters: { other: IOffer, doNotStore?: boolean }): IOffer;
    public createOffer(parameters: IConnectorFactoryOfferCreateParams): IOffer {
        return this.factory.createOffer(parameters);
    }

    public createOpeningHoursSpecification(parameters: IConnectorCreateParams & OpeningHoursSpecificationCreateParams): IOpeningHoursSpecification;
    public createOpeningHoursSpecification(parameters: { other: IOpeningHoursSpecification, doNotStore?: boolean }): IOpeningHoursSpecification;
    public createOpeningHoursSpecification(parameters: IConnectorFactoryOpeningHoursSpecificationCreateParams): IOpeningHoursSpecification {
            return this.factory.createOpeningHoursSpecification(parameters);
    }

    public createOrder(parameters: IConnectorCreateParams & OrderCreateParams): IOrder;
    public createOrder(parameters: { other: IOrder, doNotStore?: boolean }): IOrder;
    public createOrder(parameters: IConnectorFactoryOrderCreateParams): IOrder {
        return this.factory.createOrder(parameters);
    }

    public createOrderLine(parameters: IConnectorCreateParams & OrderLineCreateParams): IOrderLine;
    public createOrderLine(parameters: { other: IOrderLine, doNotStore?: boolean }): IOrderLine;
    public createOrderLine(parameters: IConnectorFactoryOrderLineCreateParams): IOrderLine {
        return this.factory.createOrderLine(parameters);
    }

    public createOrganization(parameters: IConnectorCreateParams & OrganizationCreateParams): IOrganization;
    public createOrganization(parameters: { other: IOrganization, doNotStore?: boolean }): IOrganization;
    public createOrganization(parameters: IConnectorFactoryOrganizationCreateParams): IOrganization {
        return this.factory.createOrganization(parameters);
    }

    public createPaymentMethod(parameters: IConnectorCreateParams & PaymentMethodCreateParams): IPaymentMethod;
    public createPaymentMethod(parameters: { other: IPaymentMethod, doNotStore?: boolean }): IPaymentMethod;
    public createPaymentMethod(parameters: IConnectorFactoryPaymentMethodCreateParams): IPaymentMethod {
        return this.factory.createPaymentMethod(parameters);
    }

    public createPerson(parameters: IConnectorCreateParams & PersonCreateParams): IPerson;
    public createPerson(parameters: { other: IPerson, doNotStore?: boolean }): IPerson;
    public createPerson(parameters: IConnectorFactoryPersonCreateParams): IPerson {
        return this.factory.createPerson(parameters);
    }

    public createPhoneNumber(parameters: IConnectorCreateParams & PhoneNumberCreateParams): IPhoneNumber;
    public createPhoneNumber(parameters: { other: IPhoneNumber, doNotStore?: boolean }): IPhoneNumber;
    public createPhoneNumber(parameters: IConnectorFactoryPhoneNumberCreateParams): IPhoneNumber {
        return this.factory.createPhoneNumber(parameters);
    }

    public createPhysicalCharacteristic(parameters: PhysicalCharacteristicCreateParams): IPhysicalCharacteristic;
    public createPhysicalCharacteristic(parameters: { other: IPhysicalCharacteristic, doNotStore?: boolean }): IPhysicalCharacteristic;
    public createPhysicalCharacteristic(parameters: IConnectorFactoryPhysicalCharacteristicCreateParams): IPhysicalCharacteristic {
        return this.factory.createPhysicalCharacteristic(parameters);
    }

    public createPhysicalPlace(parameters: IConnectorCreateParams & PhysicalPlaceCreateParams): IPhysicalPlace;
    public createPhysicalPlace(parameters: { other: IPhysicalPlace, doNotStore?: boolean }): IPhysicalPlace;
    public createPhysicalPlace(parameters: IConnectorFactoryPhysicalPlaceCreateParams): IPhysicalPlace {
        return this.factory.createPhysicalPlace(parameters);
    }

    public createPhysicalProduct(parameters: IConnectorCreateParams & PhysicalProductCreateParams): IPhysicalProduct;
    public createPhysicalProduct(parameters: { other: IPhysicalProduct, doNotStore?: boolean }): IPhysicalProduct;
    public createPhysicalProduct(parameters: IConnectorFactoryPhysicalProductCreateParams): IPhysicalProduct {
        return this.factory.createPhysicalProduct(parameters);
    }

    public createPickupOption(parameters: IConnectorCreateParams & PickupOptionCreateParams): IPickupOption;
    public createPickupOption(parameters: { other: IPickupOption, doNotStore?: boolean }): IPickupOption;
    public createPickupOption(parameters: IConnectorFactoryPickupOptionCreateParams): IPickupOption {
        return this.factory.createPickupOption(parameters);
    }

    public createPickUpStep(parameters: IConnectorCreateParams & PickUpStepCreateParams): IPickUpStep;
    public createPickUpStep(parameters: { other: IPickUpStep, doNotStore?: boolean }): IPickUpStep;
    public createPickUpStep(parameters: IConnectorFactoryPickUpStepCreateParams): IPickUpStep {
        return this.factory.createPickUpStep(parameters);
    }

    public createPlannedConsumptionFlow(parameters: IConnectorCreateParams & PlannedConsumptionFlowCreateParams): IPlannedConsumptionFlow;
    public createPlannedConsumptionFlow(parameters: { doNotStore?: boolean, other: IPlannedConsumptionFlow }): IPlannedConsumptionFlow;
    public createPlannedConsumptionFlow(parameters: IConnectorFactoryPlannedConsumptionFlowCreateParams): IPlannedConsumptionFlow {
        return this.factory.createPlannedConsumptionFlow(parameters);
    }

    public createPlannedLocalConsumptionFlow(parameters: IConnectorCreateParams & PlannedLocalConsumptionFlowCreateParams): IPlannedLocalConsumptionFlow;
    public createPlannedLocalConsumptionFlow(parameters: { other: IPlannedLocalConsumptionFlow, doNotStore?: boolean }): IPlannedLocalConsumptionFlow;
    public createPlannedLocalConsumptionFlow(parameters: IConnectorFactoryPlannedLocalConsumptionFlowCreateParams): IPlannedLocalConsumptionFlow {
        return this.factory.createPlannedLocalConsumptionFlow(parameters);
    }

    public createPlannedLocalProductionFlow(parameters: IConnectorCreateParams & PlannedLocalProductionFlowCreateParams): IPlannedLocalProductionFlow;
    public createPlannedLocalProductionFlow(parameters: { other: IPlannedLocalProductionFlow, doNotStore?: boolean }): IPlannedLocalProductionFlow;
    public createPlannedLocalProductionFlow(parameters: IConnectorFactoryPlannedLocalProductionFlowCreateParams): IPlannedLocalProductionFlow {
        return this.factory.createPlannedLocalProductionFlow(parameters);
    }

    public createPlannedLocalTransformation(parameters: IConnectorCreateParams & PlannedLocalTransformationCreateParams): IPlannedLocalTransformation;
    public createPlannedLocalTransformation(parameters: { other: IPlannedLocalTransformation, doNotStore?: boolean }): IPlannedLocalTransformation;
    public createPlannedLocalTransformation(parameters: IConnectorFactoryPlannedLocalTransformationCreateParams): IPlannedLocalTransformation {
        return this.factory.createPlannedLocalTransformation(parameters);
    }

    public createPlannedProductionFlow(parameters: IConnectorCreateParams & PlannedProductionFlowCreateParams): IPlannedProductionFlow;
    public createPlannedProductionFlow(parameters: { doNotStore?: boolean, other: IPlannedProductionFlow }): IPlannedProductionFlow;
    public createPlannedProductionFlow(parameters: IConnectorFactoryPlannedProductionFlowCreateParams): IPlannedProductionFlow {
        return this.factory.createPlannedProductionFlow(parameters);
    }

    public createPlannedTransformation(parameters: IConnectorCreateParams & PlannedTransformationCreateParams): IPlannedTransformation;
    public createPlannedTransformation(parameters: { doNotStore?: boolean, other: IPlannedTransformation }): IPlannedTransformation;
    public createPlannedTransformation(parameters: IConnectorFactoryPlannedTransformationCreateParams): IPlannedTransformation {
        return this.factory.createPlannedTransformation(parameters);
    }

    public createPrice(parameters: PriceCreateParams): IPrice;
    public createPrice(parameters: { other: IPrice, doNotStore?: boolean }): IPrice;
    public createPrice(parameters: IConnectorFactoryPriceCreateParams): IPrice {
        return this.factory.createPrice(parameters);
    }

    public createProductBatch(parameters: IConnectorCreateParams & ProductBatchCreateParams): IProductBatch;
    public createProductBatch(parameters: { other: IProductBatch, doNotStore?: boolean }): IProductBatch;
    public createProductBatch(parameters: IConnectorFactoryProductBatchCreateParams): IProductBatch {
        return this.factory.createProductBatch(parameters);
    }

    public createProductOption(parameters: IConnectorCreateParams & ProductOptionCreateParams): IProductOption;
    public createProductOption(parameters: { other: IProductOption, doNotStore?: boolean }): IProductOption;
    public createProductOption(parameters: IConnectorFactoryProductOptionCreateParams): IProductOption {
        return this.factory.createProductOption(parameters);
    }

    public createProductOptionValue(parameters: IConnectorCreateParams & ProductOptionValueCreateParams): IProductOptionValue;
    public createProductOptionValue(parameters: { other: IProductOptionValue, doNotStore?: boolean }): IProductOptionValue;
    public createProductOptionValue(parameters: IConnectorFactoryProductOptionValueCreateParams): IProductOptionValue {
        return this.factory.createProductOptionValue(parameters);
    }

    public createQuantity(parameters: QuantityCreateParams): IQuantity
    public createQuantity(parameters: { other: IQuantity, doNotStore?: boolean }): IQuantity
    public createQuantity(parameters: IConnectorFactoryQuantityCreateParams): IQuantity {
        return this.factory.createQuantity(parameters);
    }

    public createRealizedConsumptionFlow(parameters: IConnectorCreateParams & RealizedConsumptionFlowCreateParams): IRealizedConsumptionFlow;
    public createRealizedConsumptionFlow(parameters: { other: IRealizedConsumptionFlow, doNotStore?: boolean }): IRealizedConsumptionFlow;
    public createRealizedConsumptionFlow(parameters: IConnectorFactoryRealizedConsumptionFlowCreateParams): IRealizedConsumptionFlow {
        return this.factory.createRealizedConsumptionFlow(parameters);
    }

    public createRealizedProductionFlow(parameters: IConnectorCreateParams & RealizedProductionFlowCreateParams): IRealizedProductionFlow;
    public createRealizedProductionFlow(parameters: { other: IRealizedProductionFlow, doNotStore?: boolean }): IRealizedProductionFlow;
    public createRealizedProductionFlow(parameters: IConnectorFactoryRealizedProductionFlowCreateParams): IRealizedProductionFlow {
        return this.factory.createRealizedProductionFlow(parameters);
    }

    public createRealizedTransformation(parameters: IConnectorCreateParams & RealizedTransformationCreateParams): IRealizedTransformation;
    public createRealizedTransformation(parameters: { other: IRealizedTransformation, doNotStore?: boolean }): IRealizedTransformation;
    public createRealizedTransformation(parameters: IConnectorFactoryRealizedTransformationCreateParams): IRealizedTransformation {
        return this.factory.createRealizedTransformation(parameters);
    }

    public createRealStock(parameters: IConnectorCreateParams & RealStockCreateParams): IRealStock;
    public createRealStock(parameters: { other: IRealStock, doNotStore?: boolean }): IRealStock;
    public createRealStock(parameters: IConnectorFactoryRealStockCreateParams): IRealStock {
        return this.factory.createRealStock(parameters);
    }

    public createRoute(parameters: IConnectorCreateParams & RouteCreateParams): IRoute;
    public createRoute(parameters: { other: IRoute, doNotStore?: boolean }): IRoute;
    public createRoute(parameters: IConnectorFactoryRouteCreateParams): IRoute {
        return this.factory.createRoute(parameters);
    }

    public createSaleSession(parameters: IConnectorCreateParams & SaleSessionCreateParams): ISaleSession;
    public createSaleSession(parameters: { other: ISaleSession, doNotStore?: boolean }): ISaleSession;
    public createSaleSession(parameters: IConnectorFactorySaleSessionCreateParams): ISaleSession {
        return this.factory.createSaleSession(parameters);
    }

    public createSocialMedia(parameters: IConnectorCreateParams & SocialMediaCreateParams): ISocialMedia;
    public createSocialMedia(parameters: { other: ISocialMedia, doNotStore?: boolean }): ISocialMedia;
    public createSocialMedia(parameters: IConnectorFactorySocialMediaCreateParams): ISocialMedia {
        return this.factory.createSocialMedia(parameters);
    }

    public createSuppliedProduct(parameters: IConnectorCreateParams & SuppliedProductCreateParams): ISuppliedProduct;
    public createSuppliedProduct(parameters: { other: ISuppliedProduct, doNotStore?: boolean }): ISuppliedProduct;
    public createSuppliedProduct(parameters: IConnectorFactorySuppliedProductCreateParams): ISuppliedProduct {
        return this.factory.createSuppliedProduct(parameters);
    }

    public createTechnicalProduct(parameters: IConnectorCreateParams & TechnicalProductCreateParams): ITechnicalProduct;
    public createTechnicalProduct(parameters: { other: ITechnicalProduct, doNotStore?: boolean }): ITechnicalProduct;
    public createTechnicalProduct(parameters: IConnectorFactoryTechnicalProductCreateParams): ITechnicalProduct {
        return this.factory.createTechnicalProduct(parameters);
    }

    public createTemplateSaleSession(parameters: IConnectorCreateParams & TemplateSaleSessionCreateParams): ITemplateSaleSession;
    public createTemplateSaleSession(parameters: { other: ITemplateSaleSession, doNotStore?: boolean }): ITemplateSaleSession;
    public createTemplateSaleSession(parameters: IConnectorFactoryTemplateSaleSessionCreateParams): ITemplateSaleSession {
        return this.factory.createTemplateSaleSession(parameters);
    }

    public createTheoreticalStock(parameters: IConnectorCreateParams & TheoreticalStockCreateParams): ITheoreticalStock;
    public createTheoreticalStock(parameters: { other: ITheoreticalStock, doNotStore?: boolean }): ITheoreticalStock;
    public createTheoreticalStock(parameters: IConnectorFactoryTheoreticalStockCreateParams): ITheoreticalStock {
        return this.factory.createTheoreticalStock(parameters);
    }

    public createVariant(parameters: IConnectorCreateParams & VariantCreateParams): IVariant;
    public createVariant(parameters: { other: IVariant, doNotStore?: boolean }): IVariant;
    public createVariant(parameters: IConnectorFactoryVariantCreateParams): IVariant {
        return this.factory.createVariant(parameters);
    }

    public createVariantCharacteristic(parameters: IConnectorCreateParams & VariantCharacteristicCreateParams): IVariantCharacteristic;
    public createVariantCharacteristic(parameters: { other: IVariantCharacteristic, doNotStore?: boolean }): IVariantCharacteristic;
    public createVariantCharacteristic(parameters: IConnectorFactoryVariantCharacteristicCreateParams): IVariantCharacteristic {
        return this.factory.createVariantCharacteristic(parameters);
    }

    public createVirtualPlace(parameters: IConnectorCreateParams & VirtualPlaceCreateParams): IVirtualPlace;
    public createVirtualPlace(parameters: { other: IVirtualPlace, doNotStore?: boolean }): IVirtualPlace;
    public createVirtualPlace(parameters: IConnectorFactoryVirtualPlaceCreateParams): IVirtualPlace {
        return this.factory.createVirtualPlace(parameters);
    }

    public async export(objects: Array<Semanticable>, options?: IConnectorExportOptions): Promise<string> {
        const exporter = options?.exporter ? options.exporter : this.exporter;
        return exporter.export(objects, {
            inputContext: options?.inputContext,
            outputContext: options?.outputContext
        });
    }

    public getSemantizer(): ISemantizer {
        return this.semantizer;
    }

    public getDefaultFactory(): IConnectorFactory {
        return this.factory;
    }

    public async import(data: string, options?: IConnectorImportOptions): Promise<Array<Semanticable>> {
        return new Promise(async (resolve, reject) => {
            try {
                const importer = options?.importer ? options.importer : this.importer;
                const factory = options?.factory ? options.factory : this.factory;
                let results: Array<Semanticable> = new Array<Semanticable>();
                const datasets: Array<DatasetExt> = await importer.import(data, { context: options?.context });

                datasets.forEach(dataset => {
                    try {
                        const semanticObject = factory.createFromRdfDataset(dataset);
                        if (semanticObject) {
                            results.push(semanticObject);
                            if (options?.doNotStore === undefined || options.doNotStore !== false)
                                this.store(semanticObject);
                            if (options && options.callbacks)
                                options.callbacks.forEach((callback: Function) => callback(semanticObject));
                        }
                    } catch (e) {}
                });

                if (options) {
                    if (options.only)
                        results = results.filter(r => r.isSemanticTypeOf(options.only!));

                    if (options.limit && options.limit < results.length)
                        results = results.slice(0, options.limit);
                }

                resolve(results);
            }
            catch (error) { reject(error) }
        });
    }

    public async importOne(data: string, options?: IConnectorImportOptions): Promise<Semanticable | undefined> {
        const opts = { ...options, limit: 1 };
        const results = await this.import(data, opts);
        return results.length > 0 ? results[0] : undefined;
    }

    public async importOneTyped<Type>(data: string, options?: IConnectorImportOptions): Promise<Type | undefined> {
        const opts = { ...options, limit: 1 };
        const results = await this.import(data, opts);
        return results.length > 0 ? <Type>results[0] : undefined;
    }

    // TODO: manage options overriding.
    private async importThesaurus(data: any, prefix: string, options?: IConnectorImportOptions): Promise<any> {
        let conceptScheme: Semanticable | undefined = undefined;
        const concepts = new Map<string, Semanticable>();
        const context = data["@context"];
        const skos: string = "http://www.w3.org/2004/02/skos/core#";
        const skosConceptScheme: string = skos + "ConceptScheme";
        const skosHasTopConcept: string = skos + "hasTopConcept";
        const skosNarrower: string = skos + "narrower";

        const callback = (semanticObject: Semanticable) => {
            if (semanticObject.isSemanticTypeOf(skosConceptScheme)) conceptScheme = semanticObject;
            else concepts.set(semanticObject.getSemanticId(), semanticObject);
        }

        await this.import(data, { context: context, callbacks: [callback] });

        if (!conceptScheme)
            throw new Error("Can't find the SKOS ConceptScheme in the imported thesaurus.");

        const setChildren = (parent: Semanticable) => {
            const narrowers = parent.getSemanticPropertyAll(skosNarrower);

            narrowers.forEach((narrower: string) => {
                const expandedNarrower = this.getSemantizer().expand(narrower);
                const name: string = expandedNarrower.split(prefix)[1].replace('-', '_').toUpperCase();
                const concept: Semanticable | undefined = concepts.get(expandedNarrower);
                if (concept) {
                    // @ts-ignore
                    parent[name] = concept;
                    setChildren(concept);
                }
            });
        }

        // @ts-ignore: if the conceptScheme does not exist, an exception should have be already throwned
        conceptScheme.getSemanticPropertyAll(skosHasTopConcept).forEach((topConcept: any) => {
            const expandedTopConcept = this.getSemantizer().expand(topConcept);
            //const name: string = topConcept.split(prefix)[1].replace('-', '_').toUpperCase();
            const name: string = expandedTopConcept.split(prefix)[1].replace('-', '_').toUpperCase();
            const concept: Semanticable | undefined = concepts.get(expandedTopConcept);
            if (!concept)
                throw new Error("The thesaurus top concept " + topConcept + " was not found.");
            // @ts-ignore
            conceptScheme[name] = concept;
            setChildren(concept);
        });

        return conceptScheme;
    }

    public async loadFacets(facets: any): Promise<void> {
        const prefix: string = "http://w3id.org/dfc/taxonomies/v2.0.0/facets.rdf#";
        this.FACETS = await this.importThesaurus(facets, prefix);
    }

    public async loadMeasures(measures: any): Promise<void> {
        const prefix: string = "http://w3id.org/dfc/taxonomies/v2.0.0/measures.rdf#";
        this.MEASURES = await this.importThesaurus(measures, prefix);
    }

    public async loadProductTypes(productTypes: any): Promise<void> {
        const prefix: string = "http://w3id.org/dfc/taxonomies/v2.0.0/productTypes.rdf#";
        this.PRODUCT_TYPES = await this.importThesaurus(productTypes, prefix);
    }

    public async loadVocabulary(vocabulary: any): Promise<void> {
        const prefix: string = "http://w3id.org/dfc/taxonomies/v2.0.0/vocabulary.rdf#";
        this.VOCABULARY = await this.importThesaurus(vocabulary, prefix);
    }

    public async loadCountries(countries: any): Promise<void> {
        const prefix: string = "http://publications.europa.eu/resource/authority/country/";
        this.COUNTRIES = await this.importThesaurus(countries, prefix);
    }

    public async fetch(semanticObject: string, options?: IGetterOptions): Promise<Semanticable | undefined> {
        const store: IConnectorStore = options?.store ? options.store : this.storeObject;
        const semanticObjectId = this.getSemantizer().expand(semanticObject);

        if (!store.has(semanticObjectId)) {
            const fetchFunction = options?.fetch ? options.fetch : this.fetchFunction;
            const importer = options?.importer ? { importer: options.importer } : {};
            const response: Response = await fetchFunction(semanticObjectId);

            if (response.ok) {
                const semanticObjects = await this.import(await response.text(), importer);
                store.setAll(semanticObjects);
                return semanticObjects.find(semanticObject => semanticObject.getSemanticId() === semanticObjectId);
            }

            else {
                return Promise.reject(response.status);
            }
        }

        return store.get(semanticObjectId);
    }

    public setDefaultFactory(factory: IConnectorFactory): void {
        this.factory = factory;
    }

    public setDefaultFetchFunction(fetch: (semanticId: string) => Promise<Response>): void {
        this.fetchFunction = fetch;
    }

    public setDefaultExporter(exporter: IConnectorExporter): void {
        this.exporter = exporter;
    }

    public setDefaultImporter(importer: IConnectorImporter): void {
        this.importer = importer;
    }

    public setDefaultStore(store: IConnectorStore): void {
        this.storeObject = store;
    }

    public store(semanticObject: Semanticable): void {
        this.storeObject.set(semanticObject);
    }

    public removeFromStore(semanticObjectId: string): void {
        this.storeObject.remove(semanticObjectId);
    }
}