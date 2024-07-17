import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@events-service/server': path.resolve(__dirname, '../server/src'),
    }
  },
});
