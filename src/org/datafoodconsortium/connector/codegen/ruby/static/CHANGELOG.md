# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-06-10

This version has been generated using:

- [Connector code generator v1.2.0 branch](https://github.com/datafoodconsortium/connector-codegen/tree/v1.2.0).
- [UML data model PR 29](https://github.com/datafoodconsortium/data-model-uml/pull/29).

**This version contains breaking changes introduced by the ontology, see below.**

### Added

Classes:
- Add `ical:Vevent`
- Add `ical:Value_RECUR`
- Add `geo:Feature`
- Add `geo:Properties`
- Add `geo:Geometry`
- Add `geo:Point`
- Add `geo:Polygon`
- Add `Certification`
- Add `DeliveryStep`
- Add `Organization`
- Add `PickUpStep`
- Add `ProductOption`
- Add `ProductOptionValue`
- Add `Route`
- Add `TemplateSaleSession`
- Add `Variant`
- Add `VariantCaracteristic`

Properties:
- Add `Catalog:startDate`
- Add `PlannedLocalTransformation:startDate`
- Add `RealizedTransformation:startDate`
- Add `SuppliedProduct:referenceOf`.
- Add `TechnicalProduct:referenceOf`.

### Changed

- `Stock:availabilityDate` is now a 1-1 property (**BREAKING CHANGE**)
- `PaymentMethod:paymentMethodProvider` is now a 1-1 property (**BREAKING CHANGE**)
- `PaymentMethod:paymentMethodType` is now a 1-1 property (**BREAKING CHANGE**)
- `Variant:isVariantOf is now a `Variant` instead of `DefinedProduct` (**BREAKING CHANGE**)

### Removed

- Removed the `Enterprise` class. It was renamed to `Organization` (**BREAKING CHANGE**)

## [1.4.0] - 2026-05-21

Generated from [UML model 3.4.0](https://github.com/datafoodconsortium/data-model-uml/releases/tag/v3.4.0) using the [Connector codegen 1.2.0](https://github.com/datafoodconsortium/connector-codegen/releases/tag/v1.2.0).

To avoid name conflict with newer major versions, this version has been published as a new package https://rubygems.org/gems/datafoodconsortium-connector-v1.

The module name has been changed to DataFoodConsortium::ConnectorV1, the package files and folder were renamed to connector_v1.

**This version contains breaking changes introduced by the ontology, see below.**

### Added

Accessors and mutators:
- Add `Agent:socialMedias` setter.
- Add `Agent:websites` setter.
- Add `Agent:emails` setter.
- Add `Catalog:maintainers` setter and remover.
- Add `Catalog:items` setter.
- Add `CatalogItem:catalogs` setter and wrong remover.
- Add `CatalogItem:offers` setter and remover.
- Add `CustomerCategory:name` getter and setter.
- Add `DefinedProduct:partOrigin` setter.
- Add `DefinedProduct:natureOrigin` setter.
- Add `DefinedProduct:certifications` setter.
- Add `DefinedProduct:localizedProducts` accessors and mutators.
- Add `DefinedProduct:catalogItems` setter and remover.
- Add `DefinedProduct:images` adder, getter, setter and remover.
- Add `DefinedProduct:physicalCharacteristics` setter.
- Add `DefinedProduct:nutrientCharacteristics` setter.
- Add `DefinedProduct:allergenCharacteristics` setter.
- Add `DefinedProduct:claims` setter.
- Add `Enterprise:technicalProducts` setter and remover.
- Add `Enterprise:catalogItems` setter and remover.
- Add `Enterprise:customerCategories` setter and remover.
- Add `Enterprise:suppliedProducts` setter and remover.
- Add `Order:lines` setter and remover.
- Add `Order:paymentMethod` getter and setter.
- Add `Person:affiliatedOrgs` setter.
- Add `SaleSession:offers` setter and remover.

New objects:
- Add `OpeningHoursSpecification`.

### Fixed

- Fix `Agent:localizations` setter.
- Fix `Agent:phoneNumbers` setter.

### Changed

- `Address:country` is now a `ISKOSConcept` to reflect ontology v1.16 state (**BREAKING CHANGE**).
- Rename `hasIncome` -> `hasInput` and `hasOutcome` -> `hasOutput` in `PlannedTransformation` (**BREAKING CHANGE**).
- Rename `incomeOf` > `inputOf` in `PlannedConsumptionFlow` (**BREAKING CHANGE**).
- Rename `outcomeOf` -> `outpufOf` in `PlannedProductionFlow` (**BREAKING CHANGE**).
- Rename `PhysicalPlace:addresses` to `PhysicalPlace:address` (singular) to support correct cardinatility (**BREAKING CHANGE**).
- Rename `PhysicalPlace:mainContact` to `PhysicalPlace:mainContacts` (plural) to support correct cardinatility (**BREAKING CHANGE**).

### Removed

- Remove the `Quantity` class as there is no such class in the ontology. We should use `QuantitativeValue` (**BREAKING CHANGE**).

## [1.3.0] - 2025-12-17

This version has been generated using:

- [Connector code generator](https://github.com/datafoodconsortium/connector-codegen) [main](https://github.com/datafoodconsortium/connector-codegen/commit/e8e324dfc9952aa59f10a94edb8d33c3ef7f90f3).
- [UML data model](https://github.com/datafoodconsortium/data-model-uml) [next](https://github.com/datafoodconsortium/data-model-uml/commit/945fb8edb4e29b78475414c6afdf87858a6a97ad).

### Changed

- Export valid empty JSON instead of invalid empty string
- Lock context to version 1.16 to prevent upgrade to 2.0
- Bump dev dependencies

## [1.2.0] - 2025-11-24

This version has been generated using:

- [Connector code generator](https://github.com/datafoodconsortium/connector-codegen) [main](https://github.com/datafoodconsortium/connector-codegen/commit/e8e324dfc9952aa59f10a94edb8d33c3ef7f90f3).
- [UML data model](https://github.com/datafoodconsortium/data-model-uml) [next](https://github.com/datafoodconsortium/data-model-uml/commit/945fb8edb4e29b78475414c6afdf87858a6a97ad).

### Changed

- Bump DFC context from 1.14.0 to 1.16.0
- Bump dev dependencies

## [1.1.0] - 2025-01-14

This version has been generated using:

- [Connector code generator](https://github.com/datafoodconsortium/connector-codegen) [main](https://github.com/datafoodconsortium/connector-codegen/commit/8742cb8ee82a312f5735c4739e95e7cbf85ca0b3).
- [UML data model](https://github.com/datafoodconsortium/data-model-uml) [next](https://github.com/datafoodconsortium/data-model-uml/commit/621e823c21c79a58b117bae97132da9140e47be6).

### Changed

- Bump DFC context from 1.8.0 to 1.14.0
- Bump dev dependencies

## [1.0.0] - 2025-01-09

This version has been generated using:

- [Connector code generator](https://github.com/datafoodconsortium/connector-codegen) [main](https://github.com/datafoodconsortium/connector-codegen/commit/e630d0334b70e4a7e7e07a9151fecaf53af0557e).
- [UML data model](https://github.com/datafoodconsortium/data-model-uml) [next](https://github.com/datafoodconsortium/data-model-uml/commit/621e823c21c79a58b117bae97132da9140e47be6).

### Added

- Add the `soldBy` property in `Order`.
- In `DefinedProduct`:
  - Add the `hasVariant` property.
  - Add the `isVariantOf` property.

## [1.0.0-alpha.13] - 2024-10-11

This version has been generated using:

- [Connector code generator](https://github.com/datafoodconsortium/connector-codegen) [main](https://github.com/datafoodconsortium/connector-codegen/commit/c3bc0728a936106b79dfba61c6bf40bfe3934aaf).
- [UML data model](https://github.com/datafoodconsortium/data-model-uml) [next](https://github.com/datafoodconsortium/data-model-uml/commit/edac40255591f46884e75da47e28f04adc53d97a).

### Changed

- Use nil as default value for all types except arrays.

## [1.0.0-alpha.12] - 2024-04-11

This version has been generated using:

- [Connector code generator](https://github.com/datafoodconsortium/connector-codegen) [main](https://github.com/datafoodconsortium/connector-codegen/commit/e0d4fceb069c029232ee63c9a631480f00f73a59).
- [UML data model](https://github.com/datafoodconsortium/data-model-uml) [next](https://github.com/datafoodconsortium/data-model-uml/commit/7fec05679450864108e20ce7411cbc957e559d30).

## Changed

- Bump semantizer from 1.0.5 to 1.1.1.
- Semantic objects can now be compared with `==`.

## [1.0.0-alpha.11] - 2024-04-04

This version has been generated using:

- [Connector code generator](https://github.com/datafoodconsortium/connector-codegen) [main](https://github.com/datafoodconsortium/connector-codegen/commit/4f27cdecff1fc727283cbbb0a7847e0e178b761c).
- [UML data model](https://github.com/datafoodconsortium/data-model-uml) [next](https://github.com/datafoodconsortium/data-model-uml/commit/7fec05679450864108e20ce7411cbc957e559d30).

## [1.0.0-alpha.10] - 2024-01-30

This version has been generated using:

- [Connector code generator](https://github.com/datafoodconsortium/connector-codegen) [58d66e80d2d317a715c3aeabac05efa38c39ea29](https://github.com/datafoodconsortium/connector-codegen/commit/58d66e80d2d317a715c3aeabac05efa38c39ea29).
- [UML data model](https://github.com/datafoodconsortium/data-model-uml) [2.1.0](https://github.com/datafoodconsortium/data-model-uml/releases/tag/v2.1.0).

### Added

- Add Import method reading JSON and returning objects. ([PR #12](https://github.com/datafoodconsortium/connector-codegen/pull/12)).
- Add `SEMANTIC_TYPE` constant to every semantic class.

### Fixed

- Fix random code changes of the generated code by sorting elements (e36a9236fa012f87946b34c36cd463709d1cd2c5).
- Fix some tests so they can pass by changing the expected JSON (e36a9236fa012f87946b34c36cd463709d1cd2c5).
- Enable loading of measures v1.0.2 (6ef17f7d4a19aebd9d89b544db115d36f7e6fe93).
- Allow output context to be configured ([PR #8](https://github.com/datafoodconsortium/connector-codegen/pull/8)).
- Improve SKOS Concept parsing ([PR #10](https://github.com/datafoodconsortium/connector-codegen/pull/10)).
- Replace revoked json-canonicalization version 0.3.2 with 1.0.0.

### Changed

- Preload context to avoid remote loading (4741acb).
- Rewrite MiniTest tests as Rspec specs ([PR #9](https://github.com/datafoodconsortium/connector-codegen/pull/9)).
- Bump json-ld from 3.3.0 to 3.3.1.

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

[unreleased]: https://github.com/datafoodconsortium/connector-ruby/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.4.0...v2.0.0
[1.4.0]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.13...v1.0.0
[1.0.0-alpha.13]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.12...v1.0.0-alpha.13
[1.0.0-alpha.12]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.11...v1.0.0-alpha.12
[1.0.0-alpha.11]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.10...v1.0.0-alpha.11
[1.0.0-alpha.10]: https://github.com/datafoodconsortium/connector-ruby/compare/v1.0.0-alpha.9...v1.0.0-alpha.10
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
