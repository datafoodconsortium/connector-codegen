describe DataFoodConsortium::Connector::Enterprise do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::Enterprise.new(
      "https://myplatform.com/e"
    )
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/e","@type":"dfc-b:Enterprise","dfc-b:name":"","dfc-b:hasDescription":"","dfc-b:VATnumber":""}'
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::Connector::Enterprise.new(
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
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/e","@type":"dfc-b:Enterprise","dfc-b:name":"name","dfc-b:hasDescription":"description","dfc-b:VATnumber":"vatNumber","dfc-b:defines":"https://myplatform.com/cc","dfc-b:manages":"https://myplatform.com/ci","dfc-b:supplies":"https://myplatform.com/sp"}'
    )
  end

  it "contains collections as arrays when exported" do
    subject = DataFoodConsortium::Connector::Enterprise.new(
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
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/e","@type":"dfc-b:Enterprise","dfc-b:name":"name","dfc-b:hasDescription":"description","dfc-b:VATnumber":"vatNumber","dfc-b:defines":["https://myplatform.com/cc","https://myplatform.com/cc2"],"dfc-b:manages":["https://myplatform.com/ci","https://myplatform.com/ci2"],"dfc-b:supplies":["https://myplatform.com/sp","https://myplatform.com/sp2"]}'
    )
  end
end
