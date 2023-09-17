require 'connector'
require "minitest/autorun"
require 'datafoodconsortium/connector'

class OfferTest < Minitest::Test

  def test_export_empty
    o = DataFoodConsortium::Connector::Offer.new("https://myplatform.com/o")
    actual = connector.export(o)
    expected = '{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"https://myplatform.com/o","@type":"dfc-b:Offer","dfc-b:stockLimitation":0.0}'
    assert_equal expected, actual
  end

  def test_export_complete
    ci = DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci")
    cc = DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc")
    o = DataFoodConsortium::Connector::Offer.new(
        "https://myplatform.com/o",
        price: DataFoodConsortium::Connector::Price.new(
            value: 12.78,
            vatRate: 5.22,
            unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
        ),
        stockLimitation: 52, 
        offeredItem: ci, 
        offeredTo: cc
    )
    actual = connector.export(o)
    expected = '{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"https://myplatform.com/o","@type":"dfc-b:Offer","dfc-b:price":{"@type":"dfc-b:Price","dfc-b:value":12.78,"dfc-b:VATrate":5.22,"dfc-b:hasUnit":"dfc-m:Euro"},"dfc-b:stockLimitation":52,"dfc-b:offeredItem":"https://myplatform.com/ci","dfc-b:offeredTo":"https://myplatform.com/cc"}'
    assert_equal expected, actual
  end

end