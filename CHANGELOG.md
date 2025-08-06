# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-06

### Added
- **Menu Orientation Configuration**: Added configurable menu orientation (horizontal/vertical) for left menu title/icon layout
  - New `menuOrientation` property in MapSettings interface
  - Settings form with orientation dropdown (horizontal/vertical options)
  - Vertical orientation displays icon above title, centered with max-width constraint
  - Horizontal orientation maintains side-by-side layout (existing behavior)

- **JSON Schema Form Migration**: Converted manual forms to JSON Schema validation
  - Created separate schema files in `src/rjsf/schemas/` for better organization
  - Converted folder add/edit forms to use `FOLDER_SCHEMA`
  - Converted layer add/edit forms to use `LAYER_ADD_SCHEMA` and `LAYER_SCHEMA`
  - Added AJV8 validator with `removeAdditional: true` option

- **Raster Layer Legend System**: Comprehensive legend support for raster layers
  - Added `RasterSequentialLegend` (renamed to `RasterLinearLegend`) interface
  - Added `RasterIntervalLegend` interface for discrete intervals
  - Added `RasterImageLegend` interface for image-based legends
  - JSON Schema support for all legend types with proper validation

- **Enhanced Linear Raster Legend Rendering**: 
  - Min/max value descriptions display
  - Configurable orientation (horizontal/vertical)
  - Horizontal layout: colormap image on top, min/max labels below (left/right)
  - Vertical layout: colormap image on left, min/max labels on right (top/bottom aligned)
  - Structured block layout with distinct image and text containers

- **Raster Layer Configuration Enhancements**:
  - Band selection support (single band vs RGB bands)
  - Rescale parameter support with "min,max" format validation
  - Additional titiler parameters with `additionalProperties: true`
  - Legend configuration integrated into layer editing forms

- **Download URL Support**: 
  - Added optional `download_url` field to both folders and layers
  - Download icon display in preview mode when URL is provided
  - Form integration for editing download URLs

- **Internationalization Improvements**:
  - Comprehensive translations for English and Norwegian
  - Added missing translation keys for all new features
  - Proper useTranslation hooks integration across components

### Changed
- **Form Data Optimization**: Moved static form data objects outside components to prevent unnecessary re-renders
- **Legend Type Naming**: Renamed "sequential" to "linear" for better semantic clarity
- **Schema Structure**: Improved JSON Schema organization with proper $refs and validation rules

### Fixed
- TypeScript compilation errors in form components
- Spread operator type safety issues in schema construction
- Missing translation imports and hardcoded strings
- Form validation and error handling improvements

### Technical Improvements
- Added proper TypeScript interfaces for all new features  
- Implemented memoized options for form dropdowns
- Enhanced error handling and validation
- Improved component organization and reusability
- Better separation of concerns with dedicated schema files

## [0.0.1] - 2024-12-XX

### Added
- Initial release of NINA Maps Editor
- Basic map editing functionality
- Layer and folder management
- Vector and raster layer support
- PMTiles and Titiler integration
- Basic legend rendering for vector layers
- Internationalization framework (English/Norwegian)
- Settings management
- Import/export configuration
- React-based UI with DaisyUI components

### Features
- **Layer Management**: Add, edit, delete vector and raster layers
- **Folder Organization**: Hierarchical folder structure for layer organization
- **Map Visualization**: MapLibre GL integration with interactive maps
- **Legend System**: Basic legend rendering for vector fill layers
- **Settings**: Theme selection, language switching, titiler URL configuration
- **Forms**: Manual form implementation with validation
- **Export/Import**: JSON configuration download and upload