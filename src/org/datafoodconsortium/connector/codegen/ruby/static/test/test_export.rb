require 'connector'
require "minitest/autorun"
require 'datafoodconsortium/connector'

class ExportTest < Minitest::Test

  def test_export
    a = DataFoodConsortium::Connector::Address.new(
        "https://myplatform.com/a",
        street: "street", 
        postalCode: "postalCode", 
        city: "city", 
        country: "country"
    )
    cc = DataFoodConsortium::Connector::CustomerCategory.new(
        "https://myplatform.com/cc",
        description: "description"
    )
    sp = DataFoodConsortium::Connector::SuppliedProduct.new(
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
    o = DataFoodConsortium::Connector::Offer.new(
        "https://myplatform.com/o",
        price: DataFoodConsortium::Connector::Price.new(
            value: 12.78,
            vatRate: 5.22,
            unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
        ),
        stockLimitation: 52,  
        offeredTo: cc
    )
    ci = DataFoodConsortium::Connector::CatalogItem.new(
        "https://myplatform.com/ci",
        product: sp, 
        sku: "sku", 
        stockLimitation: 10, 
        offers: [o]
    )
    e = DataFoodConsortium::Connector::Enterprise.new(
        "https://myplatform.com/e",
        name: "name", 
        description: "description", 
        vatNumber: "vatNumber", 
        customerCategories: [cc], 
        suppliedProducts: [sp], 
        catalogItems: [ci], 
        localizations: []
    )
    p = DataFoodConsortium::Connector::Person.new(
        "https://myplatform.com/p",
        firstName: "firstName", 
        lastName: "lastName", 
        affiliatedOrganizations: [e], 
        localizations: [a]
    )
    actual = connector.export(p, a, e, cc, sp, ci, o)
    expected = '{"@context":"https://www.datafoodconsortium.org","@graph":[{"@id":"https://myplatform.com/p","@type":"dfc-b:Person","dfc-b:hasAddress":"https://myplatform.com/a","dfc-b:firstName":"firstName","dfc-b:familyName":"lastName","dfc-b:affiliates":"https://myplatform.com/e"},{"@id":"https://myplatform.com/a","@type":"dfc-b:Address","dfc-b:hasStreet":"street","dfc-b:hasPostalCode":"postalCode","dfc-b:hasCity":"city","dfc-b:hasCountry":"country"},{"@id":"https://myplatform.com/e","@type":"dfc-b:Enterprise","dfc-b:hasName":"name","dfc-b:hasDescription":"description","dfc-b:VATnumber":"vatNumber","dfc-b:defines":"https://myplatform.com/cc","dfc-b:supplies":"https://myplatform.com/sp","dfc-b:manages":"https://myplatform.com/ci"},{"@id":"https://myplatform.com/cc","@type":"dfc-b:CustomerCategory","dfc-b:description":"description"},{"@id":"https://myplatform.com/sp","@type":"dfc-b:SuppliedProduct","dfc-b:name":"name","dfc-b:description":"description","dfc-b:hasType":"dfc-pt:artichoke","dfc-b:hasQuantity":{"@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":1.2},"dfc-b:alcoholPercentage":2.6,"dfc-b:lifetime":"lifetime","dfc-b:hasClaim":["dfc-f:EnergyFree","dfc-f:FatFree","dfc-f:HighFibre"],"dfc-b:usageOrStorageCondition":"usageOrStorageConditions","dfc-b:hasNutrientCharacteristic":{"@type":"dfc-b:NutrientCharacteristic","dfc-b:hasUnit":"dfc-m:Gram","dfc-b:value":8.47,"dfc-b:hasNutrientDimension":"dfc-m:Calcium"},"dfc-b:hasPhysicalCharacteristic":{"@type":"dfc-b:PhysicalCharacteristic","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":3.25,"dfc-b:hasPhysicalDimension":"dfc-m:Weight"},"dfc-b:hasGeographicalOrigin":"dfc-f:Normandy","dfc-b:hasCertification":"dfc-f:Demeter","dfc-b:hasNatureOrigin":"dfc-f:PlantOrigin","dfc-b:hasPartOrigin":"dfc-f:PlantOrigin","dfc-b:totalTheoreticalStock":123},{"@id":"https://myplatform.com/ci","@type":"dfc-b:CatalogItem","dfc-b:references":"https://myplatform.com/sp","dfc-b:sku":"sku","dfc-b:stockLimitation":10,"dfc-b:offeredThrough":"https://myplatform.com/o"},{"@id":"https://myplatform.com/o","@type":"dfc-b:Offer","dfc-b:hasPrice":{"@type":"dfc-b:Price","dfc-b:value":12.78,"dfc-b:VATrate":5.22,"dfc-b:hasUnit":"dfc-m:Euro"},"dfc-b:stockLimitation":52,"dfc-b:offeredTo":"https://myplatform.com/cc"}]}'
    assert_equal expected, actual
  end

end