const { promisify } = require('util');
const fs = require('fs');

module.exports = {
  readFileAsync: promisify(fs.readFile),
  writeFileAsync: promisify(fs.writeFile),

  // Writes a buffer to the specified filename.
  writeBuffer(buffer, filename) {
    return new Promise((resolve, reject) => {
      const wstream = fs.createWriteStream(filename);
      wstream.write(buffer, err => {
        wstream.close();

        if (err) reject(err);
        else resolve();
      });
    });
  }
};
