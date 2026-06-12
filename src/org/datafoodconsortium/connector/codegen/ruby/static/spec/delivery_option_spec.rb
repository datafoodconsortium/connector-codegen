RSpec.describe DataFoodConsortium::Connector::DeliveryOption do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::DeliveryOption.new(
      "https://myplatform.com/subject"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/subject",
        "@type" => "dfc-b:DeliveryOption",
      }
    )
  end

  it "contains all fields when exported" do
    quantity = DataFoodConsortium::Connector::QuantitativeValue.new()
    order = DataFoodConsortium::Connector::Order.new("https://myplatform.com/order")
    saleSession = DataFoodConsortium::Connector::SaleSession.new("https://myplatform.com/saleSession")
    deliveredPlace = DataFoodConsortium::Connector::PhysicalPlace.new("https://myplatform.com/deliveredPlace")
    subject = DataFoodConsortium::Connector::DeliveryOption.new(
      "https://myplatform.com/subject",
      name: "name", 
      description: "description", 
      fee: 1.0, 
      quantity: quantity, 
      order: order, 
      saleSession: saleSession, 
      beginDate: "beginDate", 
      endDate: "endDate",
      deliveredPlace: deliveredPlace,
      deliveryConstraint: "deliveryConstraint",
      accessibilityInformation: "accessibilityInformation",
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/subject",
        "@type" => "dfc-b:DeliveryOption",
        "dfc-b:name" => "name",
        "dfc-b:description" => "description",
        "dfc-b:fee" => 1.0,
        "dfc-b:hasQuantity" => {"@type" => "dfc-b:QuantitativeValue"},
        "dfc-b:selectedBy" => "https://myplatform.com/order",
        "dfc-b:optionOf" => "https://myplatform.com/saleSession",
        "dfc-b:startDate" => "beginDate",
        "dfc-b:endDate" => "endDate",
      }
    )
  end
end
