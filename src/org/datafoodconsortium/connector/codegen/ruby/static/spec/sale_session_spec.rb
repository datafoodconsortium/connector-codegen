RSpec.describe DataFoodConsortium::ConnectorV1::SaleSession do
  it "can be empty when exported" do
    subject = DataFoodConsortium::ConnectorV1::SaleSession.new(
      "https://myplatform.com/cc"
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:SaleSession",
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::ConnectorV1::SaleSession.new(
      "https://myplatform.com/cc",
      beginDate: "beginDate",
      endDate: "endDate",
    )
    result = exported_json(subject)
    expect(result).to include(
      "@id" => "https://myplatform.com/cc",
      "@type" => "dfc-b:SaleSession",
      "dfc-b:beginDate" => "beginDate",
      "dfc-b:endDate" => "endDate",
    )
  end
end
