RSpec.describe DataFoodConsortium::ConnectorV1::SocialMedia do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::SocialMedia.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:SocialMedia",
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::SocialMedia.new(
      "https://myplatform.com/cc",
      name: "name",
      url: "url",
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:SocialMedia",
      "dfc-b:name" => "name",
      "dfc-b:URL" => "url",
    )
  end
end
