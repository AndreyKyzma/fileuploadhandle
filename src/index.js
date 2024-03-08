const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class FileUploadHandler {
  constructor(uploadDir) {
    this.uploadDir = uploadDir;
    this.allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Example allowed extensions
  }

  async uploadFile(file) {
    try {
      const fileExtension = path.extname(file.name);
      if (!this.allowedExtensions.includes(fileExtension)) {
        throw new Error('File type not allowed');
      }

      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(this.uploadDir, fileName);

      await file.mv(filePath);

      return fileName;
    } catch (err) {
      throw new Error(`Failed to upload file: ${err.message}`);
    }
  }
}

module.exports = FileUploadHandler;
