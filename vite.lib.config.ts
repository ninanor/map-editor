import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: false }), react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'nina-map-editor',
      formats: ['es', 'umd'],
      fileName: format => `nina-map-editor.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'React-dom',
        },
      },
    },
  },
});
