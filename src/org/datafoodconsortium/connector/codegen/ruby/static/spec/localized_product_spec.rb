RSpec.describe DataFoodConsortium::Connector::LocalizedProduct do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::LocalizedProduct.new(
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
    quantity = DataFoodConsortium::Connector::QuantitativeValue.new()
    theoreticalStock = DataFoodConsortium::Connector::TheoreticalStock.new("https://myplatform.com/theoreticalStock")
    suppliedProduct = DataFoodConsortium::Connector::SuppliedProduct.new("https://myplatform.com/suppliedProduct")
    physicalProduct = DataFoodConsortium::Connector::PhysicalProduct.new("https://myplatform.com/physicalProduct")
    plannedLocalProductionFlow = DataFoodConsortium::Connector::PlannedLocalProductionFlow.new("https://myplatform.com/plannedLocalProductionFlow")
    plannedLocalConsumptionFlow = DataFoodConsortium::Connector::PlannedLocalConsumptionFlow.new("https://myplatform.com/plannedLocalConsumptionFlow")
    subject = DataFoodConsortium::Connector::LocalizedProduct.new(
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
