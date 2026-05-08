<!-- TODO: Update this CHANGELOG before merging into connector-codegen#main -->
<!-- TODO: Also update semver values here and in package.json etc -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- None

## [1.0.0-alpha.10] - 2025-04-28

### Changed
- Ensure the entry point, `src/index.ts`, is always regenerated on fresh builds.
- Generated from updated [UML Model](https://github.com/datafoodconsortium/data-model-uml/):
  - Release: [3.0.0](https://github.com/datafoodconsortium/data-model-uml/releases/tag/v3.0.0)
  - Commit: [@732bc8e](https://github.com/datafoodconsortium/data-model-uml/commit/732bc8e5cbbf55818ce36330a6c58031d740fefa)

### Added
- `DefinedProduct`:
  - hasVariant
  - isVariantOf

### Fixed
- Fix setters for array properties so that all items are replaced.

## [1.0.0-alpha.9] - 2024-03-21

### Changed

- Update `rdf-ext` to version 2.5.1.
- Update `@types/rdf-ext` to version 2.5.0.
- Update `@virtual-assembly/semantizer` to version alpha.3 (use GitHub repository).
- Generate the code from the code generator.
- Generated from the next branch of UML data model [edac402](https://github.com/datafoodconsortium/data-model-uml/commit/edac40255591f46884e75da47e28f04adc53d97a).

### Added

- `Address`:
  - latitute
  - longitude
  - region
- `Agent`:
  - logo
- `PlannedConsumptionFlow`:
  - quantity
  - consumes
- `PlannedProductionFlow`:
  - quantity
  - produces
- `PlannedTransformation`:
  - hasIncome
  - hasOutcome
  - hasTransformationType
- `DefinedProduct`:
  - image
- `Order`:
  - date
  - hasFulfilmentStatus
  - hasOrderStatus
  - hasPaymentStatus
  - orderNumber

See the SUPPORTED.md file [comparison from main to next](https://github.com/datafoodconsortium/data-model-uml/compare/main...next#diff-25a3722bf6006b7a060d6900ea707cb596a854ea3cdb6ef3b1980531d5d85bc5).

## [1.0.0-alpha.8] - 2024-01-31

### Added

- Add `DefinedProduct` support for images url.

## [1.0.0-alpha.7] - 2024-01-13

### Fixed

- Compile sources.

## [1.0.0-alpha.6] - 2024-01-13

### Fixed

- Allow to create SKOSConcept in the factory.

## [1.0.0-alpha.5] - 2024-01-13

### Fixed

- Support loading taxonomies with unknown parsed type (ex: owl:Class).

### Changed

- Use latest taxonomy files in tests.

### Added

- Add vocabulary taxonomy in tests (for later).

## [1.0.0-alpha.4] - 2023-07-11

### Fixed

- The `dfc-b` prefix points to the business ontology, not the full model.

## [1.0.0-alpha.3] - 2023-07-10

### Fixed

- The importer is able to import only one blank node.
### Changed

- Use the new DFC semantic resources:
  - https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_FullModel.owl
  - https://github.com/datafoodconsortium/taxonomies/releases/latest/download/productTypes.rdf
  - https://github.com/datafoodconsortium/taxonomies/releases/latest/download/measures.rdf
  - https://github.com/datafoodconsortium/taxonomies/releases/latest/download/facets.rdf
- Update thesaurus with the new resources (test directory).
- Update context to https://www.datafoodconsortium.org (was previously static.datafoodconsortium.org).
- Update jest to version >= 29.5.0.
- Expect exceptions in tests for not implemented features.
- Increase the timeout for all the tests (10sec instead of 5sec).

## [1.0.0-alpha.2] - 2023-05-23

### Changed

- Index does not export Semanticable anymore.
- Update @types/rdf-ext to version 2.2.0.
- Git ignore .code-workspace files.
- Update dependency to semantizer version alpha.2.

## [1.0.0-alpha.1] - 2023-03-27

### Added

- Add optional parameters in constructors.
- Add the import functions:
  - We use the node fetch API by default, be sure to have node >= v17.15 installed.
  - Add the `importOne` and `importOneTyped` methods to get only one result.
- Add a store:
  - `IConnectorStore`
  - `ConnectorStoreMap`: basic store implemented using a Map.
- Add a factory:
  - `IConnectorFactory`
  - `ConnectorFactory`
- Support `Catalog`, `SaleSession`, `Order` and `OrderLine`.
- Add copy constructor.
- Test all classes.
- Add create functions in the `Connector` class.
- Export interfaces and `Semanticable`.
- Add interfaces for options:
    - `IConnectorExporterOptions`
    - `IConnectorExportOptions`
    - `IConnectorImporterOptions`
    - `IConnectorImportOptions`
    - `IGetterOptions`

### Fixed

- The getters for number do return a number and not a string.
- Make the test/thesaurus to be valid JSON-LD compliant files.

### Changed

- Connector is not a singleton anymore.
- The interfaces of the concreate classes directly inherit from `Semanticable`.
- We now use RDFJS parser and serializer.
- Use `@virtual_assembly/semantizer v1.0.0-alpha.1` (RDFJS).
- License to MIT.
- `README.md` and `CHANGELOG.md` files.

## [1.0.0-alpha] - 2022-10-26

### Added

- Initial release.

[unreleased]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.10...HEAD
[1.0.0-alpha.10]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.9...v1.0.0-alpha.10
[1.0.0-alpha.9]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.8...v1.0.0-alpha.9
[1.0.0-alpha.8]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.7...v1.0.0-alpha.8
[1.0.0-alpha.7]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.6...v1.0.0-alpha.7
[1.0.0-alpha.6]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.5...v1.0.0-alpha.6
[1.0.0-alpha.5]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.4...v1.0.0-alpha.5
[1.0.0-alpha.4]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.3...v1.0.0-alpha.4
[1.0.0-alpha.3]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha...v1.0.0-alpha.1
[1.0.0-alpha]: https://github.com/datafoodconsortium/connector-typescript/releases/tag/v1.0.0-alpha
