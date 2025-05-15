# VitePress Documentation Guide

This guide explains how to manage and organize content in your VitePress documentation.

## Folder Structure

```
docs/
├── .vitepress/
│   └── config.ts
├── guide/
│   ├── index.md
│   └── getting-started.md
├── examples/
│   ├── index.md
│   └── advanced.md
└── index.md
```

## Adding Content

### Creating New Sections

1. Create a new folder in the `docs` directory:
   ```bash
   mkdir docs/tutorials
   ```

2. Add an `index.md` file in your new folder:
   ```markdown
   # Tutorials
   
   Welcome to the tutorials section...
   ```

### Adding Pages

1. Create a new `.md` file in the appropriate folder:
   ```markdown
   # My New Page
   
   Content goes here...
   ```

2. Update the sidebar configuration in `docs/.vitepress/config.ts`:
   ```ts
   sidebar: [
     {
       text: 'Section Name',
       items: [
         { text: 'Page Title', link: '/section-name/page-name' }
       ]
     }
   ]
   ```

## Removing Content

### Removing Pages

1. Before deleting any file:
   - Remove its entry from the navigation in `docs/.vitepress/config.ts`
   - Update any internal links pointing to this page
   - Check for and update any references in other documentation pages

2. Then safely delete the file:
   ```bash
   rm docs/section-name/page-to-remove.md
   ```

### Removing Sections

1. Before deleting a folder:
   - Remove all related entries from the navigation config
   - Update cross-references in other documentation
   - Ensure no other pages link to content in this section

2. Then safely delete the folder:
   ```bash
   rm -r docs/section-name
   ```

## File Naming Conventions

- Use kebab-case for file names (e.g., `getting-started.md`, `advanced-features.md`)
- Each folder should have an `index.md` file as its main page
- Avoid spaces and special characters in file names

## Building for Production

When building for production:
- URLs will be clean and SEO-friendly
- Folder names won't be appended to file names
- Example: `/docs/guide/getting-started.md` becomes `/guide/getting-started`

### Build Commands

```bash
# Development
npm run docs:dev

# Production build
npm run docs:build

# Preview production build
npm run docs:preview
```