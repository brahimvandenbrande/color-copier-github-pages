# Color Copier

A modern, Notion-style color conversion tool that allows you to input hex colors and get various color format conversions with easy copy functionality.

## Features

- Hex color input with real-time preview
- Color format conversions:
  - RGB (Red, Green, Blue)
  - CMYK (Cyan, Magenta, Yellow, Key/Black)
  - Pantone (approximated)
  - Color Name (via Color Pizza API)
- One-click copy functionality for all values
- Dark/Light mode toggle with persistent preference
- Responsive, full-viewport design
- Notion-inspired minimalist UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the CSS:
```bash
npm run build
```

3. For development with hot-reload:
```bash
npm run dev
```

## Usage

1. Enter a hex color code in the input field (with or without the # prefix)
2. View the color preview and conversions
3. Click on any value to copy it to your clipboard
4. Toggle between dark and light modes using the moon icon

## Technologies Used

- HTML5
- JavaScript (ES6+)
- TailwindCSS
- Color Pizza API for color names

## Development

The project structure is organized as follows:

```
color-copier/
├── src/
│   ├── app.js          # Main JavaScript logic
│   └── input.css       # Tailwind CSS input file
├── dist/
│   └── output.css      # Generated CSS file
├── index.html          # Main HTML file
├── package.json        # Project dependencies
└── tailwind.config.js  # Tailwind configuration
```

## License

MIT
