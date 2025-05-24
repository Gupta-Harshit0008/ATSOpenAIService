const multer = require('multer');
const fs = require('fs'); // Import the 'fs' module for synchronous functions
const { promises: fsp } = fs; // Alias fs.promises for clarity (optional)
const pdf = require('pdf-parse'); // Import pdf-parse

// Ensure the 'uploads' directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) { // Use fs.existsSync from the 'fs' module
    fs.mkdirSync(uploadsDir);
}

// Configure multer storage for disk
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

// Create the multer upload middleware
exports.upload = multer({ storage: storage });

// Modified uploadFunctionality to read PDF and pass text to next middleware
exports.uploadFunctionality = async (req, res, next) => {
    if (req.file) {
        console.log('Uploaded file:', req.file);
        try {
            const pdfBuffer = await fsp.readFile(req.file.path); // Use fsp (fs.promises) for async
            const pdfData = await pdf(pdfBuffer);
            req.body.resumeText = pdfData.text;  // Add extracted text to req.body
            next(); // Pass control to the next middleware/route handler
        } catch (error) {
            console.error('Error reading PDF:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to read PDF' });
        }
    } else {
        res.status(400).json({ status: 'error', message: 'No file uploaded.' });
    }
};