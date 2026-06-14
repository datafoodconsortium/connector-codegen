RSpec.describe DataFoodConsortium::Connector::Organization do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::Organization.new(
      "https://myplatform.com/e"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/e",
        "@type" => "dfc-b:Organization",
      }
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::Connector::Organization.new(
      "https://myplatform.com/e",
      name: "name",
      description: "description",
      vatNumber: "vatNumber",
      customerCategories: [
        DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc")
      ],
      suppliedProducts: [
        DataFoodConsortium::Connector::SuppliedProduct.new("https://myplatform.com/sp")
      ],
      catalogItems: [
        DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci")
      ],
      localizations: []
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/e",
        "@type" => "dfc-b:Organization",
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
    subject = DataFoodConsortium::Connector::Organization.new(
      "https://myplatform.com/e",
      name: "name",
      description: "description",
      vatNumber: "vatNumber",
      customerCategories: [
        DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc"),
        DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc2")
      ],
      suppliedProducts: [
        DataFoodConsortium::Connector::SuppliedProduct.new("https://myplatform.com/sp"),
        DataFoodConsortium::Connector::SuppliedProduct.new("https://myplatform.com/sp2")
      ],
      catalogItems: [
        DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci"),
        DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci2")
      ],
      localizations: []
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/e",
        "@type" => "dfc-b:Organization",
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
