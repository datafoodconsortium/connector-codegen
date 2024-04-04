# frozen_string_literal: true

RSpec.describe "parse with skos concept" do
  describe "productTypes" do
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

    describe "prefLabels" do
      it "populates SKOS Concept prefLabels" do
        drink_type = connector.PRODUCT_TYPES.DRINK
        expect(drink_type.prefLabels).to eq({en: "drink", fr: "boisson" })
      end
    end

    it "parses the first level" do
      drink_type = connector.PRODUCT_TYPES.DRINK

      expect(drink_type).to be_a DataFoodConsortium::Connector::SKOSConcept
      expect(drink_type.broaders).to eq([])
      expect(drink_type.narrowers).to include(/alcoholic-beverage/, /soft-drink/)
    end

    it "parses the second level" do
      drink_type = connector.PRODUCT_TYPES.DRINK.SOFT_DRINK

      expect(drink_type).to be_a DataFoodConsortium::Connector::SKOSConcept
      expect(drink_type.broaders).to include(/drink/)
      expect(drink_type.narrowers).to include(/fruit-juice/, /lemonade/, /smoothie/)
    end


    it "parses leaf level" do
      drink_type = connector.PRODUCT_TYPES.DRINK.SOFT_DRINK.LEMONADE

      expect(drink_type).to be_a DataFoodConsortium::Connector::SKOSConcept
      expect(drink_type.broaders).to include(/soft-drink/)
      expect(drink_type.narrowers).to eq([])
    end
  end


  describe "facets" do
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

      expect(facet).to be_a DataFoodConsortium::Connector::SKOSConcept
      expect(facet.broaders).to eq([])
      expect(facet.narrowers).to include(
        /OrganicLabel/, /LocalLabel/, /BiodynamicLabel/, /EthicalLabel/, /MarketingLabel/
      )
    end
  end
end
