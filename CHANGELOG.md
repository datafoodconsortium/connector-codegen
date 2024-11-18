# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Queries for auto-importing (`getImportedClasses`, `getImportedInterfaces`, `getImportedClassifiers`, `getImportedClassifiersWithoutPrimitives` and `getImportedTypesOfOperations`).
- Queries for operations to be implemented or declared by a class: 
  - `getAllImplementedInterfacesWithoutParents`.
  - `getOperationsToImplementOrDeclareFromInterfacesWithoutParents`.
  - `getOperationsToImplementOrDeclare`.

## [1.1.0] - 2024-10-22

### Added

Ruby:
- Add Import method reading JSON and returning objects. ([PR #12](https://github.com/datafoodconsortium/connector-codegen/pull/12)).
- Add `SEMANTIC_TYPE` constant to every semantic class.
- Released versions 1.0.0-alpha.10, 1.0.0-alpha.11, 1.0.0-alpha.12, 1.0.0-alpha.13.

Php:
- Add vocabulary thesaurus in tests.
- Add fetch method in `Connector`.
- Set default prefix value in `Connector` for dfc-f, dfc-m, dfc-pt and dfc-v.

### Fixed

Ruby:
- Fix random code changes of the generated code by sorting elements (e36a9236fa012f87946b34c36cd463709d1cd2c5).
- Fix some tests so they can pass by changing the expected JSON (e36a9236fa012f87946b34c36cd463709d1cd2c5).
- Enable loading of measures v1.0.2 (6ef17f7d4a19aebd9d89b544db115d36f7e6fe93).
- Improve SKOS Concept parsing ([PR #10](https://github.com/datafoodconsortium/connector-codegen/pull/10)).
- Allow output context to be configured ([PR #8](https://github.com/datafoodconsortium/connector-codegen/pull/8)).
- Replace revoked json-canonicalization version 0.3.2 with 1.0.0.

Php:
- Fix missing `$` in variable name and missing `->` in `generateAdderBody`.

### Changed

Ruby:
- Preload context to avoid remote loading (4741acb).
- Use nil as default value for all types.
- Bump semantizer from 1.0.5 to 1.1.1.
- Semantic objects can now be compared with `==`.
- Rewrite MiniTest tests as Rspec specs ([PR #9](https://github.com/datafoodconsortium/connector-codegen/pull/9)).
- Bump json-ld from 3.3.0 to 3.3.1.

## [1.0.1] - 2023-11-06

### Fixed

Ruby:
  - Update gemspec and lockfile.
  - Release alpha.9 and update changelog.

## [1.0.0] - 2023-11-06

This release requires [data-model-uml version 2.1.0](https://github.com/datafoodconsortium/data-model-uml/releases/tag/v2.1.0).

### Added

- PHP generator.
- Ruby generator.

### Changed

- Ruby:
  - Update dfc prefix and fix parser.
  - Update dfc prefix in skos_parser and change dfc-b:hasName.
  - Change dfc-b:hasName to dfc-b:name in tests.

[unreleased]: https://github.com/datafoodconsortium/connector-codegen/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/datafoodconsortium/connector-codegen/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/datafoodconsortium/connector-codegen/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/datafoodconsortium/connector-codegen/releases/tag/v1.0.0
