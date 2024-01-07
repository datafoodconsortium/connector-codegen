describe DataFoodConsortium::Connector::Offer do
  it "has a type" do
    expect(described_class::SEMANTIC_TYPE).to eq "dfc-b:Offer"
  end

  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::Offer.new(
      "https://myplatform.com/o"
    )
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/o","@type":"dfc-b:Offer","dfc-b:stockLimitation":0.0}'
    )
  end

  it "contains all fields when exported" do
    ci = DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci")
    cc = DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc")
    subject = DataFoodConsortium::Connector::Offer.new(
        "https://myplatform.com/o",
        price: DataFoodConsortium::Connector::Price.new(
            value: 12.78,
            vatRate: 5.22,
            unit: connector.MEASURES.EURO
        ),
        stockLimitation: 52, 
        offeredItem: ci, 
        offeredTo: cc
    )
    result = connector.export(subject)
    expect(result).to eq(
      '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/o","@type":"dfc-b:Offer","dfc-b:hasPrice":{"@type":"dfc-b:Price","dfc-b:value":12.78,"dfc-b:VATrate":5.22,"dfc-b:hasUnit":"dfc-m:Euro"},"dfc-b:stockLimitation":52,"dfc-b:offeredItem":"https://myplatform.com/ci","dfc-b:offeredTo":"https://myplatform.com/cc"}'
    )
  end
end
