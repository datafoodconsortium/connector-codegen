RSpec.describe DataFoodConsortium::Connector::Address do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::Address.new(
      "https://myplatform.com/a"
    )
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/a","@type":"dfc-b:Address"}'
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::Connector::Address.new(
        "https://myplatform.com/a",
        street: "street",
        postalCode: "postalCode",
        city: "city",
        country: "country"
    )
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/a","@type":"dfc-b:Address","dfc-b:hasStreet":"street","dfc-b:hasPostalCode":"postalCode","dfc-b:hasCity":"city","dfc-b:hasCountry":"country"}'
    )
  end
end
