RSpec.describe DataFoodConsortium::ConnectorV1::PlannedLocalTransformation do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::PlannedLocalTransformation.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:AsPlannedLocalTransformation",
    )
  end

  it "contains all fields when exported" do
    consumptionFlow = DataFoodConsortium::ConnectorV1::PlannedLocalConsumptionFlow.new("https://myplatform.com/input")
    productionFlow = DataFoodConsortium::ConnectorV1::PlannedLocalProductionFlow.new("https://myplatform.com/output")
    subject = DataFoodConsortium::ConnectorV1::PlannedLocalTransformation.new(
      "https://myplatform.com/cc",
      consumptionFlow: consumptionFlow,
      productionFlow: productionFlow,
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:AsPlannedLocalTransformation",
      "dfc-b:hasInput" => "https://myplatform.com/input",
      "dfc-b:hasOutput" => "https://myplatform.com/output",
    )
  end
end
