import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively get all .jsx files
function getJsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getJsxFiles(filePath, fileList);
    } else if (file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Function to update font classes in a file
function updateFontClasses(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace font family classes
  content = content.replace(/font-raleway/g, 'font-inter');
  content = content.replace(/font-khula/g, 'font-inter');
  content = content.replace(/font-lato/g, 'font-inter');
  content = content.replace(/font-cinzel/g, 'font-inter');
  
  // Update placeholder font references
  content = content.replace(/placeholder:font-raleway/g, 'placeholder:font-inter');
  content = content.replace(/placeholder:font-khula/g, 'placeholder:font-inter');
  content = content.replace(/placeholder:font-lato/g, 'placeholder:font-inter');
  content = content.replace(/placeholder:font-cinzel/g, 'placeholder:font-inter');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

// Main execution
const componentsDir = path.join(__dirname, '..');
const jsxFiles = getJsxFiles(componentsDir);

jsxFiles.forEach(file => {
  try {
    updateFontClasses(file);
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
});

console.log('Font update complete!'); 