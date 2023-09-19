# Data Food Consortium Connector

The Data Food Consortium (DFC) Connector is a tool to help you to integrate the DFC standard within you application.

Each concept of the DFC ontology can be manipulated with the help of the corresponding class supplied by the connector.

This connector will also help you to import and export data so you can exchange information with other DFC standard compliant platforms.

The [Data Food Consortium](https://datafoodconsortium.org) project (DFC) aims to provide interoperability between food supply chain platforms.

## Get started

The API reference is available [here](http://docs.datafoodconsortium.org/connector-php/).

### Install

You can install the connector with composer:
```SH
composer require datafoodconsortium/connector
```

### Load the taxonomies

You can then load our different SKOS taxonomies providing the corresponding JSON-LD files:
```PHP
$connector->import("/path/to/measures.json");
$connector->import("/path/to/facets.json");
$connector->import("/path/to/productTypes.json");
```

These taxonomies are accessible directly from the connector, like:
```PHP
// Example of a facet
$fruit = $connector->fetch("dfcf:Fruit");

// Example of an measure
$kilogram = $connector->fetch("dfcm:Kilogram");

// Example of a product type
$tomato = $connector->fetch("dfcpt:RoundTomato");
```

## Object creation

You can create objects by calling the new operator.

_Remark: each newly created object will be saved into the store provided to the Connector. This store will allow you to access to the referenced objects more easily. You can disable this behavior passing the `doNotStore: true` parameter when constructing the objects._

_Remark: Except for anonymous objects (blank nodes), the `semanticId` constructor parameter is mandatory. All the other parameters are optional._

```PHP
$quantity = new QuantitativeValue( 
    connector: $connector, // You have to pass a reference to the connector.
    value: 1.2, 
    unit: $kilogram
);

$allergenCharacteristic = new AllergenCharacteristic( 
    connector: $connector, // You have to pass a reference to the connector.
    value: 1, 
    unit: $kilogram, 
    allergenDimension: $connector->fetch("dfcm:Peanuts"); 
);

$nutrientCharacteristic = new NutrientCharacteristic( 
    connector: $connector, // You have to pass a reference to the connector.
    value: 10, 
    unit: $gram, 
    nutrientDimension: $connector->fetch("dfcm:Calcium")
);

$physicalCharacteristic = new PhysicalCharacteristic({ 
    connector: $connector, // You have to pass a reference to the connector.
    value: 100, 
    unit: $gram, 
    physicalDimension: $connector->fetch("dfcm:Weight") 
});

$catalogItem = new CatalogItem({ 
    connector: $connector, // You have to pass a reference to the connector.
    semanticId: "http://myplatform.com/catalogItem" 
});

$suppliedProduct = new SuppliedProduct({
    connector: onnector, // You have to pass a reference to the connector.
    semanticId: "http://myplatform.com/tomato",
    description: "Awesome tomato",
    productType: $connector->fetch("dfcpt:RoundTomato"), 
    quantity: $quantity,
    totalTheoreticalStock: 2.23,
    alcoholPercentage: 0, 
    lifetime: "a week", 
    claims: [$connector->fetch("dfcf:NoAddedSugar")], 
    usageOrStorageConditions: "free text", 
    allergenCharacteristics: [$allergenCharacteristic],
    nutrientCharacteristics: [$nutrientCharacteristic],
    physicalCharacteristics: [$physicalCharacteristic],
    geographicalOrigin: $connector->fetch("dfcf:CentreValLoire"),
    catalogItems: [$catalogItem], 
    certifications: [$connector->fetch("dfcf:OrganicAB"), $connector->fetch("dfcf:OrganicEU")],
    natureOrigin: [$connector->fetch("dfcf:PlantOrigin")],
    partOrigin: [$connector->fetch("dfcf:Fruit")]
});
```

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
- `Quantity`
- `SaleSession`
- `SKOSConcept`
- `SuppliedProduct`
- `TechnicalProduct`

## Object accessors and mutators

### Read object properties (accessor)
You can read the properties of an objet using getter methods.

```PHP
$suppliedProduct->getDescription();
```

The previous method returned a simple string. But an object ofen contains other objects. In the semantic web, every object has its own URI (it is stored at an other location on the network). So we will store only a reference to these contained objects using their URI. They are called "referenced objects".

To access a referenced object using the connector there is nothing special to do:
```PHP
$addresses = $person->getLocalizations();
```

_Remark: Running the previous code sample will trigger a call to the `fetch` function of the connector. If the referenced object it is not already in the connector store, it will be downloaded from the network._

### Change object properties (mutator)

If you want to change a property after the creation of the object, you can use its proper setter method like:
```PHP
// Set the quantity of the product
$suppliedProduct->setQuantity(new QuantitiveValue(connector: $connector, unit: $kilogram, value: 2.6));
```

You can also add a value to properties that are array:
```PHP
// Add a new certification to the product
$suppliedProduct->addCertification($connector->fetch("dfcf:AocFR"));
```

## Export objects

With the Connector, you can export DFC object(s). The default exporter exports objects to JSON-LD:
```PHP
$connector->export([$suppliedProduct]));
```

This will output DFC compliant valid JSON-LD like:
```JS
{
  "@context": "http://static.datafoodconsortium.org/ontologies/context.json",
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
```PHP
$objects = $connector->import($jsonAsAString));
```

The default fetch function looks like:
```PHP
function getDefaultfetchFunction(string $semanticObjectId): string {
  $opts = array('http' => array('method' => "GET", 'header' => "Accept: application/ld+json"));
  $context = stream_context_create($opts);
  return file_get_contents($semanticObjectId, false, $context);
}
```

You can pass a custom function via the `Connector::setFetchFunction` method.

## Configure

You can adapt different components of the connector to your needs with the following connector methods:

```PHP
// Set the function that will fetch the referenced objects when importing data.
Connector::setFetchFunction(\Closure $fetch);

// Set the object used to create new instances.
Connector::setFactory(IFactory $factory);
```

See the [Semantizer](https://github.com/assemblee-virtuelle/semantizer-php) documentation for more details.