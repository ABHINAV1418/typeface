const File = require('../models/File');
const fs = require('fs');
const path = require('path');

// Upload file
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = new File({
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            path: req.file.path
        });

        await file.save();
        res.status(201).json(file);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

// Get all files
exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ uploadDate: -1 });
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Error fetching files' });
    }
};

// Download file
exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const filePath = path.join(__dirname, '..', file.path);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found on server' });
        }

        res.download(filePath, file.originalName);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ message: 'Error downloading file' });
    }
}; 