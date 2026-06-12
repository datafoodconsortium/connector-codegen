RSpec.describe DataFoodConsortium::Connector::DeliveryStep do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::DeliveryStep.new(
      "https://myplatform.com/subject"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/subject",
        "@type" => "dfc-b:DeliveryStep",
      }
    )
  end

  it "contains all fields when exported" do
    route = DataFoodConsortium::Connector::Route.new("https://myplatform.com/route")
    order = DataFoodConsortium::Connector::Order.new("https://myplatform.com/order")
    saleSession = DataFoodConsortium::Connector::SaleSession.new("https://myplatform.com/saleSession")
    deliveredPlace = DataFoodConsortium::Connector::PhysicalPlace.new("https://myplatform.com/deliveredPlace")
    subject = DataFoodConsortium::Connector::DeliveryStep.new(
      "https://myplatform.com/subject",
      name: "name", 
      description: "description", 
      routes: [route],
      duration: "duration",
      arrivalDate: "arrivalDate",
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/subject",
        "@type" => "dfc-b:DeliveryStep",
        "dfc-b:name" => "name",
        "dfc-b:description" => "description",
        "dfc-b:isStepOf" => "https://myplatform.com/route",
        "dfc-b:duration" => "duration",
        "dfc-b:arrivalDate" => "arrivalDate",
      }
    )
  end
end
