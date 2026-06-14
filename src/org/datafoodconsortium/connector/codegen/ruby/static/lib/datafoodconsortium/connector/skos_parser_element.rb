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

class DataFoodConsortium::Connector::SKOSParserElement

  attr_reader :id
  attr_reader :type
  attr_reader :broader
  attr_reader :narrower
  attr_reader :label

  def initialize(element)
    @broader = []
    @narrower = []
    @label = {}

    if element
      @id = element["@id"]

      if element["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"]
        @type = extractId(element["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"])
      elsif element["@type"]
        @type = extractId(element["@type"])
      else
        @type = "undefined"
      end

      if element["http://www.w3.org/2004/02/skos/core#broader"]
        element["http://www.w3.org/2004/02/skos/core#broader"].each do |broader|
          @broader.push(broader["@id"])
        end
      end

      if element["http://www.w3.org/2004/02/skos/core#narrower"]
        element["http://www.w3.org/2004/02/skos/core#narrower"].each do |narrower|
          @narrower.push(narrower["@id"])
        end
      end

      if element["http://www.w3.org/2004/02/skos/core#prefLabel"]
        element["http://www.w3.org/2004/02/skos/core#prefLabel"].each do |label|
          @label[label["@language"].to_sym] = label["@value"]
        end
      end
    else
      @id = ""
      @type = ""
    end
  end

  def hasBroader()
    @broader.count > 0
  end

  def isConcept?()
    @type == "http://www.w3.org/2004/02/skos/core#Concept" || @type == "skos:Concept"
  end

  def isCollection?()
    @type == "http://www.w3.org/2004/02/skos/core#Collection" || @type == "skos:Collection"
  end

  def isConceptScheme?
    @type == "http://www.w3.org/2004/02/skos/core#ConceptScheme"
  end

  private

  def extractId(data)
    id = data[0]

    return id["@id"] if id["@id"]

    id
  end
end
