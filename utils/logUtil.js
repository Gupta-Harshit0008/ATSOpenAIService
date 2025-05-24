const fs = require('fs'); // Import the 'fs' module for synchronous functions
const path = require('path');

const logsDir = path.join(__dirname, '..','logs'); // Create a 'logs' directory in the same directory as your index.js
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create a file stream for morgan to write logs to
const logFile = path.join(logsDir, 'access.log');
exports.accessLogStream = fs.createWriteStream(logFile, { flags: 'a' });

