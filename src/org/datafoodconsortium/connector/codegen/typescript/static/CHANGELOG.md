<!-- TODO: Update this CHANGELOG before merging into connector-codegen#main -->

<!-- TODO: Also update semver values here and in package.json etc -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Update `rdf-ext` to version 2.5.1.
- Update `@types/rdf-ext` to version 2.5.0.
- Update `@virtual-assembly/semantizer` to version alpha.3 (use GitHub repository).

## [1.0.0-alpha.2] - 2023-05-23

### Changed

- index does not export Semanticable anymore.
- update @types/rdf-ext to version 2.2.0.
- git ignore .code-workspace files.
- update dependency to semantizer version alpha.2.

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

[unreleased]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.2...HEAD
[1.0.0-alpha.2]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/datafoodconsortium/connector-typescript/compare/v1.0.0-alpha...v1.0.0-alpha.1
[1.0.0-alpha]: https://github.com/datafoodconsortium/connector-typescript/releases/tag/v1.0.0-alpha
