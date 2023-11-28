# frozen_string_literal: true

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
      expect(drink_type.narrowers).to eq([:ALCOHOLIC_BEVERAGE, :SOFT_DRINK])
    end

    it "parses the second level" do
      drink_type = connector.PRODUCT_TYPES.DRINK.SOFT_DRINK

      expect(drink_type.is_a?(DataFoodConsortium::Connector::SKOSConcept)).to be(true)
      expect(drink_type.broaders).to eq([:DRINK])
      expect(drink_type.narrowers).to eq([:FRUIT_JUICE, :LEMONADE, :SMOOTHIE])
    end


    it "parses leaf level" do
      drink_type = connector.PRODUCT_TYPES.DRINK.SOFT_DRINK.LEMONADE

      expect(drink_type.is_a?(DataFoodConsortium::Connector::SKOSConcept)).to be(true)
      expect(drink_type.broaders).to eq([:SOFT_DRINK])
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
      expect(facet.narrowers).to eq(
        [:ORGANICLABEL, :LOCALLABEL, :BIODYNAMICLABEL, :ETHICALLABEL, :MARKETINGLABEL]
      )
    end
  end
end
