# MIT License
# 
# Copyright (c) 2023 Maxime Lecoq <maxime@lecoqlibre.fr>
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

require 'singleton'
require 'datafoodconsortium/connector/json_ld_serializer'

class DataFoodConsortium::Connector::Connector

    include Singleton

    attr_accessor :context

    attr_reader :FACETS
    attr_reader :MEASURES
    attr_reader :PRODUCT_TYPES

    def export(subject, *subjects)
        return @exporter.process(subject, *subjects)
    end

    def loadFacets(data)
        @FACETS = loadThesaurus(data)
    end

    def loadMeasures(data)
        @MEASURES = loadThesaurus(data)
    end

    def loadProductTypes(data)
        @PRODUCT_TYPES = loadThesaurus(data)
    end

    private

    def initialize()
        super()

        # used to prefix properties
        # so the DFC's context can be used.
        # See https://github.com/datafoodconsortium/connector-ruby/issues/11.
        inputContext = {
            "dfc-b" => "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#",
            "dfc-p" => "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_ProductGlossary.owl#",
            "dfc-t" => "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_TechnicalOntology.owl#",
            "dfc-m" => "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/measures.rdf#",
		    "dfc-pt" => "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/productTypes.rdf#",
		    "dfc-f" => "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/facets.rdf#"
        }

        @context = "https://www.datafoodconsortium.org"

        @exporter = DataFoodConsortium::Connector::JsonLdSerializer.new(@context, inputContext)
        @parser = DataFoodConsortium::Connector::SKOSParser.new

        @FACETS = []
        @MEASURES = []
        @PRODUCT_TYPES = []
    end
    
    def loadThesaurus(data)
        return @parser.parse(data[0]["@graph"])
    end
    
end
