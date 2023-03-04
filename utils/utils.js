const fs = require('fs');
const path = require('path');

/**
 * Check folder exist
 * */
const isPathExistSync = (directoryPath, folderName, extension = '') => {
    return fs.existsSync(path.join(directoryPath, folderName + extension));
};


const cloneFile = (directoryPath, sourceFile, newFile, extension, callback = () => {
}) => {
    if(isPathExistSync(directoryPath, newFile, extension)) return;

    fs.copyFile(path.join(directoryPath, sourceFile + extension), path.join(directoryPath, newFile + extension), (err) => {
        console.log(err);
        if(err){
            callback(false);
            return;
        }
        callback(true);
    });
};

module.exports = {
    isPathExistSync,
    cloneFile
};