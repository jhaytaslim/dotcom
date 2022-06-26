"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var normalizedPath = require("path").join(__dirname);
var controllers = {};
require("fs")
    .readdirSync(normalizedPath)
    .forEach(function (file) {
    console.log('file:', file);
    if (!file.includes("index")) {
        var moduleName = file.split(".")[0];
        controllers[moduleName] = require("./" + moduleName);
        controllers[moduleName] = require("./" + moduleName);
    }
});
console.log('cnt:', controllers);
exports.default = controllers;
//# sourceMappingURL=index.js.map