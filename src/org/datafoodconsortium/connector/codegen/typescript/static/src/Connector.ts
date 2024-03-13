// Exernal
import { ISemantizer, Semanticable, Semantizer } from "@virtual-assembly/semantizer"
import DatasetExt from "rdf-ext/lib/Dataset";

// Static
import ConnectorExporterJsonldStream from "./ConnectorExporterJsonldStream.js";
import ConnectorFactory from "./ConnectorFactory.js";
import ConnectorImporterJsonldStream from "./ConnectorImporterJsonldStream.js";
import ConnectorStoreMap from "./ConnectorStoreMap.js";
import context from "./context.js";
import IConnector from "./IConnector.js";
import IConnectorExporter from "./IConnectorExporter";
import IConnectorExportOptions from "./IConnectorExportOptions.js";
import IConnectorFactory from "./IConnectorFactory.js";
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
import ICustomerCategory from "./ICustomerCategory.js";
import IEnterprise from "./IEnterprise.js";
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

export default class Connector implements IConnector {

    public FACETS?: ISKOSConcept;
    public MEASURES?: ISKOSConcept;
    public PRODUCT_TYPES?: ISKOSConcept;

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
        this.importer = new ConnectorImporterJsonldStream({ context: context });
        const outputContext = "https://www.datafoodconsortium.org";
        this.exporter = new ConnectorExporterJsonldStream(context, outputContext);
    }

    public createAddress(parameters: {semanticId: string, street?: string, postalCode?: string, city?: string, country?: string, doNotStore?: boolean}): IAddress;
    public createAddress(parameters: {other: IAddress, doNotStore?: boolean}): IAddress;
    public createAddress(parameters: {doNotStore?: boolean, semanticId?: string, other?: IAddress, street?: string, postalCode?: string, city?: string, country?: string}): IAddress {
        return this.factory.createAddress(parameters);
    }

    public createAllergenCharacteristic(parameters: {unit?: ISKOSConcept, value?: number, allergenDimension?: ISKOSConcept}): IAllergenCharacteristic
    public createAllergenCharacteristic(parameters: {other: IAllergenCharacteristic}): IAllergenCharacteristic;
    public createAllergenCharacteristic(parameters: {other?: IAllergenCharacteristic, unit?: ISKOSConcept, value?: number, allergenDimension?: ISKOSConcept}): IAllergenCharacteristic {
        return this.factory.createAllergenCharacteristic(parameters);
    }

    public createCatalog(parameters: {semanticId: string, maintainers?: IEnterprise[], items?: ICatalogItem[], doNotStore?: boolean}): ICatalog;
    public createCatalog(parameters: {other: ICatalog, doNotStore?: boolean}): ICatalog;
    public createCatalog(parameters: {doNotStore?: boolean, semanticId?: string, other?: ICatalog, maintainers?: IEnterprise[], items?: ICatalogItem[]}): ICatalog {
        return this.factory.createCatalog(parameters);
    }

    public createCatalogItem(parameters: {semanticId: string, product?: ISuppliedProduct, sku?: string, stockLimitation?: number, offers?: IOffer[], catalogs?: ICatalog[], doNotStore?: boolean}): ICatalogItem;
    public createCatalogItem(parameters: {other: ICatalogItem, doNotStore?: boolean}): ICatalogItem;
    public createCatalogItem(parameters: {doNotStore?: boolean, semanticId?: string, other?: ICatalogItem, product?: ISuppliedProduct, sku?: string, stockLimitation?: number, offers?: IOffer[], catalogs?: ICatalog[]}): ICatalogItem {
        return this.factory.createCatalogItem(parameters);
    }

    public createCustomerCategory(parameters: {semanticId: string, description?: string, doNotStore?: boolean}): ICustomerCategory
    public createCustomerCategory(parameters: {other: ICustomerCategory, doNotStore?: boolean}): ICustomerCategory
    public createCustomerCategory(parameters: {doNotStore?: boolean, semanticId?: string, other?: ICustomerCategory, description?: string}): ICustomerCategory {
        return this.factory.createCustomerCategory(parameters);
    }

    public createEnterprise(parameters: {semanticId: string, localizations?: IAddress[], description?: string, vatNumber?: string, customerCategories?: ICustomerCategory[], catalogs?: ICatalog[], catalogItems?: ICatalogItem[], suppliedProducts?: ISuppliedProduct[], doNotStore?: boolean}): IEnterprise
    public createEnterprise(parameters: {other: IEnterprise, doNotStore?: boolean}): IEnterprise
    public createEnterprise(parameters: {doNotStore?: boolean, semanticId?: string, other?: IEnterprise, localizations?: IAddress[], description?: string, vatNumber?: string, customerCategories?: ICustomerCategory[], catalogs?: ICatalog[], catalogItems?: ICatalogItem[], suppliedProducts?: ISuppliedProduct[]}): IEnterprise {
        return this.factory.createEnterprise(parameters);
    }

    public createNutrientCharacteristic(parameters: {unit?: ISKOSConcept, value?: number, nutrientDimension?: ISKOSConcept}): INutrientCharacteristic
    public createNutrientCharacteristic(parameters: {other: INutrientCharacteristic, doNotStore?: boolean}): INutrientCharacteristic
    public createNutrientCharacteristic(parameters: {other?: INutrientCharacteristic, unit?: ISKOSConcept, value?: number, nutrientDimension?: ISKOSConcept}): INutrientCharacteristic {
        return this.factory.createNutrientCharacteristic(parameters);
    }

    public createOffer(parameters: {semanticId: string, offeredItem?: ICatalogItem, offeredTo?: ICustomerCategory, price?: IPrice, stockLimitation?: number, doNotStore?: boolean}): IOffer
    public createOffer(parameters: {other: IOffer, doNotStore?: boolean}): IOffer
    public createOffer(parameters: {doNotStore?: boolean, semanticId?: string, other?: IOffer, offeredItem?: ICatalogItem, offeredTo?: ICustomerCategory, price?: IPrice, stockLimitation?: number}): IOffer {
        return this.factory.createOffer(parameters);
    }

    public createOrder(parameters: {semanticId: string, number?: string, date?: string, saleSession?: ISaleSession, client?: IAgent, lines?: IOrderLine[], doNotStore?: boolean}): IOrder
    public createOrder(parameters: {other: IOrder, doNotStore?: boolean}): IOrder
    public createOrder(parameters: {doNotStore?: boolean, semanticId?: string, other?: IOrder, number?: string, date?: string, saleSession?: ISaleSession, client?: IAgent, lines?: IOrderLine[]}): IOrder {
        return this.factory.createOrder(parameters);
    }

    public createOrderLine(parameters: {semanticId: string, quantity?: number, price?: IPrice, offer?: IOffer, order?: IOrder, doNotStore?: boolean}): IOrderLine
    public createOrderLine(parameters: {other: IOrderLine, doNotStore?: boolean}): IOrderLine
    public createOrderLine(parameters: {doNotStore?: boolean, semanticId?: string, other?: IOrderLine, quantity?: number, price?: IPrice, offer?: IOffer, order?: IOrder}): IOrderLine {
        return this.factory.createOrderLine(parameters);
    }

    public createPerson(parameters: {semanticId: string, firstName?: string, lastName?: string, localizations?: IAddress[], organizations?: IEnterprise[], doNotStore?: boolean}): IPerson
    public createPerson(parameters: {other: IPerson, doNotStore?: boolean}): IPerson
    public createPerson(parameters: {doNotStore?: boolean, semanticId?: string, other?: IPerson, firstName?: string, lastName?: string, localizations?: IAddress[], organizations?: IEnterprise[]}): IPerson {
        return this.factory.createPerson(parameters);
    }

    public createPhysicalCharacteristic(parameters: {unit: ISKOSConcept, value?: number, physicalDimension?: ISKOSConcept}): IPhysicalCharacteristic
    public createPhysicalCharacteristic(parameters: {other: IPhysicalCharacteristic, doNotStore?: boolean}): IPhysicalCharacteristic
    public createPhysicalCharacteristic(parameters: {other?: IPhysicalCharacteristic, unit?: ISKOSConcept, value?: number, physicalDimension?: ISKOSConcept}): IPhysicalCharacteristic {
        return this.factory.createPhysicalCharacteristic(parameters);
    }

    public createPrice(parameters: {value?: number, vatRate?: number, unit?: ISKOSConcept}): IPrice
    public createPrice(parameters: {other: IPrice, doNotStore?: boolean}): IPrice
    public createPrice(parameters: {other?: IPrice, value?: number, vatRate?: number, unit?: ISKOSConcept}): IPrice {
        return this.factory.createPrice(parameters);
    }

    public createQuantity(parameters: {unit?: ISKOSConcept, value?: number}): IQuantity
    public createQuantity(parameters: {other: IQuantity, doNotStore?: boolean}): IQuantity
    public createQuantity(parameters: {other?: IQuantity, unit?: ISKOSConcept, value?: number}): IQuantity {
        return this.factory.createQuantity(parameters);
    }

    public createSaleSession(parameters: {semanticId: string, beginDate?: string, endDate?: string, quantity?: number, offers?: IOffer[], doNotStore?: boolean}): ISaleSession
    public createSaleSession(parameters: {other: ISaleSession, doNotStore?: boolean}): ISaleSession
    public createSaleSession(parameters: {doNotStore?: boolean, semanticId?: string, other?: ISaleSession, beginDate?: string, endDate?: string, quantity?: number, offers?: IOffer[]}): ISaleSession {
        return this.factory.createSaleSession(parameters);
    }

    public createSuppliedProduct(parameters: {semanticId: string, name?: string, description?: string, productType?: ISKOSConcept, quantity?: IQuantity, alcoholPercentage?: number, lifetime?: string, claims?: ISKOSConcept[], usageOrStorageConditions?: string, allergenCharacteristics?: IAllergenCharacteristic[], nutrientCharacteristics?: INutrientCharacteristic[], physicalCharacteristics?: IPhysicalCharacteristic[], geographicalOrigin?: ISKOSConcept, catalogItems?: ICatalogItem[], certifications?: ISKOSConcept[], natureOrigin?: ISKOSConcept[], partOrigin?: ISKOSConcept[], totalTheoreticalStock?: number, doNotStore?: boolean}): ISuppliedProduct
    public createSuppliedProduct(parameters: {other: ISuppliedProduct, doNotStore?: boolean}): ISuppliedProduct
    public createSuppliedProduct(parameters: {doNotStore?: boolean, semanticId?: string, other?: ISuppliedProduct, name?: string, description?: string, productType?: ISKOSConcept, quantity?: IQuantity, alcoholPercentage?: number, lifetime?: string, claims?: ISKOSConcept[], usageOrStorageConditions?: string, allergenCharacteristics?: IAllergenCharacteristic[], nutrientCharacteristics?: INutrientCharacteristic[], physicalCharacteristics?: IPhysicalCharacteristic[], geographicalOrigin?: ISKOSConcept, catalogItems?: ICatalogItem[], certifications?: ISKOSConcept[], natureOrigin?: ISKOSConcept[], partOrigin?: ISKOSConcept[], totalTheoreticalStock?: number}): ISuppliedProduct {
        return this.factory.createSuppliedProduct(parameters);
    }

    public async export(objects: Array<Semanticable>, options?: IConnectorExportOptions): Promise<string> {
        const exporter = options?.exporter? options.exporter : this.exporter;
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
                const importer = options?.importer? options.importer : this.importer;
                const factory = options?.factory? options.factory : this.factory;
                let results: Array<Semanticable> = new Array<Semanticable>();
                const datasets: Array<DatasetExt> = await importer.import(data, { context: options?.context });

                datasets.forEach(dataset => {
                    const semanticObject = factory.createFromRdfDataset(dataset);
                    if (semanticObject) {
                        results.push(semanticObject);
                        if (options?.doNotStore === undefined || options.doNotStore !== false)
                            this.store(semanticObject);
                        if (options && options.callbacks)
                            options.callbacks.forEach((callback: Function) => callback(semanticObject));
                    }
                });

                if (options) {
                    if (options.only)
                        results = results.filter(r => r.isSemanticTypeOf(options.only!));

                    if (options.limit && options.limit < results.length)
                        results = results.slice(0, options.limit);
                }

                resolve(results);
            }
            catch(error) { reject(error) }
        });
    }

    public async importOne(data: string, options?: IConnectorImportOptions): Promise<Semanticable | undefined> {
        const opts = { ...options, limit: 1 };
        const results = await this.import(data, opts);
        return results.length > 0? results[0]: undefined;
    }

    public async importOneTyped<Type>(data: string, options?: IConnectorImportOptions): Promise<Type | undefined> {
        const opts = { ...options, limit: 1 };
        const results = await this.import(data, opts);
        return results.length > 0? <Type> results[0]: undefined;
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
                const name: string = narrower.split(prefix)[1].replace('-', '_').toUpperCase();
                const concept: Semanticable | undefined = concepts.get(narrower);
                if (concept) {
                    // @ts-ignore
                    parent[name] = concept;
                    setChildren(concept);
                }
            });
        }

        // @ts-ignore: if the conceptScheme does not exist, an exception should have be already throwned
        conceptScheme.getSemanticPropertyAll(skosHasTopConcept).forEach((topConcept: any) => {
            const name: string = topConcept.split(prefix)[1].replace('-', '_').toUpperCase();
            const concept: Semanticable | undefined = concepts.get(topConcept);
            if (!concept)
                throw new Error("The thesaurus top concept " + topConcept + " was not found.");
            // @ts-ignore
            conceptScheme[name] = concept;
            setChildren(concept);
        });

        return conceptScheme;
    }

    public async loadFacets(facets: any): Promise<void> {
        const prefix: string = "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/facets.rdf#";
        this.FACETS = await this.importThesaurus(facets, prefix);
    }

    public async loadMeasures(measures: any): Promise<void> {
        const prefix: string = "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/measures.rdf#";
        this.MEASURES = await this.importThesaurus(measures, prefix);
    }

    public async loadProductTypes(productTypes: any): Promise<void> {
        const prefix: string = "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/productTypes.rdf#";
        this.PRODUCT_TYPES = await this.importThesaurus(productTypes, prefix);
    }

    public async fetch(semanticObjectId: string, options?: IGetterOptions): Promise<Semanticable | undefined> {
        const store: IConnectorStore = options?.store? options.store : this.storeObject;

        if (!store.has(semanticObjectId)) {
            const fetchFunction = options?.fetch? options.fetch : this.fetchFunction;
            const importer = options?.importer? { importer: options.importer } : {};
            const document: Response = await fetchFunction(semanticObjectId);
            const semanticObjects = await this.import(await document.text(), importer);
            store.setAll(semanticObjects);
            return semanticObjects.find(semanticObject => semanticObject.getSemanticId() === semanticObjectId);
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
}