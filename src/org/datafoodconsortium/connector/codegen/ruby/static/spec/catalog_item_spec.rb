RSpec.describe DataFoodConsortium::Connector::CatalogItem do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::CatalogItem.new(
      "https://myplatform.com/ci"
    )
    result = exported_json(subject)
    expect(result).to eq(
      {
        "@context" => "https://www.datafoodconsortium.org",
        "@id" => "https://myplatform.com/ci",
        "@type" => "dfc-b:CatalogItem",
      }
    )
  end

  it "contains all fields when exported" do
    sp = DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/sp")
    offer = DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/o")
    subject = DataFoodConsortium::Connector::CatalogItem.new(
      "https://myplatform.com/ci",
      product: sp,
      sku: "sku",
      stockLimitation: 10,
      offers: [offer]
    )
    result = exported_json(subject)
    expect(result).to eq(
      {
        "@context" => "https://www.datafoodconsortium.org",
        "@id" => "https://myplatform.com/ci",
        "@type" => "dfc-b:CatalogItem",
        "dfc-b:offeredThrough" => "https://myplatform.com/o",
        "dfc-b:references" => "https://myplatform.com/sp",
        "dfc-b:sku" => "sku",
        "dfc-b:stockLimitation" => 10,
      }
    )
  end
end
