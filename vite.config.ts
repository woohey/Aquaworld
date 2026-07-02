import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// build-tag: v0.11-grid-2026-07-01-fix-deploy
export default defineConfig({
  base: '/Aquaworld/',
  plugins: [react()],
});
