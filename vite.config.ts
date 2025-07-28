import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// @ts-ignore - obfuscit doesn't have TypeScript declarations
import Obfuscit from 'obfuscit'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    Obfuscit({
      length: 6, // Random class name length
      prefix: 'srn-', // Optional prefix for classes
      suffix: '' // Optional suffix for classes
    })
  ],
  build: {
    lib: {
      entry: './src/main-widget.ts',
      name: 'AurioWidget',
      fileName: 'widget',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'widget.css'
          }
          return '[name]-[hash][extname]'
        }
      }
    }
  },

})
