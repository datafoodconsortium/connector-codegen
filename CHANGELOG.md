# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

Ruby:
- Add Import method reading JSON and returning objects.
- Add `SEMANTIC_TYPE` constant to every semantic class.

### Fixed

Ruby:
- Fix random code changes of the generated code by sorting elements (e36a9236fa012f87946b34c36cd463709d1cd2c5).
- Fix some tests so they can pass by changing the expected JSON (e36a9236fa012f87946b34c36cd463709d1cd2c5).
- Enable loading of measures v1.0.2 (6ef17f7d4a19aebd9d89b544db115d36f7e6fe93).
- Improve SKOS Concept parsing ([PR #10](https://github.com/datafoodconsortium/connector-codegen/pull/10)).

### Changed

Ruby:
- Preload context to avoid remote loading (4741acb7b2a396dc56f66f0c3b5e2d64078c7130).
- Use nil as default value for all types.

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

[unreleased]: https://github.com/datafoodconsortium/connector-codegen/compare/v1.0.0...HEAD
[1.0.1]: https://github.com/datafoodconsortium/connector-codegen/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/datafoodconsortium/connector-codegen/releases/tag/v1.0.0
