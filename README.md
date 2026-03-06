# Map Editor

A powerful, React-based map viewer and editor built with MapLibre GL. This application provides an intuitive interface for creating, managing, and visualizing geospatial data with support for modern cloud-optimized formats.

## 🌟 Key Features

### Core Functionality

- **Interactive Map Editor**: Create and edit maps with an intuitive drag-and-drop interface
- **Layer Management**: Organize map layers in a hierarchical folder structure
- **Real-time Preview**: See changes instantly as you build your maps
- **Configuration-driven**: Define entire map configurations using JSON files

### Data Support

- **PMTiles**: Native support for cloud-optimized vector tiles
- **Cloud Optimized GeoTIFF (COG)**: Efficient raster data handling
- **TiTiler Integration**: Advanced raster processing and styling
- **Vector Data**: Full MapLibre GL vector layer support

### Customization & Styling

- **Multiple Themes**: Built-in theme support with customizable styling
- **Layer Styling**: Visual styling controls for vector and raster layers
- **Color Management**: Advanced color picker and colormap support
- **Legend Generation**: Automatic legend creation for all layer types

### User Experience

- **Multi-language Support**: Built-in internationalization (i18n)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Basemap Selection**: Choose from various basemap providers
- **Geocoding**: Built-in location search functionality
- **Markdown Support**: Rich text descriptions using MDX

### Technical Features

- **Docker Support**: Easy deployment with included Docker configuration
- **Modern Stack**: Built with React 19, TypeScript, and Vite

## 📋 Requirements

- Node.js 18+
- pnpm (recommended) or npm
- Modern web browser with WebGL support

## 🚀 Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Mapping**: MapLibre GL, React Map GL
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: Zustand
- **Routing**: TanStack Router
- **Forms**: React JSON Schema Form, TanStack Form
- **UI Components**: Headless UI, FontAwesome
- **Data Fetching**: TanStack Query, Axios

## 📦 Installation & Setup

### Prerequisites

Install `pnpm` (recommended for faster installs):

```bash
npm install -g pnpm
```

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nina-maps
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm run dev
   ```

4. **Open your browser**
   Follow the terminal instructions to open the application (typically `http://localhost:5173`)

### Other Commands

- **Build for production**: `pnpm run build`
- **Preview production build**: `pnpm run preview`
- **Format code**: `pnpm run format`
- **Lint code**: `pnpm run lint`

### Development Guidelines

#### Import Aliases

The project uses path aliases to simplify imports. You can use `@/` to reference the `src/` directory:

```typescript
// Instead of relative imports
import { useAppStore } from "../../../hooks/app";

// Use the @ alias
import { useAppStore } from "@/hooks/app";
```

This makes imports cleaner and easier to refactor. The alias is configured in:

- `tsconfig.app.json` - For TypeScript path resolution
- `vite.config.ts` - For Vite bundler resolution

## ⚙️ Configuration

The Map Editor uses JSON configuration files to define map structure, layers, and settings.

### Configuration Structure

Place your configuration files in the `public/maps/` directory. Each map should have its own folder with a `config.json` file.

```
public/
├── maps/
│   ├── example/
│   │   └── config.json
│   └── your-map/
│       └── config.json
└── editor/
    └── config.json (default editor config)
```

### Basic Configuration Example

```json
{
  "id": "my-map",
  "title": "My Map Title",
  "subtitle": "Map description",
  "baseMap": "positron",
  "viewState": {
    "longitude": 10,
    "latitude": 63,
    "zoom": 4
  },
  "items": {
    "root": {
      "name": "Layers",
      "type": "folder",
      "children": ["layer1"]
    },
    "layer1": {
      "name": "My Layer",
      "type": "layer",
      "description": "Layer description in **Markdown**",
      "layer": {
        "type": "vector",
        "pmtiles": {
          "url": "https://example.com/data.pmtiles"
        }
      }
    }
  },
  "config": {
    "theme": "nina",
    "language": "en",
    "titiler_api_url": "/titiler"
  }
}
```

### Layer Types

#### Vector Layers (PMTiles)

```json
{
  "type": "vector",
  "pmtiles": {
    "url": "https://example.com/vector-data.pmtiles"
  },
  "children": {
    "source-layer": "layer-name",
    "type": "fill",
    "legend": {
      "field": "property_name",
      "values": [
        {
          "value": "category1",
          "color": "#ff0000",
          "opacity": 0.8,
          "description": "Category 1"
        }
      ]
    }
  }
}
```

#### Raster Layers (COG with TiTiler)

```json
{
  "type": "raster",
  "titiler": {
    "url": "https://example.com/raster-data.tif",
    "rescale": ["0,100"],
    "colormap_name": "viridis"
  },
  "legend": {
    "type": "linear",
    "colormap_name": "viridis"
  }
}
```

### Configuration Options

- **id**: Unique map identifier
- **title/subtitle**: Display names for the map
- **baseMap**: Base map style (`positron`, `dark-matter`, etc.)
- **viewState**: Initial map view (longitude, latitude, zoom)
- **items**: Layer hierarchy and definitions
- **config**: Global settings (theme, language, API URLs)

## 🐳 Docker Deployment

The application includes Docker support for easy deployment:

```bash
# Build the Docker image
docker compose build

# Run with Docker Compose
docker compose up -d
```

The Docker setup includes nginx configuration for production deployment.

## 🛠️ Development

### Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── libs/               # Utility libraries
├── pages/              # Page components
├── routes/             # TanStack Router routes
├── rjsf/              # JSON Schema Form components
└── types.ts           # TypeScript definitions
```

### Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/my-feature`
3. **Make your changes** and ensure they follow the existing code style
4. **Run tests and linting**: `pnpm run lint`
5. **Commit your changes**: `git commit -m "feat: add my feature"`
6. **Push to your fork**: `git push origin feature/my-feature`
7. **Create a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use Prettier for code formatting: `pnpm run format`
- Write meaningful commit messages

## 📝 Important Notes

- **TiTiler Dependency**: Raster rendering requires a TiTiler instance. Deploy your own or use a public instance.
- **CORS Configuration**: Ensure your data URLs are accessible from your domain.
- **File Formats**: Only Cloud Optimized formats (PMTiles, COG) are supported for optimal performance.

## 🤝 Support

For issues and questions:

- Create an issue on GitHub
- Check the existing documentation
- Review the example configurations in `public/maps/`
