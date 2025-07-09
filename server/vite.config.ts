import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'node18',
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        // Node.js built-ins
        'crypto',
        'fs',
        'path',
        'http',
        'https',
        'url',
        'stream',
        'util',
        'events',
        'os',
        // npm dependencies (they'll be installed in node_modules)
        'bcrypt',
        'cookie-parser',
        'cors',
        'dotenv',
        'express',
        'express-validator',
        'helmet',
        'http-status-codes',
        'jsonwebtoken',
        'mongoose',
        'morgan',
        'zod',
      ],
    },
    sourcemap: true,
  },
});
