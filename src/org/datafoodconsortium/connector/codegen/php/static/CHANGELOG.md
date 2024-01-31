# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-beta3] - 2024-01-31

### Added

- Support phone number and social media.
- Add logo to Agent.
- Add latitude, longitude and region to Address.
- Add hasFulfilmentStatus, hasOrderStatus and hasPaymentStatus to Order.
- Add `AsPlannedTransformation` loop.
- Add `Connector:fetch` and `IConnector:fetch`.
- Add default prefix value for dfc-f, dfc-m, dfc-pt and dfc-v.

### Changed

- Update Readme.

## [1.0.0-beta2] - 2023-09-19

### Fixed

- Allow [hyphen in prefix](https://github.com/sweetrdf/easyrdf/issues/32).

### Changed

- Update virtual-assembly/semantizer to version 1.0.0-beta2.
- Change prefix of all mapped objects from "dfc" to "dfc-b".
- Use "dfc-b" prefix in the `Connector` class.

### Added

- A link to the API reference in the readme file.
- The .gitignore file.

## [1.0.0-beta1] - 2023-08-15

- Initial release.

[unreleased]: https://github.com/datafoodconsortium/connector-php/compare/v1.0.0-beta3...HEAD
[1.0.0-beta3]: https://github.com/datafoodconsortium/connector-php/compare/v1.0.0-beta2...v1.0.0-beta3
[1.0.0-beta2]: https://github.com/datafoodconsortium/connector-php/compare/v1.0.0-beta1...v1.0.0-beta2
[1.0.0-beta1]: https://github.com/datafoodconsortium/connector-php/releases/tag/v1.0.0-beta1
