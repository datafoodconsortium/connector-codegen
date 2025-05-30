RSpec.describe DataFoodConsortium::Connector::SuppliedProduct do
  it "can be empty when exported" do
    sp = DataFoodConsortium::Connector::SuppliedProduct.new("https://myplatform.com/sp")
    actual = connector.export(sp)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/sp","@type":"dfc-b:SuppliedProduct"}'
    expect(actual).to eq expected
  end

  it "contains all fields when exported" do
    quantity = DataFoodConsortium::Connector::QuantitativeValue.new(
      unit: connector.MEASURES.KILOGRAM,
      value: 1.2
    )

    sp = DataFoodConsortium::Connector::SuppliedProduct.new(
      "https://myplatform.com/sp",
      name: "name",
      description: "description",
      productType: connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE,
      quantity: quantity,
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
        DataFoodConsortium::Connector::NutrientCharacteristic.new(
          nutrientDimension: connector.MEASURES.CALCIUM,
          unit: connector.MEASURES.GRAM,
          value: 8.47
        )
      ],
      physicalCharacteristics: [
        DataFoodConsortium::Connector::PhysicalCharacteristic.new(
          physicalDimension: connector.MEASURES.WEIGHT,
          unit: connector.MEASURES.KILOGRAM,
          value: 3.25
        )
      ],
      geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY,
      natureOrigin: connector.FACETS.NATUREORIGIN.PLANTORIGIN,
      partOrigin: connector.FACETS.NATUREORIGIN.PLANTORIGIN
    )

    actual = connector.export(sp)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/sp","@type":"dfc-b:SuppliedProduct","dfc-b:name":"name","dfc-b:description":"description","dfc-b:hasType":"dfc-pt:artichoke","dfc-b:hasQuantity":{"@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":1.2},"dfc-b:alcoholPercentage":2.6,"dfc-b:lifetime":"lifetime","dfc-b:hasClaim":["dfc-f:EnergyFree","dfc-f:FatFree","dfc-f:HighFibre"],"dfc-b:usageOrStorageCondition":"usageOrStorageConditions","dfc-b:hasNutrientCharacteristic":{"@type":"dfc-b:NutrientCharacteristic","dfc-b:hasUnit":"dfc-m:Gram","dfc-b:value":8.47,"dfc-b:hasNutrientDimension":"dfc-m:Calcium"},"dfc-b:hasPhysicalCharacteristic":{"@type":"dfc-b:PhysicalCharacteristic","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":3.25,"dfc-b:hasPhysicalDimension":"dfc-m:Weight"},"dfc-b:hasGeographicalOrigin":"dfc-f:Normandy","dfc-b:hasCertification":"dfc-f:Demeter","dfc-b:hasNatureOrigin":"dfc-f:PlantOrigin","dfc-b:hasPartOrigin":"dfc-f:PlantOrigin","dfc-b:totalTheoreticalStock":123}'
    expect(actual).to eq expected
  end
end
