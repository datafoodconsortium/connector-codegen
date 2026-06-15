RSpec.describe DataFoodConsortium::ConnectorV1::Order do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::Order.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:Order",
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::Order.new(
      "https://myplatform.com/cc",
      number: "number",
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:Order",
      "dfc-b:orderNumber" => "number",
    )
  end
end
