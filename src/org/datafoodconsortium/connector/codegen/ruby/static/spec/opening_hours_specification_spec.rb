RSpec.describe DataFoodConsortium::ConnectorV1::OpeningHoursSpecification do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::OpeningHoursSpecification.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "https://schema.org/OpeningHoursSpecification",
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::OpeningHoursSpecification.new(
      "https://myplatform.com/cc",
      dayOfWeek: "dayOfWeek",
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "https://schema.org/OpeningHoursSpecification",
      "https://schema.org/dayOfWeek" => "dayOfWeek",
    )
  end
end
