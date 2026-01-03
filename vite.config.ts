import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
const env = loadEnv('', process.cwd(), '');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    host: 'localhost',
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
  define: {
    // ✅ SECURITY FIX: Only expose non-sensitive vars via import.meta.env
    // ❌ NEVER: Expose API keys here (e.g., VITE_GEMINI_API_KEY)
    // API calls should go through backend proxy on /api/gemini
    __VITE_APP_VERSION__: JSON.stringify(env.npm_package_version || '0.1.0'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
});
