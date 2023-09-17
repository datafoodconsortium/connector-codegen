# Data Food Consortium Ruby connector

The Data Food Consortium connector is a tool to help you to integrate the DFC standard within you application. Each concept of the DFC ontology can be manipulated with the help of the corresponding class supplied by the connector.

This connector will also help you to generate the JSON-LD required by the other DFC compliant platforms to exchange data.

The [Data Food Consortium](https://datafoodconsortium.org) project (DFC) which aims to provide interoperability between food supply chain platforms. We use the [Semantizer library](https://github.com/assemblee-virtuelle/semantizer-ruby/) inside our connector library to help developers to exchange JSON-LD data expressed with the DFC ontology.

## Get started

You can install the connector with the following command: `gem install datafoodconsortium-connector`.

Then in you Ruby file, import the newly installed connector:
```RB
require 'datafoodconsortium/connector'
```

The connector is a singleton. To get it, access the instance member of the class:
```RB
connector = DataFoodConsortium::Connector::Connector.instance
```

You can then load our different SKOS vocabularies providing the corresponding JSON-LD files:
```RB
connector.loadMeasures(JSON.parse(File.read("/path/to/measures.json")))
connector.loadFacets(JSON.parse(File.read("/path/to/facets.json")))
connector.loadProductTypes(JSON.parse(File.read("/path/to/productTypes.json")))
```

Then you can create product like:
```RB
tomato = DataFoodConsortium::Connector::SuppliedProduct.new(
  "https://myplatform.com/tomato",
  name: "Tomato", 
  description: "Awesome tomato"
)
```

__Remark:__ The first argument is the semantic id (URI) of the object. Be sure to provide one except for anonymous objects like `Price`, `QuantitativeValue`, `NutrientCharacteristic`, `PhysicalCharacteristic` and `AllergenCharacteristic`.

You can set the different properties for the object, like adding a certification. The connector provide helpers to get the certification from the previously loaded vocabularies:
```RB
tomato.addCertification(connector.FACETS.CERTIFICATION.BIODYNAMICLABEL.DEMETER)
```

__Remark:__ To get a list of possible values you can browse our [VocBench](https://vocbench.datafoodconsortium.org/vocbench3/) (you must register and ask an admin for permission). To ease this process we have planned to publish another tool which does not require registration ([ShowVoc](http://showvoc.uniroma2.it/)). Alternatively we would generate a documentation listing the different taxons.

To finish you can export the DFC object to JSON-LD with:
```RB
puts connector.export(tomato)
```

Note that you can export mutiple objects passing them to the method: `connector.export(object1, object2, ...)`.

This will output DFC compliant valid JSON-LD:
```JSON
{
  "@context": "http://static.datafoodconsortium.org/ontologies/context.json",
  "@id": "https://myplatform.com/tomato",
  "@type": "dfc-b:SuppliedProduct",
  "dfc-b:name": "Tomato",
  "dfc-b:description": "Awesome tomato",
  "dfc-b:alcoholPercentage": 0.0,
  "dfc-b:lifetime": "",
  "dfc-b:usageOrStorageCondition": "",
  "dfc-b:hasCertification": "dfc-f:Demeter",
  "dfc-b:totalTheoreticalStock": 0.0
}
```

__Important:__ Please note that the exporter does not dereference the objects. If you want to include them in the output, just pass these objects to the `export` method:
```RB
puts connector.export(catalogItem, tomato)
```

This will append the added object into the `@graph`:
```JSON
{
  "@context": "http://static.datafoodconsortium.org/ontologies/context.json",
  "@graph": [
    {
      "@type": "dfc-b:CatalogItem",
      "dfc-b:references": "https://myplatform.com/tomato",
      "@id": "https://myplatform.com/catalogItem"
    },
    {
      "@id": "https://myplatform.com/tomato",
      "@type": "dfc-b:SuppliedProduct",
      "dfc-b:name": "Tomato",
      "dfc-b:description": "Awesome tomato",
      "dfc-b:alcoholPercentage": 0.0,
      "dfc-b:lifetime": "",
      "dfc-b:usageOrStorageCondition": "",
      "dfc-b:hasCertification": "dfc-f:Demeter",
      "dfc-b:totalTheoreticalStock": 0.0
    }
  ]
}
```

## Complete example

This example demonstrates how to export a producer's data in JSON-LD like required by the [DFC 1.7.1 practical example](https://datafoodconsortium.gitbook.io/dfc-standard-documentation/appendixes/practical-examples/version-1.7).

```RB
# Customer category defined by the Enterprise.
customerCategory = DataFoodConsortium::Connector::CustomerCategory.new(
    "https://myplatform.com/cc",
    description: "description"
)

# SuppliedProduct suppled by the Enterprise.
suppliedProduct = DataFoodConsortium::Connector::SuppliedProduct.new(
    "https://myplatform.com/sp", 
    name: "name", 
    description: "description", 
    productType: connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE,
    quantity: DataFoodConsortium::Connector::QuantitativeValue.new(
        unit: connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM,
        value: 1.2
    ),
    totalTheoreticalStock: 123,
    alcoholPercentage: 2.6,
    lifetime: "lifetime",
    usageOrStorageConditions: "usageOrStorageConditions",
    certifications: [connector.FACETS.CERTIFICATION.BIODYNAMICLABEL.DEMETER],
    claims: [
      connector.FACETS.CLAIM.NUTRITIONALCLAIM.ENERGYFREE,
      connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE,
      connector.FACETS.CLAIM.NUTRITIONALCLAIM.HIGHFIBRE
    ],
    allergenCharacteristics: [
      
    ], 
    nutrientCharacteristics: [
      DataFoodConsortium::Connector::NutrientCharacteristic.new(
        nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM,
        unit: connector.MEASURES.UNIT.QUANTITYUNIT.GRAM,
        value: 8.47
      )
    ], 
    physicalCharacteristics: [
      DataFoodConsortium::Connector::PhysicalCharacteristic.new(
        physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT,
        unit: connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM,
        value: 3.25
      )
    ],
    geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY,
    natureOrigin: connector.FACETS.NATUREORIGIN.PLANTORIGIN,
    partOrigin: connector.FACETS.NATUREORIGIN.PLANTORIGIN
)

# The Offer sell a CatalogItem for a price to a CustomerCategory.
offer = DataFoodConsortium::Connector::Offer.new(
    "https://myplatform.com/o",
    price: DataFoodConsortium::Connector::Price.new(
        value: 12.78,
        vatRate: 5.22,
        unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
    ),
    stockLimitation: 52,  
    offeredTo: customerCategory
)

# The CatalogItem holds the stock limitation and allows the product to be sold through an Offer.
catalogItem = DataFoodConsortium::Connector::CatalogItem.new(
    "https://myplatform.com/ci",
    product: suppliedProduct, 
    sku: "sku", 
    stockLimitation: 10, 
    offers: [offer]
)

# The Enterprise that the producer is affiliated to.
enterprise = DataFoodConsortium::Connector::Enterprise.new(
    "https://myplatform.com/e",
    name: "name", 
    description: "description", 
    vatNumber: "vatNumber", 
    customerCategories: [customerCategory], 
    suppliedProducts: [suppliedProduct], 
    catalogItems: [catalogItem], 
)

# Address of the producer.
address = DataFoodConsortium::Connector::Address.new(
    "https://myplatform.com/a",
    street: "street", 
    postalCode: "postalCode", 
    city: "city", 
    country: "country"
)

# The producer itself.
person = DataFoodConsortium::Connector::Person.new(
    "https://myplatform.com/p",
    firstName: "firstName", 
    lastName: "lastName", 
    affiliatedOrganizations: [enterprise], 
    localizations: [address]
)
```

To export all of these information into JSON-LD, use:
```RB
connector.export(
  person, 
  address, 
  enterprise, 
  customerCategory, 
  suppliedProduct, 
  catalogItem, 
  offer
)
```

## Documentation

A basic documentation could be generated with [Yard](https://yardoc.org/).

You could install it with `gem install yard`.

To produce the documentation just type `yard doc`. Then open the `index.html` file in the `/doc` folder.

## Tests

Some unit tests are in the `/test` folder.

To run them, just type `rake`.

## Contributing

Contributions are welcome.

The Pull Requests should be made on our [source code generator repository](https://github.com/datafoodconsortium/connector-codegen-ruby) as the code hosted on this repository is generated.
