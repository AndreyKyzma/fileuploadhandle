# File Upload Handler

File Upload Handler is a simple Node.js package for handling file uploads in web applications.

## Installation

You can install the package via npm:

```bash
npm install file-upload-handler
```

## Usage

```javascript
const FileUploadHandler = require('file-upload-handler');
const uploadDir = path.join(__dirname, 'uploads'); // Specify the directory where files will be uploaded
const uploadHandler = new FileUploadHandler(uploadDir);

// Example usage with Express.js
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// Middleware to handle file uploads
app.use(fileUpload());

app.post('/upload', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.file;
    const fileName = await uploadHandler.uploadFile(uploadedFile);

    res.send(`File uploaded successfully: ${fileName}`);
  } catch (err) {
    res.status(500).send(`Error uploading file: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## API

### `FileUploadHandler(uploadDir)`

Creates a new instance of the FileUploadHandler.

- `uploadDir`: The directory where files will be uploaded.

### `uploadFile(file)`

Uploads a file to the specified directory.

- `file`: The file to upload.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
