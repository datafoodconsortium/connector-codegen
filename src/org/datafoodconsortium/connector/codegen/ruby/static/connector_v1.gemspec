Gem::Specification.new do |s|
  s.name        = "datafoodconsortium-connector-v1"
  s.version     = "1.4.0-beta5"
  s.summary     = "Data Food Consortium connector version 1 (legacy)"
  s.description = "A library to easily integrate the DFC standard within your application."
  s.authors     = ["Maxime Lecoq", "Maikel Linke"]
  s.email       = "maxime@lecoqlibre.fr"
  s.files       = Dir["lib/**/*.*"]
  s.homepage    = "https://github.com/datafoodconsortium/connector-ruby/releases/tag/v1.4.0"
  s.license     = "MIT"

  s.metadata = {
    "changelog_uri" =>
      "https://github.com/datafoodconsortium/connector-ruby/releases/tag/v1.4.0/blob/main/CHANGELOG.md",
    "source_code_uri" =>
      "https://github.com/datafoodconsortium/connector-ruby/releases/tag/v1.4.0/",
  }

  s.add_runtime_dependency "virtual_assembly-semantizer", "~> 1.0", ">= 1.0.5"
end
