RSpec.describe DataFoodConsortium::Connector::Catalog do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::Catalog.new(
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
    catalogItem = DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/catalogItem")
    organization = DataFoodConsortium::Connector::Organization.new("https://myplatform.com/organization")
    subject = DataFoodConsortium::Connector::Catalog.new(
      "https://myplatform.com/catalog",
      items: [catalogItem],
      maintainers: [organization],
      beginDate: "beginDate",
      endDate: "endDate",
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/catalog",
        "@type" => "dfc-b:Catalog",
        "dfc-b:lists" => "https://myplatform.com/catalogItem",
        "dfc-b:maintainedBy" => "https://myplatform.com/organization",
        "dfc-b:beginDate" => "beginDate",
        "dfc-b:endDate" => "endDate",
      }
    )
  end
end
