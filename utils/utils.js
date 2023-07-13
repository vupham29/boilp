const fs = require('fs');
const path = require('path');

/**
 * Check folder exist
 * */
const isPathExistSync = (directoryPath, folderName, extension = '') => {
    if(!folderName && !extension) return fs.existsSync(directoryPath);
    return fs.existsSync(path.join(directoryPath, folderName + extension));
};


/**
 * Clone file
 * */
const cloneFile = ({
                       source = '',
                       destination = '',
                       callback = () => {
                       }
                   }) => {
    if(isPathExistSync(destination)) return;
    fs.copyFile(source, destination, (err) => {
        if(err){
            callback(false);
            return;
        }
        callback(true);
    });
};


/**
 * Create Directory
 * */
const createDirectory = (path) => {
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
};


/**
 * String to slug
 * */
const stringToSlug = (string) => {
    if(!string) return '';
    return string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        .toLowerCase();
};

module.exports = {
    isPathExistSync,
    cloneFile,
    createDirectory,
    stringToSlug
};

module.exports = {
    isPathExistSync,
    cloneFile,
    createDirectory
};