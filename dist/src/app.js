"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var package_json_1 = require("../package.json");
var controller_1 = __importDefault(require("./controller"));
var startup_1 = require("./startup");
var port = config_1.default.get('port');
var host = config_1.default.get('host');
startup_1.app.use('/', controller_1.default);
startup_1.httpServer.listen(port, host, function () {
    console.info("\uD83D\uDE80 Server version " + package_json_1.version + " is listening \uD83D\uDE80");
    console.info("http://" + host + ":" + port);
});
//# sourceMappingURL=app.js.map