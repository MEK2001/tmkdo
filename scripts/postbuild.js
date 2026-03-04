// Post-build script to restructure OpenNext output for Cloudflare Pages
const fs = require('fs');
const path = require('path');

const sourceDir = '.open-next';
const targetDir = '.cloudflare';

// Clean target directory
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true });
}
fs.mkdirSync(targetDir, { recursive: true });

// Copy assets to root
const assetsDir = path.join(sourceDir, 'assets');
if (fs.existsSync(assetsDir)) {
  copyRecursive(assetsDir, targetDir);
}

// Rename worker.js to _worker.js and copy to root
const workerSource = path.join(sourceDir, 'worker.js');
const workerTarget = path.join(targetDir, '_worker.js');
if (fs.existsSync(workerSource)) {
  fs.copyFileSync(workerSource, workerTarget);
}

// Copy other necessary directories
['cloudflare', 'middleware', 'server-functions', '.build'].forEach(dir => {
  const sourcePath = path.join(sourceDir, dir);
  const targetPath = path.join(targetDir, dir);
  if (fs.existsSync(sourcePath)) {
    copyRecursive(sourcePath, targetPath);
  }
});

// Copy posts.json from public/api to cloudflare/api so it's served as a static asset
const postsApiSource = path.join('public', 'api');
const postsApiTargetDir = path.join(targetDir, 'api');
if (fs.existsSync(postsApiSource)) {
  if (!fs.existsSync(postsApiTargetDir)) {
    fs.mkdirSync(postsApiTargetDir, { recursive: true });
  }
  // Copy entire /api directory (posts.json, individual post files, settings.json)
  copyRecursive(postsApiSource, postsApiTargetDir);
  console.log('✅ Copied entire /api directory to Cloudflare output (posts.json, individual posts, settings.json)');
}

// Create _routes.json to properly route static assets
const routesConfig = {
  version: 1,
  include: ['/*'],
  exclude: [
    '/_next/static/*',
    '/images/*',
    '/api/posts.json',
    '/api/settings.json',
    '/api/posts/*',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.json',
    '/*.png',
    '/*.jpg',
    '/*.jpeg',
    '/*.svg',
    '/*.ico',
    '/*.css',
    '/*.js'
  ]
};

fs.writeFileSync(
  path.join(targetDir, '_routes.json'),
  JSON.stringify(routesConfig, null, 2)
);

console.log('✅ Restructured OpenNext output for Cloudflare Pages');
console.log('✅ Generated _routes.json for static asset handling');
console.log(`📁 Deploy directory: ${targetDir}`);

// Helper function to copy directories recursively
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
