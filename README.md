# Template Project

A template repository with GitHub Pages deployment and cache busting for web projects.

## Features

- **Auto-deployment** to GitHub Pages on push to main
- **Cache busting** system for reliable module updates
- **Auto-promotion** workflow for Claude Code integration

## Quick Start

1. Use this template to create a new repository
2. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
3. Add your JavaScript modules and reference them in `index.html`
4. Push to `main` to deploy

## Cache Busting

The project includes an automatic cache busting system that ensures browsers always load the latest version of your modules. See `CLAUDE.md` for technical details.

## Development

- Work on `claude/**` branches for automatic promotion to main
- Or work directly on feature branches and merge to main
- Deployment happens automatically on push to main

## License

MIT
