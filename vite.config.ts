import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// @ts-ignore - postcss-obfuscator doesn't have TypeScript declarations
import postcssObfuscator from 'postcss-obfuscator'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: {
    postcss: {
      plugins: [
        postcssObfuscator({
          enable: false,
          length: 6, // Random class name length
          classMethod: 'random', // 'random', 'simple', 'none'
          classPrefix: '', // Optional prefix for classes
          classSuffix: '', // Optional suffix for classes
          classIgnore: [], // Classes to ignore from obfuscation
          ids: false, // Don't obfuscate IDs by default
          srcPath: 'src', // Source directory
          desPath: 'dist', // Output directory
          extensions: ['.html', '.svelte'], // File extensions to process
          fresh: false, // Use existing obfuscation map for consistency
          keepData: true, // Keep obfuscation data for future builds
          formatJson: true, // Format the obfuscation map JSON
          jsonsPath: 'css-obfuscator' // Path for obfuscation map files
        })
      ]
    }
  }
})
