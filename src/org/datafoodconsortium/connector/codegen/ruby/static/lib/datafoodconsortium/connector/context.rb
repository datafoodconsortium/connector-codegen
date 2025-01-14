# frozen_string_literal: true

require 'json/ld'

# Preload the DFC context.
#
# Similar to: https://github.com/ruby-rdf/json-ld-preloaded/
module DataFoodConsortium
  module Connector
    class Context < JSON::LD::Context
      VERSION_1_8 = JSON.parse(File.read("#{__dir__}/context_1.8.2.json"))["@context"]

      add_preloaded("http://www.datafoodconsortium.org/") { parse(VERSION_1_8) }

      # This is the actual file the DFC website refers to in a link header.
      alias_preloaded(
        "https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context.jsonld",
        "http://www.datafoodconsortium.org/"
      )

      # This is the old URL that's not online anymore.
      # Keep it for compatiblity with all versions before 1.8.
      alias_preloaded(
        "http://static.datafoodconsortium.org/ontologies/context.json",
        "http://www.datafoodconsortium.org/"
      )

      # The hash serializer expects only string values in the context.
      def self.inputContext
        @inputContext = VERSION_1_8.select { |key, value| value.is_a? String }
      end
    end
  end
end
