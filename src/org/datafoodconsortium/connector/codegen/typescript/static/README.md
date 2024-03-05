<!-- TODO: Update this README before merging into connector-codegen#main -->

# Data Food Consortium Connector

The Data Food Consortium (DFC) Connector is a tool to help you to integrate the DFC standard within you application.

Each concept of the DFC ontology can be manipulated with the help of the corresponding class supplied by the connector.

This connector will also help you to import and export data so you can exchange information with other DFC standard compliant platforms.

The [Data Food Consortium](https://datafoodconsortium.org) project (DFC) aims to provide interoperability between food supply chain platforms.

## Get started

### Install

You can install the connector with the following command: `npm i @datafoodconsortium/connector`.

### Import and use the connector
Then in you JS file, import the newly installed connector:
```JS
import { Connector } from '@datafoodconsortium/connector';

const connector = new Connector();
```

### Load the taxonomies

You can then load our different SKOS taxonomies providing the corresponding JSON-LD files:
```JS
connector.loadMeasures(File.read("/path/to/measures.json"));
connector.loadFacets(File.read("/path/to/facets.json"));
connector.loadProductTypes(File.read("/path/to/productTypes.json"));
```

These taxonomies are accessible directly from the connector, like:
```JS
// Example of a facet
const fruit = connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT;

// Example of an measure
const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

// Example of a product type
const tomato = connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO;
```

## Object creation

You can create objects using the connector's factory or by calling the new operator by yourself.

_Remark: each newly created object will be saved into the store provided to the Connector. This store will allow you to access to the referenced objects more easily. You can disable this behavior passing the `doNotStore: true` parameter when constructing the objects._

### Using the connector's factory
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
- `IConnector:createAddress(parameters): IAddress;`
- `IConnector:createAllergenCharacteristic(parameters): IAllergenCharacteristic;`
- `IConnector:createCatalog(parameters): ICatalog;`
- `IConnector:createCatalogItem(parameters): ICatalogItem;`
- `IConnector:createCustomerCategory(parameters): ICustomerCategory;`
- `IConnector:createEnterprise(parameters): IEnterprise;`
- `IConnector:createNutrientCharacteristic(parameters): INutrientCharacteristic;`
- `IConnector:createOffer(parameters): IOffer;`
- `IConnector:createOrder(parameters): IOrder;`
- `IConnector:createOrderLine(parameters): IOrderLine;`
- `IConnector:createPerson(parameters): IPerson;`
- `IConnector:createPhysicalCharacteristic(parameters): IPhysicalCharacteristic;`
- `IConnector:createPrice(parameters): IPrice;`
- `IConnector:createQuantity(parameters): IQuantity;`
- `IConnector:createSaleSession(parameters): ISaleSession;`
- `IConnector:createSuppliedProduct(parameters): ISuppliedProduct;`

### Using the new operator

This is identical to the previous method except:
- you have to import all the concreate classes
- you have to set the connector parameter in the constructor

```JS
// You have to import all the concreate classes.
import { 
  CatalogItem,
  SuppliedProduct,
  QuantitativeValue,
  AllergenCharacteristic,
  NutrientCharacteristic,
  PhysicalCharacteristic
} from  "@datafoodconsortium/connector";

const quantity = new QuantitativeValue({ 
    connector: connector, // You have to pass a reference to the connector.
    value: 1.2, 
    unit: kilogram
});

const allergenCharacteristic = new AllergenCharacteristic({ 
    connector: connector, // You have to pass a reference to the connector.
    value: 1, 
    unit: kilogram, 
    allergenDimension: connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS 
});

const nutrientCharacteristic = new NutrientCharacteristic({ 
    connector: connector, // You have to pass a reference to the connector.
    value: 10, 
    unit: gram, 
    nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM 
});

const physicalCharacteristic = new PhysicalCharacteristic({ 
    connector: connector, // You have to pass a reference to the connector.
    value: 100, 
    unit: gram, 
    physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT 
});

const catalogItem = new CatalogItem({ 
    connector: connector, // You have to pass a reference to the connector.
    semanticId: "http://myplatform.com/catalogItem" 
});

let suppliedProduct = new SuppliedProduct({
    connector: connector, // You have to pass a reference to the connector.
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

**Available concreate classes:**
- `Address`
- `AllergenCharacteristic`
- `Catalog`
- `CatalogItem`
- `CustomerCategory`
- `Enterprise`
- `NutrientCharacteristic`
- `Offer`
- `Order`
- `OrderLine`
- `Person`
- `PhysicalCharacteristic`
- `Price`
- `QuantitativeValue`
- `SaleSession`
- `SuppliedProduct`

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
const objects: Semanticable[] = await connector.import(jsonAsAString));
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
await connector.import(jsonAsAString, { only: connector.TERMS.ORDER, limit: 3 });
```

You can also get a single element using the `importOne` helper method:
```JS
const Semanticable | undefined = await connector.importOne(jsonAsAString);
```

You can pass the `only` option to target one type using the `importOneTyped` method:
```JS
const order: string = "http://www.datafoodconsortium.org/ontologies/DFC_BusinessOntology.owl#Order";
const IOrder | undefined = await connector.importOneTyped<IOrder>(jsonAsAString, { only: order });
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

## Reference

### Address

`Connector:createAddress(parameters): IAddress`

```JS
parameters: {
  semanticId: string, 
  street?: string, 
  postalCode?: string, 
  city?: string, 
  country?: string,
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createAddress(parameters): IAddress`

```JS
parameters: {
  other: IAddress,
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### AllergenCharacteristic

`Connector:createAllergenCharacteristic(parameters): IAllergenCharacteristic`

```JS
parameters: {
  unit?: IUnit, 
  value?: number, 
  allergenDimension?: IAllergenDimension,
}
```

`Connector:createAllergenCharacteristic(parameters): IAllergenCharacteristic`

```JS
parameters: {
  other: IAllergenCharacteristic // construct the object by copy
}
```

### Catalog

`Connector:createCatalog(parameters): ICatalog`
  
```JS
parameters: {
  semanticId: string, 
  maintainers?: IEnterprise[], 
  items?: ICatalogItem[],
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createCatalog(parameters): ICatalog`
  
```JS
parameters: {
  other: ICatalog, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### CatalogItem

`Connector:createCatalogItem(parameters): ICatalogItem`
  
```JS
parameters: {
  semanticId: string, 
  product?: ISuppliedProduct, 
  sku?: string, 
  stockLimitation?: number, 
  offers?: IOffer[], 
  catalogs?: ICatalog[],
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createCatalogItem(parameters): ICatalogItem`
  
```JS
parameters: {
  other: ICatalogItem, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### CustomerCategory

`Connector:createCustomerCategory(parameters): ICustomerCategory`
  
```JS
parameters: {
  semanticId: string, 
  description?: string,
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createCustomerCategory(parameters): ICustomerCategory`
  
```JS
parameters: {
  other: ICustomerCategory, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### Enterprise

`Connector:createEnterprise(parameters): IEnterprise`
  
```JS
parameters: {
  semanticId: string, 
  localizations?: IAddress[], 
  description?: string, 
  vatNumber?: string, 
  customerCategories?: ICustomerCategory[], 
  catalogs?: ICatalog[], 
  catalogItems?: ICatalogItem[], 
  suppliedProducts?: ISuppliedProduct[],
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createEnterprise(parameters): IEnterprise`
  
```JS
parameters: {
  other: IEnterprise, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### NutrientCharacteristic

`Connector:createNutrientCharacteristic(parameters): INutrientCharacteristic`
  
```JS
parameters: {
  unit?: IUnit, 
  value?: number, 
  nutrientDimension?: INutrientDimension
}
```

`Connector:createNutrientCharacteristic(parameters): INutrientCharacteristic`
  
```JS
parameters: {
  other: INutrientCharacteristic // construct the object by copy
}
```

### Offer

`Connector:createOffer(parameters): IOffer`
  
```JS
parameters: {
  semanticId: string, 
  offeredItem?: ICatalogItem, 
  offeredTo?: ICustomerCategory, 
  price?: IPrice, 
  stockLimitation?: number,
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createOffer(parameters): IOffer`
  
```JS
parameters: {
  other: IOffer, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### Order

`Connector:createOrder(parameters): IOrder`
  
```JS
parameters: {
  semanticId: string, 
  number?: string, 
  date?: string, 
  saleSession?: ISaleSession, 
  client?: IAgent, 
  lines?: IOrderLine[],
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createOrder(parameters): IOrder`
  
```JS
parameters: {
  other: IOrder, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### OrderLine

`Connector:createOrderLine(parameters): IOrderLine`
  
```JS
parameters: {
  semanticId: string, 
  quantity?: number, 
  price?: IPrice, 
  offer?: IOffer, 
  order?: IOrder,
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createOrderLine(parameters): IOrderLine`
  
```JS
parameters: {
  other: IOrderLine, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### Person

`Connector:createPerson(parameters): IPerson`
  
```JS
parameters: {
  semanticId: string, 
  firstName?: string, 
  lastName?: string, 
  localizations?: IAddress[], 
  organizations?: IEnterprise[],
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createPerson(parameters): IPerson`
  
```JS
parameters: {
  other: IPerson, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### PhysicalCharacteristic

`Connector:createPhysicalCharacteristic(parameters): IPhysicalCharacteristic`
  
```JS
parameters: {
  unit?: IUnit, 
  value?: number, 
  physicalDimension?: IPhysicalDimension
}
```

`Connector:createPhysicalCharacteristic(parameters): IPhysicalCharacteristic`
  
```JS
parameters: {
  other: IPhysicalCharacteristic // construct the object by copy
}
```

### Price

`Connector:createPrice(parameters): IPrice`
  
```JS
parameters: {
  value?: number, 
  vatRate?: number, 
  unit?: IUnit
}
```

`Connector:createPrice(parameters): IPrice`
  
```JS
parameters: {
  other: IPrice // construct the object by copy
}
```

### Quantity

`Connector:createQuantity(parameters): IQuantity`
  
```JS
parameters: {
  unit?: IUnit, 
  value?: number
}
```

`Connector:createQuantity(parameters): IQuantity`
  
```JS
parameters: {
  other: IQuantity // construct the object by copy
}
```

### SaleSession

`Connector:createSaleSession(parameters): ISaleSession`
  
```JS
parameters: {
  semanticId: string, 
  beginDate?: string, 
  endDate?: string, 
  quantity?: number, 
  offers?: IOffer[],
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createSaleSession(parameters): ISaleSession`
  
```JS
parameters: {
  other: ISaleSession, // construct the object by copy
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

### SuppliedProduct

`Connector:createSuppliedProduct(parameters): ISuppliedProduct`
  
```JS
parameters: {
  semanticId: string, 
  name?: string, 
  description?: string, 
  productType?: IProductType, 
  quantity?: IQuantity, 
  alcoholPercentage?: number, 
  lifetime?: string, 
  claims?: IClaim[], 
  usageOrStorageConditions?: string, 
  allergenCharacteristics?: IAllergenCharacteristic[], 
  nutrientCharacteristics?: INutrientCharacteristic[], 
  physicalCharacteristics?: IPhysicalCharacteristic[], 
  geographicalOrigin?: IGeographicalOrigin, 
  catalogItems?: ICatalogItem[], 
  certifications?: ICertification[], 
  natureOrigin?: INatureOrigin[], 
  partOrigin?: IPartOrigin[], 
  totalTheoreticalStock?: number,
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```

`Connector:createSuppliedProduct(parameters): ISuppliedProduct`
  
```JS
parameters: {
  other: ISuppliedProduct, // construct the object by copy 
  doNotStore?: boolean // if true, do not save the object into the connector store
}
```
