const fs = require('./sync-fs');
const mime = require('mime-types');

module.exports = path => {
  const filePath = setFormExtensionToXLSX(path);
  const data = fs.readBinary(filePath);
  const mime = mimeTypeFor(filePath);
  return {
    content_type: mime,
    data: Buffer.from(data),
  };
};

function mimeTypeFor(fileName) {
  const extension = fs.extension(fileName);
  const mimeType = mime.lookup(extension);
  if (mimeType) {
    return mimeType;
  }
  throw new Error(`Unrecognised file extension: ${extension} for file ${fileName}`);
}

function setFormExtensionToXLSX(fileName) {
  const extension = fs.extension(fileName);
  return fileName.replace('.' + extension, '.xlsx');
}
