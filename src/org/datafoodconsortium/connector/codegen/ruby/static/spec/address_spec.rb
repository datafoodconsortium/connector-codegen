RSpec.describe DataFoodConsortium::ConnectorV1::Address do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::Address.new(
      "https://myplatform.com/a"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/a",
        "@type" => "dfc-b:Address",
      }
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::Address.new(
      "https://myplatform.com/a",
      street: "street",
      postalCode: "postalCode",
      city: "city",
      country: "country"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/a",
        "@type" => "dfc-b:Address",
        "dfc-b:hasCity" => "city",
        "dfc-b:hasCountry" => "country",
        "dfc-b:hasPostalCode" => "postalCode",
        "dfc-b:hasStreet" => "street",
      }
    )
  end
end
