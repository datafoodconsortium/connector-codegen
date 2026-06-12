# Data Food Consortium Connector

The [Data Food Consortium](https://dfc-standard.org) project (DFC) aims to provide interoperability between food supply chain platforms. Documentation is available on [GitBook](https://docs.dfc-standard.org/) and on [GitHub](https://github.com/datafoodconsortium/).

This DFC Connector is a tool to help developers to integrate the DFC standard within an application. Each concept of the DFC standard can be manipulated with the help of the corresponding class supplied by the connector. 
This connector will also help to import and export data so one can exchange information with other DFC standard compliant platforms.

## Get started

### Install

You can install the connector with the following command: `npm i @datafoodconsortium/connector`.

From NPM version 6 you can use different versions of a same package using *package-aliasing* with the following syntax : `npm install <alias>@npm:<package-name>@<version>`.

For instance you can install the connector v1 and v2 versions using:
```bash
npm install dfc-connector-v1@npm:@datafoodconsortium/connector@1.0.0;
npm install dfc-connector-v2@npm:@datafoodconsortium/connector@2.0.0;
```

Or in your *package.json*:
```json
  "dependencies": {
    "dfc-connector-v1": "npm:@datafoodconsortium/connector@1.0.0",
    "dfc-connector-v2": "npm:@datafoodconsortium/connector@2.0.0"
  }
```

### Import and use the connector
Then in you JS file, import the newly installed connector:
```JS
import { Connector } from '@datafoodconsortium/connector';

const connector = new Connector();
```

Or with *package-aliasing* (see below):
```TS
import { Connector as ConnectorV1 } from 'dfc-connector-v1';
import { Connector as ConnectorV2 } from 'dfc-connector-v2';

const connectorV1 = new ConnectorV1();
const connectorV2 = new ConnectorV2();

connectorV1.someMethod();
connectorV2.someMethod();
```

### Load the taxonomies

You can then load our different SKOS taxonomies providing the corresponding JSON-LD files:
```JS
connector.loadMeasures(File.read("/path/to/measures.jsonld"));
connector.loadFacets(File.read("/path/to/facets.jsonld"));
connector.loadProductTypes(File.read("/path/to/productTypes.jsonld"));
connector.loadVocabulary(File.read("/path/to/vocabulary.jsonld"));
```

These taxonomies are accessible directly from the connector, like:
```JS
// Example of a facet
const fruit = connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT;

// Example of an measure
const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

// Example of a product type
const tomato = connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO;

// Example of a transformation type
const combines = connector.VOCABULARY.TRANSFORMATIONTYPE.COMBINES;
```

You can discover all the available taxons on our [ShowVoc instance](https://showvoc.dfc-standard.org/).

## Object creation

_Remark: each newly created object will be saved into the store provided to the Connector. This store will allow you to access to the referenced objects more easily. You can disable this behavior passing the `doNotStore: true` parameter when constructing the objects._

Call the creation methods from the connector:
```JS
import { Connector } from "@datafoodconsortium/connector";

const quantity = connector.createQuantity({ 
    value: 1.2, 
    unit: kilogram
});

const allergenCharacteristic = connector.createAllergenCharacteristic({ 
    value: 1, 
    unit: kilogram, 
    allergenDimension: connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS 
});

const nutrientCharacteristic = connector.createNutrientCharacteristic({ 
    value: 10, 
    unit: gram, 
    nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM 
});

const physicalCharacteristic = connector.createPhysicalCharacteristic({ 
    value: 100, 
    unit: gram, 
    physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT 
});

const catalogItem = connector.createCatalogItem({ 
    semanticId: "http://myplatform.com/catalogItem" 
});

let suppliedProduct = connector.createSuppliedProduct({
    semanticId: "http://myplatform.com/tomato",
    description: "Awesome tomato",
    productType: connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO, 
    quantity: quantity,
    totalTheoreticalStock: 2.23,
    alcoholPercentage: 0, 
    lifetime: "a week", 
    claims: [connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS], 
    usageOrStorageConditions: "free text", 
    allergenCharacteristics: [allergenCharacteristic],
    nutrientCharacteristics: [nutrientCharacteristic],
    physicalCharacteristics: [physicalCharacteristic],
    geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE,
    catalogItems: [catalogItem], 
    certifications: [connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB, connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU],
    natureOrigin: [connector.FACETS.NATUREORIGIN.PLANTORIGIN],
    partOrigin: [connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT]
});
```

_Remark: Except for anonymous objects (blank nodes), the `semanticId` constructor parameter is mandatory. All the other parameters are optional._

**Available creation methods:**

The available creation methods are listed in the `IConnectorFactory` interface which also contains the types of expected parameters:
```ts
createAddress(parameters: IConnectorFactoryAddressCreateParams): IAddress;
createAllergenCharacteristic(parameters: IConnectorFactoryAllergenCharacteristicCreateParams): IAllergenCharacteristic;
createCatalog(parameters: IConnectorFactoryCatalogCreateParams): ICatalog;
createCatalogItem(parameters: IConnectorFactoryCatalogItemCreateParams): ICatalogItem;
createCertification(parameters: IConnectorFactoryCertificationCreateParams): ICertification;
createCustomerCategory(parameters: IConnectorFactoryCustomerCategoryCreateParams): ICustomerCategory;
createDeliveryOption(parameters: IConnectorFactoryDeliveryOptionCreateParams): IDeliveryOption;
createDeliveryStep(parameters: IConnectorFactoryDeliveryStepCreateParams): IDeliveryStep;
createLocalizedProduct(parameters: IConnectorFactoryLocalizedProductCreateParams): ILocalizedProduct;
createNutrientCharacteristic(parameters: IConnectorFactoryNutrientCharacteristicCreateParams): INutrientCharacteristic;
createOffer(parameters: IConnectorFactoryOfferCreateParams): IOffer;
createOpeningHoursSpecification(parameters: IConnectorFactoryOpeningHoursSpecificationCreateParams): IOpeningHoursSpecification;
createOrder(parameters: IConnectorFactoryOrderCreateParams): IOrder;
createOrderLine(parameters: IConnectorFactoryOrderLineCreateParams): IOrderLine;
createOrganization(parameters: IConnectorFactoryOrganizationCreateParams): IOrganization;
createPaymentMethod(parameters: IConnectorFactoryPaymentMethodCreateParams): IPaymentMethod;
createPerson(parameters: IConnectorFactoryPersonCreateParams): IPerson;
createPhoneNumber(parameters: IConnectorFactoryPhoneNumberCreateParams): IPhoneNumber;
createPhysicalCharacteristic(parameters: IConnectorFactoryPhysicalCharacteristicCreateParams): IPhysicalCharacteristic;
createPhysicalPlace(parameters: IConnectorFactoryPhysicalPlaceCreateParams): IPhysicalPlace;
createPhysicalProduct(parameters: IConnectorFactoryPhysicalProductCreateParams): IPhysicalProduct;
createPickupOption(parameters: IConnectorFactoryPickupOptionCreateParams): IPickupOption;
createPickUpStep(parameters: IConnectorFactoryPickUpStepCreateParams): IPickUpStep;
createPlannedConsumptionFlow(parameters: IConnectorFactoryPlannedConsumptionFlowCreateParams): IPlannedConsumptionFlow;
createPlannedLocalConsumptionFlow(parameters: IConnectorFactoryPlannedLocalConsumptionFlowCreateParams): IPlannedLocalConsumptionFlow;
createPlannedLocalProductionFlow(parameters: IConnectorFactoryPlannedLocalProductionFlowCreateParams): IPlannedLocalProductionFlow;
createPlannedLocalTransformation(parameters: IConnectorFactoryPlannedLocalTransformationCreateParams): IPlannedLocalTransformation;
createPlannedProductionFlow(parameters: IConnectorFactoryPlannedProductionFlowCreateParams): IPlannedProductionFlow;
createPlannedTransformation(parameters: IConnectorFactoryPlannedTransformationCreateParams): IPlannedTransformation;
createPrice(parameters: IConnectorFactoryPriceCreateParams): IPrice;
createProductBatch(parameters: IConnectorFactoryProductBatchCreateParams): IProductBatch;
createProductOption(parameters: IConnectorFactoryProductOptionCreateParams): IProductOption;
createProductOptionValue(parameters: IConnectorFactoryProductOptionValueCreateParams): IProductOptionValue;
createQuantity(parameters: IConnectorFactoryQuantityCreateParams): IQuantity;
createRealizedConsumptionFlow(parameters: IConnectorFactoryRealizedConsumptionFlowCreateParams): IRealizedConsumptionFlow;
createRealizedProductionFlow(parameters: IConnectorFactoryRealizedProductionFlowCreateParams): IRealizedProductionFlow;
createRealizedTransformation(parameters: IConnectorFactoryRealizedTransformationCreateParams): IRealizedTransformation;
createRealStock(parameters: IConnectorFactoryRealStockCreateParams): IRealStock;
createRoute(parameters: IConnectorFactoryRouteCreateParams): IRoute;
createSaleSession(parameters: IConnectorFactorySaleSessionCreateParams): ISaleSession;
createSocialMedia(parameters: IConnectorFactorySocialMediaCreateParams): ISocialMedia;
createSuppliedProduct(parameters: IConnectorFactorySuppliedProductCreateParams): ISuppliedProduct;
createTechnicalProduct(parameters: IConnectorFactoryTechnicalProductCreateParams): ITechnicalProduct;
createTemplateSaleSession(parameters: IConnectorFactoryTemplateSaleSessionCreateParams): ITemplateSaleSession;
createTheoreticalStock(parameters: IConnectorFactoryTheoreticalStockCreateParams): ITheoreticalStock;
createVariant(parameters: IConnectorFactoryVariantCreateParams): IVariant;
createVariantCharacteristic(parameters: IConnectorFactoryVariantCharacteristicCreateParams): IVariantCharacteristic;
createVirtualPlace(parameters: IConnectorFactoryVirtualPlaceCreateParams): IVirtualPlace;
```

## Object accessors and mutators

### Read object properties (accessor)
You can read the properties of an objet using getter methods. Some are synchronous while other are asynchronous.

**Accessing litterals is synchronous**
```JS
// Don't need to await when getting literral values like string, number or boolean.
suppliedProduct.getDescription();
```

**Accessing referenced objects is asynchronous**

The previous method returned a simple string. But an object ofen contains other objects. In the semantic web, every object has its own URI. So we will store only a reference to these contained objects using their URI. They are called "referenced objects".

To access a referenced object using the connector you just have to `await` for it like:
```JS
// You must await when getting referenced objects.
const addresses: IAddress[] = await person.getLocalizations();
```

_Remark: Running the previous code sample will trigger a call to the `fetch` function of the connector. If the referenced object it is not already in the connector store, it will be downloaded from the network._

### Change object properties (mutator)

If you want to change a property after the creation of the object, you can use its proper setter method like:
```JS
// Set the quantity of the product
suppliedProduct.setQuantity(connector.createQuantity(kilogram, 2.6));
```

You can also add a value to properties that are array:
```JS
// Add a new certification to the product
suppliedProduct.addCertification(connector.FACETS.CERTIFICATION.LOCALLABEL.AOC_FR);
```

## Export objects

With the Connector, you can export DFC object(s). The default exporter exports objects to JSON-LD:
```JS
console.log(await connector.export([suppliedProduct]));
```

_Remark: the export function accepts an "options" parameter that can be use to pass a custom exporter, input and output contexts:_
```JS
options?: {
    exporter?: IConnectorExporter;
    inputContext?: any;
    outputContext?: any;
}
```

This will output DFC compliant valid JSON-LD like:
```JS
{
  "@context": "http://www.datafoodconsortium.org/ontologies/context.json",
  "@graph": [
    {
      "@id": "_:b1",
      "@type": "dfc-b:QuantitativeValue",
      "dfc-b:hasUnit": "dfc-m:Kilogram",
      "dfc-b:value": "1.2"
    },
    {
      "@id": "_:b2",
      "@type": "dfc-b:AllergenCharacteristic",
      "dfc-b:hasAllergenDimension": "dfc-m:Peanuts",
      "dfc-b:hasUnit": "dfc-m:Kilogram",
      "dfc-b:value": "1"
    },
    {
      "@id": "_:b4",
      "@type": "dfc-b:NutrientCharacteristic",
      "dfc-b:hasNutrientDimension": {
        "@id": "dfc-m:Calcium"
      },
      "dfc-b:hasUnit": "dfc-m:Gram",
      "dfc-b:value": "10"
    },
    {
      "@id": "_:b6",
      "@type": "dfc-b:PhysicalCharacteristic",
      "dfc-b:hasPhysicalDimension": "dfc-m:Weight",
      "dfc-b:hasUnit": "dfc-m:Gram",
      "dfc-b:value": "100"
    },
    {
      "@id": "http://myplatform.com/tomato",
      "@type": "dfc-b:SuppliedProduct",
      "dfc-b:alcoholPercentage": "0",
      "dfc-b:description": "Awesome tomato",
      "dfc-b:hasAllergenCharacteristic": {
        "@id": "_:b2"
      },
      "dfc-b:hasCertification": [
        {
          "@id": "dfc-f:Organic-AB"
        },
        {
          "@id": "dfc-f:Organic-EU"
        }
      ],
      "dfc-b:hasClaim": "dfc-f:NoAddedSugars",
      "dfc-b:hasGeographicalOrigin": "dfc-f:CentreValLoire",
      "dfc-b:hasNatureOrigin": {
        "@id": "dfc-f:PlantOrigin"
      },
      "dfc-b:hasNutrientCharacteristic": {
        "@id": "_:b4"
      },
      "dfc-b:hasPartOrigin": {
        "@id": "dfc-f:Fruit"
      },
      "dfc-b:hasPhysicalCharacteristic": {
        "@id": "_:b6"
      },
      "dfc-b:hasQuantity": "_:b1",
      "dfc-b:hasType": "dfc-pt:round-tomato",
      "dfc-b:lifetime": "a week",
      "dfc-b:referencedBy": "http://myplatform.com/catalogItem",
      "dfc-b:totalTheoreticalStock": "2.23",
      "dfc-b:usageOrStorageCondition": "free text"
    }
  ]
}
```

## Import objects

The DFC Connector provides method to import data. The default importer imports JSON-LD data.

To import objects from JSON-LD, use:
```JS
const objects: Semanticable[] = await connector.import(jsonLdAsAString));
```

_Remark: the import function accepts an "options" parameter that can be use to fit to your needs_:
```JS
options?: { 
  only?: string; // pass a RDF type to filter the results.
  limit?: number; // limit the results to a the n first elements.
  importer?: IConnectorImporter; // pass an alternate importer to process the data.
  factory?: IConnectorFactory; // pass an alternate factory to create the imported elements.
  doNotStore?: boolean; // don't store any of the imported elements.
}
```

For example, to get the first 3 `Order` of some imported data use:
```JS
await connector.import(jsonLdAsAString, { only: connector.TERMS.ORDER, limit: 3 });
```

You can also get a single element using the `importOne` helper method:
```JS
const Semanticable | undefined = await connector.importOne(jsonLdAsAString);
```

You can pass the `only` option to target one type using the `importOneTyped` method:
```JS
const order: string = "http://www.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Order";
const IOrder | undefined = await connector.importOneTyped<IOrder>(jsonLdAsAString, { only: order });
```

## Configure

You can adapt different components of the connector to your needs with the following connector methods:

```JS
// Set the function that will fetch the referenced objects when importing data.
Connector:setDefaultFetchFunction(fetch: (semanticId: string) => Promise<string>): void;

// Set the object that will store the imported objects.
Connector:setDefaultStore(store: IConnectorStore): void;

// Set the object that will export the objects.
Connector:setDefaultExporter(exporter: IConnectorExporter);

// Set the object that will import the objects.
Connector:setDefaultImporter(importer: IConnectorImporter);

// Set the object used to create new instances.
Connector:setDefaultFactory(factory: IConnectorFactory);
```

## Examples

### Transformation loop

This example shows how to create a product case containing 10 pieces:

```ts
const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));
await connector.loadVocabulary(JSON.stringify(vocabulary));

const piece = connector.MEASURES.UNIT.QUANTITYUNIT.PIECE;

const inputSuppliedProduct = connector.createSuppliedProduct({
    semanticId: "http://myplatform.com/inputProduct",
    description: "Some product"
});

const outputSuppliedProduct = connector.createSuppliedProduct({
    semanticId: "http://myplatform.com/caseOfProduct",
    description: "Case of 10 products"
});

const plannedConsumptionFlow = connector.createPlannedConsumptionFlow({
    semanticId: "http://myplatform.com/plannedConsumptionFlow",
    quantity: connector.createQuantity({ 
        value: 10, 
        unit: piece
    }),
    product: inputSuppliedProduct
})

const plannedProductionFlow = connector.createPlannedProductionFlow({
    semanticId: "http://myplatform.com/plannedProductionFlow",
    quantity: connector.createQuantity({ 
        value: 1.0, 
        unit: piece
    }),
    product: outputSuppliedProduct
})

const plannedTransformation = connector.createPlannedTransformation({
    semanticId: "http://myplatform.com/transformation",
    transformationType: connector.VOCABULARY.TRANSFORMATIONTYPE.COMBINES,
    consumptionFlows: [plannedConsumptionFlow],
    productionFlows: [plannedProductionFlow]
});
```

## Contributing

To publish the package use `npm publish --access public --tag latest`;