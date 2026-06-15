RSpec.describe DataFoodConsortium::ConnectorV1::LocalizedProduct do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::LocalizedProduct.new(
      "https://myplatform.com/subject"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/subject",
        "@type" => "dfc-b:LocalizedProduct",
      }
    )
  end

  it "contains all fields when exported" do
    quantity = DataFoodConsortium::ConnectorV1::QuantitativeValue.new()
    theoreticalStock = DataFoodConsortium::ConnectorV1::TheoreticalStock.new("https://myplatform.com/theoreticalStock")
    suppliedProduct = DataFoodConsortium::ConnectorV1::SuppliedProduct.new("https://myplatform.com/suppliedProduct")
    physicalProduct = DataFoodConsortium::ConnectorV1::PhysicalProduct.new("https://myplatform.com/physicalProduct")
    plannedLocalProductionFlow = DataFoodConsortium::ConnectorV1::PlannedLocalProductionFlow.new("https://myplatform.com/plannedLocalProductionFlow")
    plannedLocalConsumptionFlow = DataFoodConsortium::ConnectorV1::PlannedLocalConsumptionFlow.new("https://myplatform.com/plannedLocalConsumptionFlow")
    subject = DataFoodConsortium::ConnectorV1::LocalizedProduct.new(
      "https://myplatform.com/subject",
      name: "name",
      description: "description",
      images: ["image"],
      quantity: quantity,
      cost: 1.0,
      theoreticalStocks: [theoreticalStock],
      suppliedProducts: [suppliedProduct],
      physicalProducts: [physicalProduct],
      plannedLocalProductionFlows: [plannedLocalProductionFlow],
      plannedLocalConsumptionFlows: [plannedLocalConsumptionFlow],
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/subject",
        "@type" => "dfc-b:LocalizedProduct",
        "dfc-b:name" => "name",
        "dfc-b:description" => "description",
        "dfc-b:image" => "image",
        "dfc-b:hasQuantity" => {"@type" => "dfc-b:QuantitativeValue"},
        "dfc-b:cost" => 1.0,
        "dfc-b:constituedBy" => "https://myplatform.com/theoreticalStock",
        "dfc-b:hasReference" => "https://myplatform.com/suppliedProduct",
        "dfc-b:representedBy" => "https://myplatform.com/physicalProduct",
        "dfc-b:producedBy" => "https://myplatform.com/plannedLocalProductionFlow",
        "dfc-b:consumedBy" => "https://myplatform.com/plannedLocalConsumptionFlow",
      }
    )
  end
end
