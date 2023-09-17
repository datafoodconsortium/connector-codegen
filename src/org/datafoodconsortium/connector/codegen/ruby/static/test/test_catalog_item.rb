require 'connector'
require "minitest/autorun"
require 'datafoodconsortium/connector'

class CatalogItemTest < Minitest::Test

  def test_export_empty
    ci = DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci")
    actual = connector.export(ci)
    expected = '{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"https://myplatform.com/ci","@type":"dfc-b:CatalogItem","dfc-b:sku":"","dfc-b:stockLimitation":0.0}'
    assert_equal expected, actual
  end

  def test_export_complete
    sp = DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/sp")
    offer = DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/o")
    ci = DataFoodConsortium::Connector::CatalogItem.new(
        "https://myplatform.com/ci",
        product: sp, 
        sku: "sku", 
        stockLimitation: 10, 
        offers: [offer]
    )
    actual = connector.export(ci)
    expected = '{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"https://myplatform.com/ci","@type":"dfc-b:CatalogItem","dfc-b:references":"https://myplatform.com/sp","dfc-b:sku":"sku","dfc-b:stockLimitation":10,"dfc-b:offeredThrough":"https://myplatform.com/o"}'
    assert_equal expected, actual
  end

end