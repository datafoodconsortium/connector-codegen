RSpec.describe DataFoodConsortium::ConnectorV1::Catalog do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::Catalog.new(
      "https://myplatform.com/c"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/c",
        "@type" => "dfc-b:Catalog",
      }
    )
  end

  it "contains all fields when exported" do
    catalogItem = DataFoodConsortium::ConnectorV1::CatalogItem.new("https://myplatform.com/catalogItem")
    organization = DataFoodConsortium::ConnectorV1::Enterprise.new("https://myplatform.com/organization")
    subject = DataFoodConsortium::ConnectorV1::Catalog.new(
      "https://myplatform.com/catalog",
      items: [catalogItem],
      maintainers: [organization],
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/catalog",
        "@type" => "dfc-b:Catalog",
        "dfc-b:lists" => "https://myplatform.com/catalogItem",
        "dfc-b:maintainedBy" => "https://myplatform.com/organization",
      }
    )
  end
end
