RSpec.describe DataFoodConsortium::ConnectorV1::DeliveryOption do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::DeliveryOption.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:DeliveryOption",
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::DeliveryOption.new(
      "https://myplatform.com/cc",
      name: "name",
      description: "description",
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:DeliveryOption",
      "dfc-b:name" => "name",
      "dfc-b:description" => "description",
    )
  end
end
