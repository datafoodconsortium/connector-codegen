# frozen_string_literal: true

require 'datafoodconsortium/connector/data_reading_helper'

describe "parse with skos concept" do
  let(:connector) { DataFoodConsortium::Connector::Connector.instance }

  describe "productTypes" do
    before { connector.loadProductTypes(parse_json_file("productTypes.json")) }

    describe "topConcepts" do
      it "returns a list of available topConcepts" do
        product_types = connector.PRODUCT_TYPES.topConcepts

        expected = [
          :BAKERY, :DAIRY_PRODUCT, :DRINK, :FROZEN, :FRUIT, :INEDIBLE, :LOCAL_GROCERY_STORE,
          :MEAT_PRODUCT, :VEGETABLE
        ]
        expect(product_types).to eq(expected)
      end
    end

    it "parses the first level" do
      drink_type = connector.PRODUCT_TYPES.DRINK

      expect(drink_type.is_a?(DataFoodConsortium::Connector::SKOSConcept)).to be(true)
      expect(drink_type.broaders).to eq([])
      assert_array_includes(drink_type.narrowers, ["alcoholic-beverage", "soft-drink"])
    end

    it "parses the second level" do
      drink_type = connector.PRODUCT_TYPES.DRINK.SOFT_DRINK

      expect(drink_type.is_a?(DataFoodConsortium::Connector::SKOSConcept)).to be(true)
      assert_array_includes(drink_type.broaders, ["drink"])
      assert_array_includes(drink_type.narrowers,["fruit-juice", "lemonade", "smoothie"])
    end


    it "parses leaf level" do
      drink_type = connector.PRODUCT_TYPES.DRINK.SOFT_DRINK.LEMONADE

      expect(drink_type.is_a?(DataFoodConsortium::Connector::SKOSConcept)).to be(true)
      assert_array_includes(drink_type.broaders, ["soft-drink"])
      expect(drink_type.narrowers).to eq([])
    end
  end


  describe "facets" do
    before { connector.loadFacets(parse_json_file("facets.json")) }

    describe "topConcepts" do
      it "returns a list of available topConcepts" do
        facets = connector.FACETS.topConcepts

        expected = [:CERTIFICATION, :CLAIM, :NATUREORIGIN, :PARTORIGIN, :TERRITORIALORIGIN]
        expect(facets).to eq(expected)
      end
    end

    # We tested with Product Types further levels up to a leaf. So it's fair to expect
    # if the first level is good, the others are as well due to the recursive nature of the parser
    it "parses the first level" do
      facet = connector.FACETS.CERTIFICATION

      expect(facet.is_a?(DataFoodConsortium::Connector::SKOSConcept)).to be(true)
      expect(facet.broaders).to eq([])
      assert_array_includes(
        facet.narrowers,
        ["OrganicLabel", "LocalLabel", "BiodynamicLabel", "EthicalLabel", "MarketingLabel"]
      )
    end
  end

  def assert_array_includes(array, value)
    array.each_with_index do |a, i|
      expect(a).to include(value[i])
    end
  end
end
