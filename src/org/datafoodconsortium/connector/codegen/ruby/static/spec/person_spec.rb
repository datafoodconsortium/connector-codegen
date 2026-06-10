RSpec.describe DataFoodConsortium::ConnectorV1::Person do
  it "can be empty when exported" do
    p = DataFoodConsortium::ConnectorV1::Person.new("https://myplatform.com/p")
    actual = exported_json(p)
    expected = {
      "@id" => "https://myplatform.com/p",
      "@type" => "dfc-b:Person",
    }
    expect(actual).to include expected
  end

  it "contains all fields when exported" do
    p = DataFoodConsortium::ConnectorV1::Person.new(
      "https://myplatform.com/p",
      firstName: "firstName",
      lastName: "lastName",
      affiliatedOrganizations: [
        DataFoodConsortium::ConnectorV1::Enterprise.new("https://myplatform.com/e")
      ],
      localizations: [
        DataFoodConsortium::ConnectorV1::Address.new("https://myplatform.com/a")
      ]
    )
    actual = exported_json(p)
    expected = {
      "@id" => "https://myplatform.com/p",
      "@type" => "dfc-b:Person",
      "dfc-b:affiliates" => "https://myplatform.com/e",
      "dfc-b:familyName" => "lastName",
      "dfc-b:firstName" => "firstName",
      "dfc-b:hasAddress" => "https://myplatform.com/a",
    }
    expect(actual).to include expected
  end
end
