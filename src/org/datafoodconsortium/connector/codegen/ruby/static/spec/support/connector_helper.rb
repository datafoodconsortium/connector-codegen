require 'datafoodconsortium/connector'

module ConnectorHelper
  def connector
    @connector ||= DataFoodConsortium::Connector::Connector.instance.tap do |c|
      c.loadMeasures(parse_json_file("measures.json"))
      c.loadFacets(parse_json_file("facets.json"))
      c.loadProductTypes(parse_json_file("productTypes.json"))
    end
  end

  def parse_json_file(name)
    JSON.parse(
      File.read(
        File.join(__dir__, name)
      )
    )
  end
end
