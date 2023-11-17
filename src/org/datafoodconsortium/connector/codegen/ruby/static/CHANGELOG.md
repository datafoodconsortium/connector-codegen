# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Fix random code changes of the generated code by sorting elements (e36a923).
- Fix some tests so they can pass by changing the expected JSON (e36a923).
- Enable loading of measures v1.0.2 (6ef17f7).

### Changed

- Preload context to avoid remote loading (4741acb).

## [1.0.0-alpha.9] - 2023-11-06

This version has been generated using the [code generator](https://github.com/datafoodconsortium/connector-codegen) [version 1.0.1](https://github.com/datafoodconsortium/connector-codegen/releases/tag/v1.0.1). See its release for more info.

### Fixed

- Loading concepts was failing because the parser tried to create a concept without giving it its mandatory semantic id.

## [1.0.0-alpha.8] - 2023-07-11

### Fixed

- The dfc-b prefix points to the business ontology, not the full model.

## [1.0.0-alpha.7] - 2023-07-10

### Changed

- Update the DFC semantic resources (instead of static.datafoodconsortium.org):
  - https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_FullModel.owl;
  - https://github.com/datafoodconsortium/taxonomies/releases/latest/download/productTypes.rdf;
  - https://github.com/datafoodconsortium/taxonomies/releases/latest/download/measures.rdf;
  - https://github.com/datafoodconsortium/taxonomies/releases/latest/download/facets.rdf;
  - Use the https://www.datafoodconsortium.org context.

## [1.0.0-alpha.6] - 2023-04-06

### Fixed

- Properties can be prefixed when serialized.

## [1.0.0-alpha.5] - 2023-02-20

### Added

- Add automated tests and GitHub actions.
- Handle optional parameters (named parameters).

### Changed

- Price is a BlankNode (ontology version 1.7.1).
- Update README.md.

## [1.0.0-alpha.4] - 2023-02-13

### Changed

- The connector is now able to export multiple objects.
- The `JsonLdSerializer` context parameter is optional.
- Use the DFC context `http://static.datafoodconsortium.org/ontologies/context.json`.
- Update `README.md`.

## [1.0.0-alpha.3] - 2023-01-25

### Fixed

- Use instance variable instead of class variable for SKOS parsed elements.

## [1.0.0-alpha.2] - 2023-01-18

### Fixed

- Fix loading vocabularies containing elements that start with a number (now starting with a "_").

## [1.0.0-alpha.1] - 2023-01-18

### Fixed

- Add a runtime dependency to `virtual_assembly-semantizer`.

## [1.0.0-alpha] - 2023-01-12

### Added

- Initial version of this library.

[unreleased]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0...HEAD
[1.0.0-alpha.9]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.8...v1.0.0-alpha.9
[1.0.0-alpha.8]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.7...v1.0.0-alpha.8
[1.0.0-alpha.7]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.6...v1.0.0-alpha.7
[1.0.0-alpha.6]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.5...v1.0.0-alpha.6
[1.0.0-alpha.5]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.4...v1.0.0-alpha.5
[1.0.0-alpha.4]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.3...v1.0.0-alpha.4
[1.0.0-alpha.3]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha...v1.0.0-alpha.1
[1.0.0-alpha]: https://github.com/datafoodconsortium/connector-ruby/releases/tag/v1.0.0-alpha
