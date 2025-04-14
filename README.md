# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Environment Configuration

The application includes a configuration system with sensible defaults, so you can start coding immediately without any setup. To customize the configuration:

1. Copy `.env.example` to `.env`
2. Modify the variables you want to change
3. Add `.env` to your `.gitignore`

Access the configuration in your code:
```javascript
import { env } from './config/env'

// Example usage
console.log(env.appName)
console.log(env.apiUrl)
```

See `.env.example` for a complete list of available configuration options.

## Building

To build your project run `npm build`.

If you want to build the frontend straight into the backend directory (and assuming both the frontend and the backend directories have the same parent directory), add the following snippet to `vite.config.js`:
```
export default defineConfig({
    build: {
        outDir: '../<backend-dir>/public',
        emptyOutDir: true
    }
})
```