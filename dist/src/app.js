"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var logger_1 = __importDefault(require("./utils/logger"));
var package_json_1 = require("../package.json");
var controller_1 = __importDefault(require("./controller"));
var startup_1 = require("./startup");
var port = config_1.default.get('port');
var host = config_1.default.get('host');
startup_1.app.use('/', controller_1.default);
startup_1.httpServer.listen(port, host, function () {
    logger_1.default.info("\uD83D\uDE80 Server version " + package_json_1.version + " is listening \uD83D\uDE80");
    logger_1.default.info("http://" + host + ":" + port);
});
//# sourceMappingURL=app.js.map