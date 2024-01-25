# frozen_string_literal: true

require_relative "skos_parser"

module DataFoodConsortium
  module Connector
    class Importer
      def self.type_map
        unless @type_map
          @type_map = {}
          DataFoodConsortium::Connector.semantic_types.each do |type|
            register_type(type)
          end
        end

        @type_map
      end

      def self.register_type(clazz)
        type_map[clazz::SEMANTIC_TYPE] = clazz
      end

      def self.prefixed_name(uri)
        RDF::URI.new(uri).pname(prefixes: Context::VERSION_1_8)
      end

      def import(json_string_or_io)
        @subjects = {}

        graph = parse_rdf(json_string_or_io)
        build_subjects(graph)
        apply_statements(graph)

        if @subjects.size > 1
          @subjects.values
        else
          @subjects.values.first
        end
      end

      private

      # The `io` parameter can be a String or an IO instance.
      def parse_rdf(io)
        io = StringIO.new(io) if io.is_a?(String)
        RDF::Graph.new << JSON::LD::API.toRdf(io)
      end

      def build_subjects(graph)
        graph.query({ predicate: RDF.type }).each do |statement|
          @subjects[statement.subject] = build_subject(statement)
        end
      end

      def build_subject(type_statement)
        # Not all subjects have an id, some are anonymous.
        id = if type_statement.subject.respond_to?(:value)
               type_statement.subject.value
             end
        type = type_statement.object.value
        key = self.class.prefixed_name(type)
        clazz = self.class.type_map[key]

        clazz.new(*[id].compact)
      end

      def apply_statements(statements)
        statements.each do |statement|
          apply_statement(statement)
        end
      end

      def apply_statement(statement)
        subject = subject_of(statement)
        property_uri = statement.predicate.value
        value = resolve_object(statement.object)

        property_id = self.class.prefixed_name(property_uri)

        return unless subject.hasSemanticProperty?(property_id)

        property = subject.semanticProperty(property_id)

        if property.value.is_a?(Enumerable)
          property.value << value
        else
          property.value = value
        end
      end

      def subject_of(statement)
        @subjects[statement.subject]
      end

      def resolve_object(object)
        @subjects[object] || skos_concept(object) || object.object
      end

      def skos_concept(object)
        return unless object.uri?

        id = object.value.sub(
          "http://static.datafoodconsortium.org/data/measures.rdf#", "dfc-m:"
        ).sub(
          "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/measures.rdf#",
          "dfc-m:"
        )
        SKOSParser.concepts[id]
      end
    end
  end
end
