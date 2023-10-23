require 'connector'
require "minitest/autorun"
require 'datafoodconsortium/connector'

class EnterpriseTest < Minitest::Test

  def test_export_empty
    e = DataFoodConsortium::Connector::Enterprise.new("https://myplatform.com/e")
    actual = connector.export(e)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/e","@type":"dfc-b:Enterprise","dfc-b:name":"","dfc-b:hasDescription":"","dfc-b:VATnumber":""}'
    assert_equal expected, actual
  end

  def test_export_complete
    e = DataFoodConsortium::Connector::Enterprise.new(
        "https://myplatform.com/e",
        name: "name", 
        description: "description", 
        vatNumber: "vatNumber", 
        customerCategories: [
            DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc")
        ], 
        suppliedProducts: [
            DataFoodConsortium::Connector::SuppliedProduct.new("https://myplatform.com/sp")
        ], 
        catalogItems: [
            DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci")
        ], 
        localizations: []
    )
    actual = connector.export(e)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/e","@type":"dfc-b:Enterprise","dfc-b:name":"name","dfc-b:hasDescription":"description","dfc-b:VATnumber":"vatNumber","dfc-b:defines":"https://myplatform.com/cc","dfc-b:manages":"https://myplatform.com/ci,"dfc-b:supplies":"https://myplatform.com/sp"}'
    assert_equal expected, actual
  end

  def test_export_complete_multiple
    e = DataFoodConsortium::Connector::Enterprise.new(
        "https://myplatform.com/e",
        name: "name", 
        description: "description", 
        vatNumber: "vatNumber", 
        customerCategories: [
            DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc"),
            DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc2")
        ], 
        suppliedProducts: [
            DataFoodConsortium::Connector::SuppliedProduct.new("https://myplatform.com/sp"),
            DataFoodConsortium::Connector::SuppliedProduct.new("https://myplatform.com/sp2")
        ], 
        catalogItems: [
            DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci"),
            DataFoodConsortium::Connector::CatalogItem.new("https://myplatform.com/ci2")
        ], 
        localizations: []
    )
    actual = connector.export(e)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/e","@type":"dfc-b:Enterprise","dfc-b:name":"name","dfc-b:hasDescription":"description","dfc-b:VATnumber":"vatNumber","dfc-b:defines":["https://myplatform.com/cc","https://myplatform.com/cc2"],"dfc-b:supplies":["https://myplatform.com/sp","https://myplatform.com/sp2"],"dfc-b:manages":["https://myplatform.com/ci","https://myplatform.com/ci2"]}'
    assert_equal expected, actual
  end

end