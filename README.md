# icon-pnger

Generate PNG icons from any Iconify icon set in multiple sizes. Perfect for browser extensions, desktop apps, or any project needing multiple icon sizes.

## Features

- 🎨 Support for all Iconify icon sets
- 📏 Generate multiple sizes in one command
- 🎯 Perfect for browser extensions
- 🎨 Customizable colors
- 📁 Configurable output directory
- 🚀 Both CLI and programmatic usage

## Installation

```bash
# Install globally
npm install -g icon-pnger

# Or use with npx
npx icon-pnger
```

## Usage

### Command Line

```bash
# Basic usage
npx icon-pnger -s ph -n detective

# Specify output directory
npx icon-pnger -s ph -n detective -o public/icons

# Custom sizes
npx icon-pnger -s ph -n detective -z 16,32,64,256

# Custom color
npx icon-pnger -s ph -n detective -c "#FF0000"
```

Options:
- `-s, --icon-set`: Icon set prefix (e.g., 'ph' for Phosphor) (required)
- `-n, --icon-name`: Name of the icon (required)
- `-o, --output-dir`: Output directory (default: 'icons')
- `-z, --sizes`: Comma-separated list of sizes (default: '16,32,48,128')
- `-c, --color`: Icon color (default: 'currentColor')

### Programmatic Usage

```javascript
import generateIcons from 'icon-pnger';

// Basic usage
await generateIcons({
  iconSet: 'ph',
  iconName: 'detective'
});

// With all options
await generateIcons({
  iconSet: 'ph',
  iconName: 'detective',
  outputDir: 'public/icons',
  sizes: [16, 32, 48, 128],
  color: '#000000'
});
```

## Supported Icon Sets

This package supports all icon sets available in the Iconify collection. Some popular sets include:

- `ph`: Phosphor Icons
- `mdi`: Material Design Icons
- `fa`: Font Awesome
- `bi`: Bootstrap Icons
- `ci`: Coolicons

View all available icons at [Iconify Icon Sets](https://icon-sets.iconify.design/).

## API Reference

### IconConfig

```typescript
interface IconConfig {
  /** The icon set prefix (e.g., 'ph' for Phosphor) */
  iconSet: string;
  /** The name of the icon (e.g., 'detective') */
  iconName: string;
  /** Relative path to output directory from workspace root */
  outputDir?: string;
  /** Array of sizes to generate */
  sizes?: number[];
  /** Color of the icon */
  color?: string;
}
```

### generateIcons(config: IconConfig): Promise<string[]>

Generates PNG icons based on the provided configuration. Returns an array of generated file paths.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Development

1. Clone the repository
```bash
git clone https://github.com/DhavalW/icon-pnger.git
cd icon-pnger
```

2. Install dependencies
```bash
npm install
```

3. Build
```bash
npm run build
```

4. Test locally
```bash
npm start
```

## License

MIT 