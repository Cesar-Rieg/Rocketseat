const fs = require("fs");
const path = require("path");
const UploadConfig = require("../configs/FileUpload.js");

class DiskStorage {
    async SaveFile(file){
        await fs.promises.rename(
            path.resolve(UploadConfig.TEMP_FOLDER, file),
            path.resolve(UploadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    async DeleteFile(file){
        const filePath = path.resolve(UploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        }
        catch {
            return;
        }

        return fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;
