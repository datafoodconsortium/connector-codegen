require 'connector'
require "minitest/autorun"
require 'datafoodconsortium/connector'

class CustomerCategoryTest < Minitest::Test

  def test_export_empty
    cc = DataFoodConsortium::Connector::CustomerCategory.new("https://myplatform.com/cc")
    actual = connector.export(cc)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/cc","@type":"dfc-b:CustomerCategory","dfc-b:description":""}'
    assert_equal expected, actual
  end

  def test_export_complete
    cc = DataFoodConsortium::Connector::CustomerCategory.new(
        "https://myplatform.com/cc",
        description: "description"
    )
    actual = connector.export(cc)
    expected = '{"@context":"https://www.datafoodconsortium.org","@id":"https://myplatform.com/cc","@type":"dfc-b:CustomerCategory","dfc-b:description":"description"}'
    assert_equal expected, actual
  end

end