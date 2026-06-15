RSpec.describe DataFoodConsortium::ConnectorV1::RealStock do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::RealStock.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:RealStock",
    )
  end

  it "contains all fields when exported" do
    physicalProduct = DataFoodConsortium::ConnectorV1::PhysicalProduct.new("https://myplatform.com/physicalProduct")
    subject = DataFoodConsortium::ConnectorV1::RealStock.new(
      "https://myplatform.com/cc",
      physicalProduct: physicalProduct,
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:RealStock",
      "dfc-b:constitutes" => "https://myplatform.com/physicalProduct",
    )
  end
end
