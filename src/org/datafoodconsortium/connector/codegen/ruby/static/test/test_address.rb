require 'connector'
require "minitest/autorun"
require 'datafoodconsortium/connector'

class AddressTest < Minitest::Test

  def test_export_empty
    a = DataFoodConsortium::Connector::Address.new("https://myplatform.com/a")
    actual = connector.export(a)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/a","@type":"dfc-b:Address","dfc-b:hasStreet":"","dfc-b:hasPostalCode":"","dfc-b:hasCity":"","dfc-b:hasCountry":""}'
    assert_equal expected, actual
  end

  def test_export_complete
    a = DataFoodConsortium::Connector::Address.new(
        "https://myplatform.com/a",
        street: "street", 
        postalCode: "postalCode", 
        city: "city", 
        country: "country"
    )
    actual = connector.export(a)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/a","@type":"dfc-b:Address","dfc-b:hasStreet":"street","dfc-b:hasPostalCode":"postalCode","dfc-b:hasCity":"city","dfc-b:hasCountry":"country"}'
    assert_equal expected, actual
  end

end