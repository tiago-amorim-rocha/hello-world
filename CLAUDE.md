# Project Template

## Overview
This is a template repository with built-in GitHub Pages deployment and cache busting for web projects.

## Features

### 1. Auto-promotion Workflow
- **File**: `.github/workflows/autopromote.yml`
- Automatically merges `claude/**` branches into `main` when pushed
- Enables seamless CI/CD workflow with Claude Code

### 2. Branch Cleanup Workflow
- **File**: `.github/workflows/cleanup-old-branches.yml`
- Runs daily at 3am UTC to delete old `claude/**` branches
- Only deletes branches older than 24 hours
- Keeps your repository clean from stale Claude Code branches
- Can be triggered manually via GitHub Actions UI

### 3. Cache Busting System
- **File**: `version.txt` - Contains timestamp for cache invalidation
- **Implementation**: `index.html` - Auto-versioned module loader
- Ensures browsers always load the latest version of modules
- Uses `?v=<timestamp>` query parameter on module imports

### 4. In-Page Debug Console
- **File**: `console.js` - Debug console module
- Floating 🐛 button in bottom-right corner
- Captures console.log, console.info, console.debug, console.warn, console.error
- Displays messages with timestamps and color coding
- Keeps last 100 messages in history
- Useful for debugging on mobile devices or when DevTools isn't available

## How It Works

### Cache Busting
The `index.html` includes a script that:
1. Fetches `version.txt` (bypassing cache)
2. Uses the version to append `?v=<version>` to module imports
3. Falls back to `Date.now()` if version.txt is unavailable

Example:
```javascript
// Loads: ./main.js?v=1761844854000
const s = document.createElement('script');
s.type = 'module';
s.src = `./main.js?v=${encodeURIComponent(version)}`;
document.head.appendChild(s);
```

### Pre-commit Hook (Recommended)
Automatically update `version.txt` on each commit by creating `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# Update version.txt with current timestamp
date +%s%3N > version.txt
git add version.txt
```

Make it executable: `chmod +x .git/hooks/pre-commit`

**Why pre-commit over post-commit?**
- Pre-commit includes the version.txt update IN the same commit
- Post-commit would require a second commit to save the version change
- Cleaner git history and ensures version.txt is always in sync

## Usage

### As a Template
1. Use this repository as a template for new projects
2. Update this CLAUDE.md with project-specific details
3. Edit `main.js` to build your application (or add more modules)
4. The cache busting and deployment workflows are ready to use

### Deployment
1. Enable GitHub Pages in repository settings
2. Set source to "Deploy from a branch" (select main branch)
3. Push to `main` to deploy

## Customization

### Update Metadata
- Change page title in `index.html`
- Update this CLAUDE.md with your project architecture

### Add Modules
The template includes `main.js` as a starter file. To add more modules:

1. Create your module file (e.g., `utils.js`)
2. Import it in `main.js`:
   ```javascript
   import { myFunction } from './utils.js';
   ```

Note: Only `main.js` needs explicit cache busting in `index.html`. Other modules imported via ES6 `import` inherit the cache-busted URL automatically.

### Debug Console
Click the 🐛 button in the bottom-right corner to open the debug console. All console output (log, info, debug, warn, error) will be captured and displayed here. This is especially useful for:
- Debugging on mobile devices
- When browser DevTools aren't available
- Quick in-page console access during development

To disable the console in production, simply remove the `console.js` import and initialization from `main.js`.

## Structure
```
.
├── .github/workflows/
│   ├── autopromote.yml           # Auto-merge claude/** branches
│   └── cleanup-old-branches.yml  # Daily cleanup of old claude branches
├── .git/hooks/
│   └── pre-commit                # Updates version.txt (create manually)
├── .gitignore                    # Git ignore patterns
├── CLAUDE.md                     # This file - project context for Claude
├── index.html                    # Entry point with cache busting
├── main.js                       # Main application module (starter file)
├── console.js                    # In-page debug console
└── version.txt                   # Build version timestamp
```
