# Waiting Room

An interactive "under construction" page featuring a draggable letter and envelope animation. This page is used as a redirect destination for work-in-progress tool URLs.

## Features

- **Interactive Letter Animation**: Draggable envelope with paper that can be pulled out and interacted with
- **Internationalization**: Supports English and Spanish, automatically detected from browser language
- **Responsive Design**: Adapts to different screen sizes
- **Canvas-based**: Built with React Konva for smooth animations and interactions
- **iOS Fallback**: Special fallback screen for iOS devices due to performance limitations

## Tech Stack

- **React 19** - UI framework
- **Konva & React Konva** - Canvas rendering and interactions
- **@react-spring/konva** - Physics-based animations
- **i18next** - Internationalization
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the development server at `http://localhost:5173`

### Build

```bash
npm run build
```

Builds the production-ready application to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── Letter/              # Letter and envelope components
│   ├── index.jsx        # Main letter component
│   ├── Envelope.jsx     # Envelope rendering
│   ├── Paper.jsx        # Paper content with message
│   ├── Tab.jsx          # Envelope tab
│   └── ...
├── ios-patch/           # iOS-specific fallback
├── i18n/                # Internationalization
│   └── locales/         # Translation files (en.json, es.json)
├── helpers/             # Utility functions
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

## Internationalization

The app automatically detects the user's browser language and displays content in English or Spanish. To add or modify translations, edit the JSON files in `src/i18n/locales/`.

## iOS Compatibility

Due to performance issues with the canvas-based animation on iOS devices, a special fallback page is displayed that explains the situation and suggests alternatives (desktop or Android).

## Assets

External assets are loaded from `https://assets.loscolmebrothers.com/`, including:
- Textures (paper, wood, envelope)
- Logo images
- Favicons and icons

## License

Private project for Los Colmebrothers.
