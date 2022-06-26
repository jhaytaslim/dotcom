"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var package_json_1 = require("../package.json");
var controllers_1 = __importDefault(require("./controllers"));
var startup_1 = require("./startup");
var data_1 = require("./utils/data");
var port = config_1.default.get('port');
var host = config_1.default.get('host');
// app.use('/', auth)
startup_1.app.use('/', controllers_1.default.auth);
startup_1.httpServer.listen(port, host, function () {
    data_1.badWords['dot'] = { value: 'dot', _id: 'dot' };
    data_1.badWords['com'] = { value: 'com', _id: 'comk' };
    console.info("\uD83D\uDE80 Server version " + package_json_1.version + " is listening \uD83D\uDE80");
    console.info("http://" + host + ":" + port);
});
//# sourceMappingURL=app.js.map