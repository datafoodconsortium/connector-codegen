describe DataFoodConsortium::Connector::Person do
  it "can be empty when exported" do
    p = DataFoodConsortium::Connector::Person.new("https://myplatform.com/p")
    actual = connector.export(p)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/p","@type":"dfc-b:Person","dfc-b:firstName":"","dfc-b:familyName":""}'
    expect(actual).to eq expected
  end

  it "contains all fields when exported" do
    p = DataFoodConsortium::Connector::Person.new(
      "https://myplatform.com/p",
      firstName: "firstName", 
      lastName: "lastName", 
      affiliatedOrganizations: [
        DataFoodConsortium::Connector::Enterprise.new("https://myplatform.com/e")
      ], 
      localizations: [
        DataFoodConsortium::Connector::Address.new("https://myplatform.com/a")
      ]
    )
    actual = connector.export(p)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/p","@type":"dfc-b:Person","dfc-b:hasAddress":"https://myplatform.com/a","dfc-b:firstName":"firstName","dfc-b:familyName":"lastName","dfc-b:affiliates":"https://myplatform.com/e"}'
    expect(actual).to eq expected
  end
end
