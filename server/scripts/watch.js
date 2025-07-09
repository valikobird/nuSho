#!/usr/bin/env node

import { spawn } from 'child_process';
import { watch } from 'fs';
import { resolve } from 'path';

const srcDir = resolve('src');
let child;

function startServer() {
  if (child) {
    child.kill();
  }

  child = spawn('vite-node', ['src/index.ts'], {
    stdio: 'inherit',
  });

  child.on('close', (code) => {
    if (code !== null && code !== 0) {
      console.log(`Server process exited with code ${code}`);
    }
  });
}

// Start the server initially
startServer();

// Watch for changes
const watcher = watch(srcDir, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.ts') || filename.endsWith('.js'))) {
    console.log(`File changed: ${filename}`);
    startServer();
  }
});

// Cleanup on exit
process.on('SIGINT', () => {
  if (child) {
    child.kill();
  }
  watcher.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  if (child) {
    child.kill();
  }
  watcher.close();
  process.exit(0);
});
