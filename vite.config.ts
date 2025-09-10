import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  console.log('VITE_API_URL (process.env):', process.env.VITE_API_URL, ' loadEnv:', env.VITE_API_URL);
  return {
  plugins: [react()],
  root: resolve(__dirname, 'client'), // make root absolute
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client', 'src'),
      '@shared': resolve(__dirname, 'shared'),
      '@assets': resolve(__dirname, 'attached_assets')
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist', 'public'),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
    },
    // Only configure proxy in development
    ...(command === 'serve' ? {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:4000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    } : {})
  },
  // In production, rewrite API paths to the production URL
  ...(command === 'build' ? {
    base: '',
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || env.VITE_API_URL || '')
    }
  } : {})
  };
});

