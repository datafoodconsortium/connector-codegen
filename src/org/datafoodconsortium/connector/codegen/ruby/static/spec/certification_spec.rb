RSpec.describe DataFoodConsortium::Connector::Certification do
  it "can be empty when exported" do
    subject = DataFoodConsortium::Connector::Certification.new(
      "https://myplatform.com/subject"
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/subject",
        "@type" => "dfc-b:Certfication",
      }
    )
  end

  it "contains all fields when exported" do
    organization = DataFoodConsortium::Connector::Organization.new("https://myplatform.com/organization")
    subject = DataFoodConsortium::Connector::Certification.new(
      "https://myplatform.com/subject",
      name: "name",
      description: "description",
      certificationReferences: ["certificationReference"],
      certificationScores: ["certificationScore"],
      operatorIds: ["operatorId"],
      certifiedOrganizations: [organization],
    )
    result = exported_json(subject)
    expect(result).to include(
      {
        "@id" => "https://myplatform.com/subject",
        "@type" => "dfc-b:Certfication",
        "dfc-b:name" => "name",
        "dfc-b:hasDescription" => "description",
        "dfc-b:certiferReference" => "certificationReference",
        "dfc-b:certificationScore" => "certificationScore",
        "dfc-b:operatorId" => "operatorId",
        "dfc-b:certifies" => "https://myplatform.com/organization",
      }
    )
  end
end
