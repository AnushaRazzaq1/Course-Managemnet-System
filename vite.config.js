import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#4caf50',
          'link-color': '#1890ff',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      },
    },
  },
});
