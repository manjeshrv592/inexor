#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

/**
 * Script to remove all console.log statements from the codebase
 */

function removeConsoleLogs(content: string): string {
  // Match console.log statements - handles multi-line and various formats
  // This regex matches:
  // - console.log("...");
  // - console.log('...');
  // - console.log(...);
  // - Handles multi-l ine console.log
  const consoleLogRegex = /\s*console\.log\([^;]*\);?\n?/g;
  
  return content.replace(consoleLogRegex, '');
}

function processFile(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf-8');
  const cleaned = removeConsoleLogs(content);
  
  if (content !== cleaned) {
    fs.writeFileSync(filePath, cleaned, 'utf-8');
    console.log(`✅ Cleaned: ${filePath}`);
  }
}

function processDirectory(dir: string): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules, .next, .git directories
      if (!['.next', 'node_modules', '.git', 'dist'].includes(entry.name)) {
        processDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      // Process only TS/TSX/JS/JSX files
      if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        processFile(fullPath);
      }
    }
  }
}

// Start from src directory
const srcDir = path.join(process.cwd(), 'src');
console.log('🧹 Removing console.log statements from:', srcDir);
processDirectory(srcDir);
console.log('✨ Done!');
