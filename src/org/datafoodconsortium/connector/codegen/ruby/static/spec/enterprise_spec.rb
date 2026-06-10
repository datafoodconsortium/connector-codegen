RSpec.describe DataFoodConsortium::ConnectorV1::Enterprise do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::Enterprise.new(
      "https://myplatform.com/e"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/e",
        "@type" => "dfc-b:Enterprise",
      }
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::Enterprise.new(
      "https://myplatform.com/e",
      name: "name",
      description: "description",
      vatNumber: "vatNumber",
      customerCategories: [
        DataFoodConsortium::ConnectorV1::CustomerCategory.new("https://myplatform.com/cc")
      ],
      suppliedProducts: [
        DataFoodConsortium::ConnectorV1::SuppliedProduct.new("https://myplatform.com/sp")
      ],
      catalogItems: [
        DataFoodConsortium::ConnectorV1::CatalogItem.new("https://myplatform.com/ci")
      ],
      localizations: []
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/e",
        "@type" => "dfc-b:Enterprise",
        "dfc-b:VATnumber" => "vatNumber",
        "dfc-b:defines" => "https://myplatform.com/cc",
        "dfc-b:hasDescription" => "description",
        "dfc-b:manages" => "https://myplatform.com/ci",
        "dfc-b:name" => "name",
        "dfc-b:supplies" => "https://myplatform.com/sp",
      }
    )
  end

  it "contains collections as arrays when exported" do
    subject = DataFoodConsortium::ConnectorV1::Enterprise.new(
      "https://myplatform.com/e",
      name: "name",
      description: "description",
      vatNumber: "vatNumber",
      customerCategories: [
        DataFoodConsortium::ConnectorV1::CustomerCategory.new("https://myplatform.com/cc"),
        DataFoodConsortium::ConnectorV1::CustomerCategory.new("https://myplatform.com/cc2")
      ],
      suppliedProducts: [
        DataFoodConsortium::ConnectorV1::SuppliedProduct.new("https://myplatform.com/sp"),
        DataFoodConsortium::ConnectorV1::SuppliedProduct.new("https://myplatform.com/sp2")
      ],
      catalogItems: [
        DataFoodConsortium::ConnectorV1::CatalogItem.new("https://myplatform.com/ci"),
        DataFoodConsortium::ConnectorV1::CatalogItem.new("https://myplatform.com/ci2")
      ],
      localizations: []
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/e",
        "@type" => "dfc-b:Enterprise",
        "dfc-b:VATnumber" => "vatNumber",
        "dfc-b:defines" => ["https://myplatform.com/cc", "https://myplatform.com/cc2"],
        "dfc-b:hasDescription" => "description",
        "dfc-b:manages" => ["https://myplatform.com/ci", "https://myplatform.com/ci2"],
        "dfc-b:name" => "name",
        "dfc-b:supplies" => ["https://myplatform.com/sp", "https://myplatform.com/sp2"],
      }
    )
  end
end
