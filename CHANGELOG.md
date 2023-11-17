# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

Ruby:
- Fix random code changes of the generated code by sorting elements (e36a923).
- Fix some tests so they can pass by changing the expected JSON (e36a923).
- Enable loading of measures v1.0.2 (6ef17f7).

### Changed

Ruby:
- Preload context to avoid remote loading (4741acb).

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