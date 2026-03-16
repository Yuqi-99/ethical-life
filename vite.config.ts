import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// @ts-expect-error missing types
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), eslint()],
});
