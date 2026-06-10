# frozen_string_literal: true

require 'json/ld'

module DataFoodConsortium
  module ConnectorV1
    # Preload the DFC context.
    #
    # Similar to: https://github.com/ruby-rdf/json-ld-preloaded/
    class Context < JSON::LD::Context
      URL = "https://w3id.org/dfc/ontology/context/context_1.16.0.json"
      URL_NORMALISED = "http://w3id.org/dfc/ontology/context/context_1.16.0.json"

      # All context URIs have to use http because https is normalised to http
      # during the lookup of preloaded contexts.
      # And if the URI doesn't have a path, it must end with `/`.
      add_preloaded(URL_NORMALISED) { parse(json) }

      # The default context always pointing to the latest version:
      alias_preloaded("http://www.datafoodconsortium.org/", URL_NORMALISED)

      # This is the current file the DFC website refers to in a link header.
      alias_preloaded(
        "http://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld",
        URL_NORMALISED
      )

      # This was the file the DFC website refers to in a link header.
      alias_preloaded(
        "http://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context.jsonld",
        URL_NORMALISED
      )

      # This is the old URL that's not online anymore.
      # Keep it for compatiblity with all versions before 1.8.
      alias_preloaded(
        "http://static.datafoodconsortium.org/ontologies/context.json",
        URL_NORMALISED
      )

      # The hash serializer expects only string values in the context.
      def self.inputContext
        @inputContext = json.select { |key, value| value.is_a? String }
      end

      def self.json
        @json ||= JSON.parse(File.read("#{__dir__}/context_1.16.0.json"))["@context"]
      end
    end
  end
end
