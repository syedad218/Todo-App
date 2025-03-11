// Script to prepare environment for Netlify build
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

// Create .env file with correct API URL for production
const envContent = `
REACT_APP_API_URL=/api
`;

fs.writeFileSync(path.join(rootDir, ".env"), envContent);
console.log("Created .env file for production build");

// Ensure netlify/functions directory exists
const functionsDir = path.join(rootDir, "netlify", "functions");
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
  console.log("Created netlify/functions directory");
}

// Copy sample db if needed
const sampleDbPath = path.join(rootDir, "db.json.sample");
const dbPath = path.join(rootDir, "db.json");
if (!fs.existsSync(dbPath) && fs.existsSync(sampleDbPath)) {
  fs.copyFileSync(sampleDbPath, dbPath);
  console.log("Copied sample db.json");
}

console.log("Prebuild setup completed successfully");
