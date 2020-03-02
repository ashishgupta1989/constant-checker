const walk    = require('walk');
const _ = require('lodash')
let files   = [];
const scanFolder = process.env.scanFolder || './'
const fileContains = process.env.fileContains || ''
const sourceFolderPath = process.env.sourceFolderPath || './'
// Walker options
const walker  = walk.walk(sourceFolderPath, { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    if(stat.name.indexOf(fileContains) > -1 && root.indexOf(scanFolder) > -1) {
        files.push(root + '/' + stat.name);
    }
    next();
});

walker.on('end', function() {
    try {
        let fileDataMap = []
        let collatedConstants = [];
        let duplicateConstants = []
        files.forEach((file) => {
            const constants = require(file);
            fileDataMap.push({
                file,
                constants: Object.keys(constants.default || constants)
            })
            collatedConstants = collatedConstants.concat(Object.keys(constants.default || constants))
        })
        duplicateConstants = _(collatedConstants)
        .countBy()
        .reduce((acc, val, key) => val > 1 ? acc.concat(key) : acc, [])
        .map((constant) => {
            return {
                constant,
                files: fileDataMap.filter(fileData => fileData.constants.indexOf(constant) > -1).map((fileData => fileData.file))
            }
        })
        console.log(duplicateConstants)
        return duplicateConstants.length === 0
    } catch (e) {
        throw e
    }
});