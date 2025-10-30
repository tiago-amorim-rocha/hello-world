# Project Template

## Overview
This is a template repository with built-in GitHub Pages deployment and cache busting for web projects.

## Features

### 1. Auto-promotion Workflow
- **File**: `.github/workflows/autopromote.yml`
- Automatically merges `claude/**` branches into `main` when pushed
- Enables seamless CI/CD workflow with Claude Code

### 2. Cache Busting System
- **File**: `version.txt` - Contains timestamp for cache invalidation
- **Implementation**: `index.html` - Auto-versioned module loader
- Ensures browsers always load the latest version of modules
- Uses `?v=<timestamp>` query parameter on module imports

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
3. Add your source files (JS modules, CSS, etc.)
4. The cache busting and deployment workflows are ready to use

### Deployment
1. Enable GitHub Pages in repository settings
2. Set source to "Deploy from a branch" (select main branch)
3. Push to `main` to deploy

## Customization

### Update Metadata
- Change page title in `index.html`
- Update this CLAUDE.md with your project architecture
- Modify README.md with user-facing documentation

### Add Modules
Reference your modules in index.html with the cache busting pattern:
```javascript
s.src = `./your-module.js?v=${encodeURIComponent(v)}`;
```

## Structure
```
.
├── .github/workflows/
│   └── autopromote.yml    # Auto-merge claude/** branches
├── .git/hooks/
│   └── pre-commit         # Updates version.txt (create manually)
├── CLAUDE.md              # This file - project context for Claude
├── README.md              # User-facing documentation
├── index.html             # Entry point with cache busting
└── version.txt            # Build version timestamp
```
