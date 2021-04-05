# openHAB Alignment Tool Change Log

All notable changes to the openHAB Alignment Tool extension will be documented in this file.

## [2.0.0] - 21.07.2020

## Changed

-    Implemented the Visual-Studio-Code formatter API. The extension is now a proper formatting tool and can use all the formatting functions integrated in the standard vsc installation (Like format-on-save, etc.).

## Fixed

-    Fixed a lot of bugs regarding special formatting features for the \*.items files.

## [1.3.11] - 01.03.2020

## Added

-    Added the formatting for sitemap files.

## [1.3.10] - 20.02.2020

## Added

-    Added new formatting style "ChannelColumn".

## [1.3.5] - 03.11.2019

## Fixed

-    Fixed bug for german umlauts in item type definitions
-    Fixed bug for items in the first line of a item file.

## [1.3.4] - 31.10.2019

### Added

-    Commands at teh end of an item are not deleted anymore

## [1.3.3] - 27.10.2019

### Added

-    Tool is now able to support all function with space and tab indentation.

## [1.3.2] - 27.10.2019

### Added

-    Restore multiline indenting style from multiline formatting extension

## [1.3.1] - 27.10.2019

### Changed

-    Fixed error in the package.json which prevented the correct execution of the npm scripts.
-    Fixed error which deleted item line after a comment line.

## [1.3.0] - 27.10.2019

### Added

-    Added support for the multiline formatting style of [Mark Hilbush's Extension](https://github.com/mhilbush/openhab-formatter). Credits to Mark for a great extension and functionality. After having a chat about our extensions we joined forces and grouped them together in one extension.
-    Added style configuration option
-    Added option to preserve existing whitespaces in front of items
-    Added option to insert new lines after each item

### Changed

-    Changed some VSC Marketplace parameters
-    Changed internal function and method structure to add some performance.

## [1.0.7] - 18.10.2019

### Added

-    Added support for cmnd/ctrl+a+l keybinding.

### Changed

-    Changed internal function name. Conflict with formatting extension of Mark Hilbush.

## [1.0.6] - 13.10.2019

### Added

-    Added support for multiline (line-by-line) item-definition files. They will be decoded and written into one line for the column formatting style. [#2]

## [1.0.5] - 11.10.2019

### Added

-    Added support for tabs or spaces in front of items. [#1]
-    Added support for group functions like OR(ON, OFF) or AVG, SUM, etc.

### Changed

-    Name of the app. Confusion with tool of Mark Hilbush. Sorry Mark ;)

## [1.0.4] - 11.10.2019

### Added

-    Support for space indentation in VSC.

## [1.0.0] - 11.10.2019

### Added

-    Initial upload of the project.
