import { defineConfig } from 'vitest/config';

// This config uses node env and disables threads to avoid esbuild nuisances in WSL
export default defineConfig({
  test: {
    include: ['test/**/*.spec.ts'],
    environment: 'node',
    watch: false
  }
});