Gem::Specification.new do |s|
  s.name        = "datafoodconsortium-connector"
  s.version     = "1.1.0"
  s.summary     = "Data Food Consortium connector"
  s.description = "A library to easily integrate the DFC standard within your application."
  s.authors     = ["Maxime Lecoq"]
  s.email       = "maxime@lecoqlibre.fr"
  s.files       = Dir["lib/**/*.*"]
  s.homepage    = "https://github.com/datafoodconsortium/connector-ruby/"
  s.license     = "MIT"

  s.metadata = {
    "changelog_uri" =>
      "https://github.com/datafoodconsortium/connector-ruby/blob/main/CHANGELOG.md",
    "source_code_uri" =>
      "https://github.com/datafoodconsortium/connector-ruby/",
  }

  s.add_runtime_dependency "virtual_assembly-semantizer", "~> 1.0", ">= 1.0.5"
end
