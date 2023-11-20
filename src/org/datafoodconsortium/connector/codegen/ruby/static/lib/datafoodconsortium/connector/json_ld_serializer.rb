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

require 'virtual_assembly/semantizer'
require 'json/ld'

class DataFoodConsortium::Connector::JsonLdSerializer

    def initialize(outputContext = nil, inputContext = nil)
        @outputContext = outputContext
        @hashSerializer = VirtualAssembly::Semantizer::HashSerializer.new(inputContext)
    end

    def process(*subjects)
        return "" if subjects.empty?

        inputs = []
        
        # Insert an input context on each subject so the properties could be prefixed. This way,
        # the DFC's context can be used.
        # See https://github.com/datafoodconsortium/connector-ruby/issues/11.
        subjects.each do |subject|
            input = { "@context" => @outputContext }
            input.merge!(subject.serialize(@hashSerializer))
            inputs.push(input)
        end

        jsonLd = JSON::LD::API.compact(inputs, @outputContext)

        return JSON.generate(jsonLd)
    end

end
