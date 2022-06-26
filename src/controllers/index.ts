const normalizedPath = require("path").join(__dirname);
let controllers: any = {}
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file: any) {
    console.log('file:', file)
    if (!file.includes("index")) {
      var moduleName = file.split(".")[0];
      controllers[moduleName] = require("./" + moduleName);
      controllers[moduleName] = require("./" + moduleName);
    }
  });

  console.log('cnt:', controllers)

  export default controllers

