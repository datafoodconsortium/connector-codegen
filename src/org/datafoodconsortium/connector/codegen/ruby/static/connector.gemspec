Gem::Specification.new do |s|
  s.name        = "datafoodconsortium-connector"
  s.version     = "1.0.0-alpha.10"
  s.summary     = "Data Food Consortium connector"
  s.description = "A library to easily integrate the DFC standard within your application."
  s.authors     = ["Maxime Lecoq"]
  s.email       = "maxime@lecoqlibre.fr"
  s.files       = Dir["lib/**/*.rb"]
  s.homepage    =
    "https://github.com/datafoodconsortium/connector-ruby/"
  s.license       = "MIT"

  s.add_runtime_dependency "virtual_assembly-semantizer", "~> 1.0", ">= 1.0.5"
end
