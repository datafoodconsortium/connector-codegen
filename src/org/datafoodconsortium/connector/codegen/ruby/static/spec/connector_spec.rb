RSpec.describe DataFoodConsortium::Connector::Connector do
  let(:product) do
    DataFoodConsortium::Connector::SuppliedProduct.new(
      "https://example.net/tomato",
      name: "Tomato",
      description: "Awesome tomato",
      alcoholPercentage: 0.4,
      totalTheoreticalStock: 3,
    )
  end

  it "exports" do
    json = connector.export(product)
    expect(json).to match '"dfc-b:name":"Tomato"'
  end

  it "imports" do
    json = connector.export(product)
    result = connector.import(json)

    expect(result).to be_a product.class
    expect(result.semanticType).to eq product.semanticType
    expect(result.semanticId).to eq "https://example.net/tomato"
    expect(result.name).to eq "Tomato"

    expect(connector.export(result)).to eq json
  end

  it "imports from IO like Rails supplies it" do
    json = connector.export(product)
    io = StringIO.new(json)
    result = connector.import(io)

    expect(result).to be_a product.class
    expect(result.semanticType).to eq product.semanticType
    expect(result.semanticId).to eq "https://example.net/tomato"
    expect(result.name).to eq "Tomato"
  end
end
