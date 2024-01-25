# frozen_string_literal: true

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

require 'datafoodconsortium/connector/skos_helper'
require 'datafoodconsortium/connector/skos_concept'
require 'datafoodconsortium/connector/skos_parser_element'

class DataFoodConsortium::Connector::SKOSInstance
  include DataFoodConsortium::Connector::SKOSHelper

  # Return a list of singelton methods, ie the list of Concept available
  def topConcepts
    self.methods(false).sort
  end
end

class DataFoodConsortium::Connector::SKOSParser
  CONCEPT_SCHEMES = ["Facet", "productTypes"].freeze

  def self.concepts
    @concepts ||= {}
  end

  def initialize
    @results = DataFoodConsortium::Connector::SKOSInstance.new
    @skosConcepts = {}
    @rootElements = []
    @broaders = {}
    # Flag used to tell the parser to use SkosConcept object when parsing data from Concept Scheme
    # defined in CONCEPT_SCHEMES
    @useSkosConcept = false
  end

  def parse(data)
    init

    data.each do |element|
      current = DataFoodConsortium::Connector::SKOSParserElement.new(element)

      setSkosConceptFlag(current)

      if current.isConcept? || current.isCollection?
        if !@skosConcepts.has_key?(current.id)
          concept = createSKOSConcept(current)
          @skosConcepts[current.id] = concept
        end

        if current.hasBroader
          current.broader.each do |broaderId|
            if !@broaders.has_key?(broaderId)
              @broaders[broaderId] = []
            end

            @broaders[broaderId].push(current.id)
          end
        # No broader, save the concept to the root
        else
          @rootElements.push(current.id)
        end
      end
    end

    @rootElements.each do |rootElementId|
      setResults(@results, rootElementId)
    end

    @results
  end

  protected

  def createSKOSConcept(element)
    skosConcept = DataFoodConsortium::Connector::SKOSConcept.new(
      element.id, broaders: element.broader, narrowers: element.narrower, prefLabels: element.label
    )
    skosConcept.semanticType = element.type

    self.class.concepts[element.id] = skosConcept

    skosConcept
  end

  def getValueWithoutPrefix(property)
    name = 'undefined'

    if !property.include?('http') && property.include?(':')
      name = property.split(':')[1]
    elsif property.include?('#')
      name = property.split('#')[1]
    end

    name = name.gsub('-', '_')

    # workaround to fix concepts starting with a number
    # see https://github.com/datafoodconsortium/connector-ruby/issues/3
    # see https://github.com/datafoodconsortium/ontology/issues/66
    name = "_" + name if name.match?("^[0-9]")

    name.upcase
  end

  private

  def init
    @results = DataFoodConsortium::Connector::SKOSInstance.new
    @skosConcepts = {}
    @rootElements = []
    @broaders = {}
    @useSkosConcept = false
  end

  def setResults(parent, id)
    name = getValueWithoutPrefix(id)

    if !parent.hasAttribute(name)
      if @useSkosConcept && @skosConcepts[id]
        parent.addAttribute(name, @skosConcepts[id])
      else
        parent.addAttribute(name, DataFoodConsortium::Connector::SKOSInstance.new)
      end
    end

    # Leaf concepts, stop the process
    if !@broaders.has_key?(id)
      parent.instance_variable_set("@#{name}", @skosConcepts[id])
      return
    end

    @broaders[id].each do |narrower|
      parentSkosInstance = parent.instance_variable_get("@#{name}")

      setResults(parentSkosInstance, narrower) # recursive call
    end
  end

  def setSkosConceptFlag(current)
    @useSkosConcept = true if current.isConceptScheme? && matchingConceptSchemes(current)
  end

  def matchingConceptSchemes(current)
    regex = /#{CONCEPT_SCHEMES.join("|")}/

    current.id =~ regex
  end
end
