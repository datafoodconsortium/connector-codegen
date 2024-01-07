describe DataFoodConsortium::Connector::Importer do
  let(:enterprise) do
    DataFoodConsortium::Connector::Enterprise.new(
      "https://example.net/foo-food-inc",
      suppliedProducts: [product, second_product],
    )
  end
  let(:catalog_item) do
    DataFoodConsortium::Connector::CatalogItem.new(
      "https://example.net/tomatoItem",
      product: product,
    )
  end
  let(:product) do
    DataFoodConsortium::Connector::SuppliedProduct.new(
      "https://example.net/tomato",
      name: "Tomato",
      description: "Awesome tomato",
      totalTheoreticalStock: 3,
    )
  end
  let(:product_data) do
    <<~JSON
      {
        "@context":"http://static.datafoodconsortium.org/ontologies/context.json",
        "@id":"https://example.net/tomato",
        "@type":"dfc-b:SuppliedProduct",
        "dfc-b:name":"Tomato",
        "dfc-b:description":"Awesome tomato",
        "dfc-b:alcoholPercentage":0.0,
        "dfc-b:lifetime":"",
        "dfc-b:usageOrStorageCondition":"",
        "dfc-b:totalTheoreticalStock":3
      }
    JSON
  end
  let(:product_data_with_context_v1_8) do
    <<~JSON
      {
        "@context": {
          "dfc-b": "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#",
          "dfc-m": "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/measures.rdf#",
          "dfc-pt": "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/productTypes.rdf#",
          "dfc-b:hasType":{"@type":"@id"}
        },
        "@id":"https://example.net/tomato",
        "@type":"dfc-b:SuppliedProduct",
        "dfc-b:name":"Tomato",
        "dfc-b:description":"Awesome tomato",
        "dfc-b:alcoholPercentage":0.0,
        "dfc-b:lifetime":"",
        "dfc-b:usageOrStorageCondition":"",
        "dfc-b:totalTheoreticalStock":3
      }
    JSON
  end
  let(:second_product) do
    DataFoodConsortium::Connector::SuppliedProduct.new(
      "https://example.net/ocra",
      name: "Ocra",
    )
  end
  let(:quantity) do
    DataFoodConsortium::Connector::QuantitativeValue.new(
      unit: connector.MEASURES.PIECE,
      value: 5,
    )
  end

  it "imports a single object with simple properties" do
    result = import(product)

    expect(result).to be_a product.class
    expect(result.semanticType).to eq product.semanticType
    expect(result.semanticId).to eq "https://example.net/tomato"
    expect(result.name).to eq "Tomato"
    expect(result.description).to eq "Awesome tomato"
    expect(result.totalTheoreticalStock).to eq 3
  end

  it "imports an object with referenced context" do
    result = connector.import(product_data)

    expect(result).to be_a DataFoodConsortium::Connector::SuppliedProduct
    expect(result.semanticType).to eq "dfc-b:SuppliedProduct"
    expect(result.semanticId).to eq "https://example.net/tomato"
    expect(result.name).to eq "Tomato"
    expect(result.description).to eq "Awesome tomato"
    expect(result.totalTheoreticalStock).to eq 3
  end

  it "imports an object with included DFC v1.8 context" do
    result = connector.import(product_data_with_context_v1_8)

    expect(result).to be_a DataFoodConsortium::Connector::SuppliedProduct
    expect(result.semanticType).to eq "dfc-b:SuppliedProduct"
    expect(result.semanticId).to eq "https://example.net/tomato"
    expect(result.name).to eq "Tomato"
    expect(result.description).to eq "Awesome tomato"
    expect(result.totalTheoreticalStock).to eq 3
  end

  it "imports a graph with multiple objects" do
    result = import(catalog_item, product)

    expect(result).to be_a Array
    expect(result.size).to eq 2

    item, tomato = result

    expect(item).to be_a catalog_item.class
    expect(item.semanticType).to eq catalog_item.semanticType
    expect(item.semanticId).to eq "https://example.net/tomatoItem"
    expect(tomato.name).to eq "Tomato"
    expect(tomato.description).to eq "Awesome tomato"
    expect(tomato.totalTheoreticalStock).to eq 3
  end

  it "imports a graph including anonymous objects" do
    product.quantity = quantity

    tomato, items = import(product)

    expect(tomato.name).to eq "Tomato"
    expect(tomato.quantity).to eq items
    expect(items.value).to eq 5
    expect(items.unit).to eq connector.MEASURES.PIECE
  end

  it "imports properties with lists" do
    result = import(enterprise, product, second_product)

    expect(result.size).to eq 3

    enterprise, tomato, ocra = result

    expect(enterprise.suppliedProducts).to eq [tomato, ocra]
  end

  def import(*args)
    json = connector.export(*args)
    connector.import(json)
  end

  def read_file(name)
    JSON.parse(
      Rails.root.join("engines/dfc_provider/vendor/#{name}.json").read
    )
  end
end
