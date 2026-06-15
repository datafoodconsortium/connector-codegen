RSpec.describe DataFoodConsortium::ConnectorV1::TheoreticalStock do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::TheoreticalStock.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:TheoreticalStock",
    )
  end

  it "contains all fields when exported" do
    localizedProduct = DataFoodConsortium::ConnectorV1::LocalizedProduct.new("https://myplatform.com/localizedProduct")
    subject = DataFoodConsortium::ConnectorV1::TheoreticalStock.new(
      "https://myplatform.com/cc",
      localizedProduct: localizedProduct,
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:TheoreticalStock",
      "dfc-b:constitutes" => "https://myplatform.com/localizedProduct",
    )
  end
end
