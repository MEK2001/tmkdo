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

console.log('✅ Restructured OpenNext output for Cloudflare Pages');
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
