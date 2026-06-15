RSpec.describe DataFoodConsortium::ConnectorV1::RealizedTransformation do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::RealizedTransformation.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:AsRealizedTransformation",
    )
  end

  it "contains all fields when exported" do
    consumptionFlow = DataFoodConsortium::ConnectorV1::PlannedConsumptionFlow.new("https://myplatform.com/input")
    productionFlow = DataFoodConsortium::ConnectorV1::PlannedProductionFlow.new("https://myplatform.com/output")
    subject = DataFoodConsortium::ConnectorV1::RealizedTransformation.new(
      "https://myplatform.com/cc",
      consumptionFlow: consumptionFlow,
      productionFlow: productionFlow,
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:AsRealizedTransformation",
      "dfc-b:hasInput" => "https://myplatform.com/input",
      "dfc-b:hasOutput" => "https://myplatform.com/output",
    )
  end
end
