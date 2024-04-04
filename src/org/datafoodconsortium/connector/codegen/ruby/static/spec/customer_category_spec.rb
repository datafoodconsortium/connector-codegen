RSpec.describe DataFoodConsortium::Connector::CustomerCategory do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::CustomerCategory.new(
      "https://myplatform.com/cc"
    )
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/cc","@type":"dfc-b:CustomerCategory"}'
    )
  end

  it "contains all fields when exported" do
    subject = DataFoodConsortium::Connector::CustomerCategory.new(
        "https://myplatform.com/cc",
        description: "description"
    )
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/cc","@type":"dfc-b:CustomerCategory","dfc-b:description":"description"}'
    )
  end
end
