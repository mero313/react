import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/MeRo_Dev/", // YOUR REPO NAME HERE
  plugins: [react()],
  
});
