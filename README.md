# constant-checker
A utility tool to check repeating constants in a folder

### Installation:


```bash
$ v1.0.4
npm install constant-checker
```

### What will setup code look like?

```js
// Load the build.
const findDuplicateConstants = require('constant-checker');

// Load path module to send absolute path of source 
const path = require('path');

findDuplicateConstants(scanFolder, fileContains, sourceFolderPath)
```

## Params

| name | description |
| --- | --- |
| scanFolder | sub folder name which you want to scan |
| fileContains | any keyword which a file should contains to be used while searching |
| sourceFolderPath | Absolute path of source folder |

> Note: You need to provide absolute path of source Folder in sourceFolderPath. Use path module ex. path.join(__dirname, './xyz) to get absolute path
