RSpec.describe DataFoodConsortium::ConnectorV1::PhoneNumber do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::PhoneNumber.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:PhoneNumber",
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::PhoneNumber.new(
      "https://myplatform.com/cc",
      phoneNumber: "phoneNumber",
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:PhoneNumber",
      "dfc-b:phoneNumber" => "phoneNumber",
    )
  end
end
