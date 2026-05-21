RSpec.describe DataFoodConsortium::ConnectorV1::Offer do
  it "has a type" do
    expect(described_class::SEMANTIC_TYPE).to eq "dfc-b:Offer"
  end

  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::Offer.new(
      "https://myplatform.com/o"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/o",
      "@type" => "dfc-b:Offer",
    )
  end

  it "contains all fields when exported" do
    ci = DataFoodConsortium::ConnectorV1::CatalogItem.new("https://myplatform.com/ci")
    cc = DataFoodConsortium::ConnectorV1::CustomerCategory.new("https://myplatform.com/cc")
    subject = DataFoodConsortium::ConnectorV1::Offer.new(
      "https://myplatform.com/o",
      price: DataFoodConsortium::ConnectorV1::Price.new(
        value: 12.78,
        vatRate: 5.22,
        unit: connector.MEASURES.EURO
      ),
      stockLimitation: 52,
      offeredItem: ci,
      offeredTo: cc
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/o",
      "@type" => "dfc-b:Offer",
      "dfc-b:hasPrice" => {
        "@type" => "dfc-b:Price",
        "dfc-b:value" => 12.78,
        "dfc-b:VATrate" => 5.22,
        "dfc-b:hasUnit" => "dfc-m:Euro"
      },
      "dfc-b:stockLimitation" => 52,
      "dfc-b:offeredItem" => "https://myplatform.com/ci",
      "dfc-b:offeredTo" => "https://myplatform.com/cc",
    )
  end
end
