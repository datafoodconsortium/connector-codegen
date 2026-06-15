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
      latitude: 1.234,
	    longitude: 2.345,
      country: "country",
	    region: "region",
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/a",
        "@type" => "dfc-b:Address",
        "dfc-b:hasStreet" => "street",
        "dfc-b:hasPostalCode" => "postalCode",
        "dfc-b:hasCity" => "city",
        "dfc-b:latitude" => 1.234,
        "dfc-b:longitude" => 2.345,
        "dfc-b:hasCountry" => "country",
        "dfc-b:region" => "region",
      }
    )
  end
end
