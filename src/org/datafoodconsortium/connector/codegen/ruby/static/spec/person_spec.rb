RSpec.describe DataFoodConsortium::Connector::Person do
  it "can be empty when exported" do
    p = DataFoodConsortium::Connector::Person.new("https://myplatform.com/p")
    actual = exported_json(p)
    expected = {
      "@context" => "https://www.datafoodconsortium.org",
      "@id" => "https://myplatform.com/p",
      "@type" => "dfc-b:Person",
      "dfc-b:familyName" => "",
      "dfc-b:firstName" => "",
      "dfc-b:logo" => "",
    }
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
    actual = exported_json(p)
    expected = {
      "@context" => "https://www.datafoodconsortium.org",
      "@id" => "https://myplatform.com/p",
      "@type" => "dfc-b:Person",
      "dfc-b:affiliates" => "https://myplatform.com/e",
      "dfc-b:familyName" => "lastName",
      "dfc-b:firstName" => "firstName",
      "dfc-b:hasAddress" => "https://myplatform.com/a",
      "dfc-b:logo" => "",
    }
    expect(actual).to eq expected
  end
end
