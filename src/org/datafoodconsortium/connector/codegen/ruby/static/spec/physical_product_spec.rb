RSpec.describe DataFoodConsortium::ConnectorV1::PhysicalProduct do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::PhysicalProduct.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:PhysicalProduct",
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::PhysicalProduct.new(
      "https://myplatform.com/cc",
      name: "name",
      description: "description",
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:PhysicalProduct",
      "dfc-b:name" => "name",
      "dfc-b:description" => "description",
    )
  end
end
