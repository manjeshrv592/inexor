#!/usr/bin/env node

/**
 * Script to verify that the build is truly static
 * Checks for any runtime API calls to Sanity
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', '.next');
const SERVER_DIR = path.join(BUILD_DIR, 'server');

function checkForRuntimeCalls(dir, results = []) {
  if (!fs.existsSync(dir)) {
    console.log('❌ Build directory not found. Run npm run build first.');
    return results;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      checkForRuntimeCalls(filePath, results);
    } else if (file.endsWith('.js') || file.endsWith('.html')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for runtime Sanity calls
      const patterns = [
        /client\.fetch\(/g,
        /sanity.*fetch/g,
        /cdn\.sanity\.io/g,
        /getServerSideProps/g,
      ];
      
      patterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          results.push({
            file: filePath.replace(BUILD_DIR, ''),
            pattern: pattern.toString(),
            count: matches.length
          });
        }
      });
    }
  });
  
  return results;
}

function main() {
  console.log('🔍 Verifying static build...\n');
  
  const runtimeCalls = checkForRuntimeCalls(SERVER_DIR);
  
  if (runtimeCalls.length === 0) {
    console.log('✅ SUCCESS: No runtime Sanity calls detected!');
    console.log('🚀 Your site is fully static and ready for deployment.\n');
    
    // Show build stats
    const buildManifest = path.join(BUILD_DIR, 'build-manifest.json');
    if (fs.existsSync(buildManifest)) {
      const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
      console.log('📊 Build Statistics:');
      console.log(`   - Pages: ${Object.keys(manifest.pages || {}).length}`);
      console.log(`   - Static files: ${Object.keys(manifest.devFiles || {}).length}`);
    }
  } else {
    console.log('⚠️  WARNING: Runtime Sanity calls detected:\n');
    
    runtimeCalls.forEach(call => {
      console.log(`   File: ${call.file}`);
      console.log(`   Pattern: ${call.pattern}`);
      console.log(`   Count: ${call.count}\n`);
    });
    
    console.log('💡 These calls may prevent full static generation.');
    console.log('   Consider moving them to build-time data fetching.\n');
  }
  
  // Check for ISR pages
  const prerenderManifest = path.join(BUILD_DIR, 'prerender-manifest.json');
  if (fs.existsSync(prerenderManifest)) {
    const manifest = JSON.parse(fs.readFileSync(prerenderManifest, 'utf8'));
    const staticPages = Object.keys(manifest.routes || {});
    const dynamicPages = Object.keys(manifest.dynamicRoutes || {});
    
    console.log('📄 Static Generation Summary:');
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Dynamic pages: ${dynamicPages.length}`);
    
    if (staticPages.length > 0) {
      console.log('\n   Static pages:');
      staticPages.forEach(page => console.log(`     - ${page}`));
    }
    
    if (dynamicPages.length > 0) {
      console.log('\n   Dynamic pages (ISR):');
      dynamicPages.forEach(page => console.log(`     - ${page}`));
    }
  }
}

main();
