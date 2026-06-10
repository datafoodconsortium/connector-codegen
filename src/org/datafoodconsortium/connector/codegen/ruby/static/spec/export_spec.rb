RSpec.describe DataFoodConsortium::ConnectorV1::Connector do
  it "exports an empty list" do
    subjects = []
    actual = exported_json(*subjects)
    expected = {
      "@context" => "https://w3id.org/dfc/ontology/context/context_1.16.0.json"
    }
    expect(actual).to eq expected
  end

  it "exports multiple subjects in a graph" do
    a = DataFoodConsortium::ConnectorV1::Address.new(
      "https://myplatform.com/a",
      street: "street",
      postalCode: "postalCode",
      city: "city",
      country: "country"
    )
    cc = DataFoodConsortium::ConnectorV1::CustomerCategory.new(
      "https://myplatform.com/cc",
      description: "description"
    )
    sp = DataFoodConsortium::ConnectorV1::SuppliedProduct.new(
      "https://myplatform.com/sp",
      name: "name",
      description: "description",
      productType: connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE,
      quantity: DataFoodConsortium::ConnectorV1::QuantitativeValue.new(
        unit: connector.MEASURES.KILOGRAM,
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
      allergenCharacteristics: [],
      nutrientCharacteristics: [
        DataFoodConsortium::ConnectorV1::NutrientCharacteristic.new(
          nutrientDimension: connector.MEASURES.CALCIUM,
          unit: connector.MEASURES.GRAM,
          value: 8.47
        )
      ],
      physicalCharacteristics: [
        DataFoodConsortium::ConnectorV1::PhysicalCharacteristic.new(
          physicalDimension: connector.MEASURES.WEIGHT,
          unit: connector.MEASURES.KILOGRAM,
          value: 3.25
        )
      ],
      geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY,
      natureOrigin: connector.FACETS.NATUREORIGIN.PLANTORIGIN,
      partOrigin: connector.FACETS.NATUREORIGIN.PLANTORIGIN
    )
    o = DataFoodConsortium::ConnectorV1::Offer.new(
      "https://myplatform.com/o",
      price: DataFoodConsortium::ConnectorV1::Price.new(
        value: 12.78,
        vatRate: 5.22,
        unit: connector.MEASURES.EURO
      ),
      stockLimitation: 52,
      offeredTo: cc
    )
    ci = DataFoodConsortium::ConnectorV1::CatalogItem.new(
      "https://myplatform.com/ci",
      product: sp,
      sku: "sku",
      stockLimitation: 10,
      offers: [o]
    )
    e = DataFoodConsortium::ConnectorV1::Enterprise.new(
      "https://myplatform.com/e",
      name: "name",
      description: "description",
      vatNumber: "vatNumber",
      customerCategories: [cc],
      suppliedProducts: [sp],
      catalogItems: [ci],
      localizations: []
    )
    p = DataFoodConsortium::ConnectorV1::Person.new(
      "https://myplatform.com/p",
      firstName: "firstName",
      lastName: "lastName",
      affiliatedOrganizations: [e],
      localizations: [a]
    )
    actual = exported_json(p, a, e, cc, sp, ci, o)
    expected = {
      '@context' => 'https://w3id.org/dfc/ontology/context/context_1.16.0.json',
      '@graph' => [
        { '@id' => 'https://myplatform.com/p', '@type' => 'dfc-b:Person', 'dfc-b:affiliates' => 'https://myplatform.com/e',
          'dfc-b:familyName' => 'lastName', 'dfc-b:firstName' => 'firstName', 'dfc-b:hasAddress' => 'https://myplatform.com/a' }, { '@id' => 'https://myplatform.com/a', '@type' => 'dfc-b:Address', 'dfc-b:hasCity' => 'city', 'dfc-b:hasCountry' => 'country', 'dfc-b:hasPostalCode' => 'postalCode', 'dfc-b:hasStreet' => 'street' }, { '@id' => 'https://myplatform.com/e', '@type' => 'dfc-b:Enterprise', 'dfc-b:VATnumber' => 'vatNumber', 'dfc-b:defines' => 'https://myplatform.com/cc', 'dfc-b:hasDescription' => 'description', 'dfc-b:manages' => 'https://myplatform.com/ci', 'dfc-b:name' => 'name', 'dfc-b:supplies' => 'https://myplatform.com/sp' }, { '@id' => 'https://myplatform.com/cc', '@type' => 'dfc-b:CustomerCategory', 'dfc-b:description' => 'description' }, { '@id' => 'https://myplatform.com/sp', '@type' => 'dfc-b:SuppliedProduct', 'dfc-b:alcoholPercentage' => 2.6, 'dfc-b:description' => 'description', 'dfc-b:hasCertification' => 'dfc-f:Demeter', 'dfc-b:hasClaim' => ['dfc-f:EnergyFree', 'dfc-f:FatFree', 'dfc-f:HighFibre'], 'dfc-b:hasGeographicalOrigin' => 'dfc-f:Normandy', 'dfc-b:hasNatureOrigin' => 'dfc-f:PlantOrigin', 'dfc-b:hasNutrientCharacteristic' => { '@type' => 'dfc-b:NutrientCharacteristic', 'dfc-b:hasNutrientDimension' => 'dfc-m:Calcium', 'dfc-b:hasUnit' => 'dfc-m:Gram', 'dfc-b:value' => 8.47 }, 'dfc-b:hasPartOrigin' => 'dfc-f:PlantOrigin', 'dfc-b:hasPhysicalCharacteristic' => { '@type' => 'dfc-b:PhysicalCharacteristic', 'dfc-b:hasPhysicalDimension' => 'dfc-m:Weight', 'dfc-b:hasUnit' => 'dfc-m:Kilogram', 'dfc-b:value' => 3.25 }, 'dfc-b:hasQuantity' => { '@type' => 'dfc-b:QuantitativeValue', 'dfc-b:hasUnit' => 'dfc-m:Kilogram', 'dfc-b:value' => 1.2 }, 'dfc-b:hasType' => 'dfc-pt:artichoke', 'dfc-b:lifetime' => 'lifetime', 'dfc-b:name' => 'name', 'dfc-b:totalTheoreticalStock' => 123, 'dfc-b:usageOrStorageCondition' => 'usageOrStorageConditions' }, { '@id' => 'https://myplatform.com/ci', '@type' => 'dfc-b:CatalogItem', 'dfc-b:offeredThrough' => 'https://myplatform.com/o', 'dfc-b:references' => 'https://myplatform.com/sp', 'dfc-b:sku' => 'sku', 'dfc-b:stockLimitation' => 10 }, { '@id' => 'https://myplatform.com/o', '@type' => 'dfc-b:Offer', 'dfc-b:hasPrice' => { '@type' => 'dfc-b:Price', 'dfc-b:VATrate' => 5.22, 'dfc-b:hasUnit' => 'dfc-m:Euro', 'dfc-b:value' => 12.78 }, 'dfc-b:offeredTo' => 'https://myplatform.com/cc', 'dfc-b:stockLimitation' => 52 }
      ],
    }
    expect(actual).to eq(expected)
  end
end
