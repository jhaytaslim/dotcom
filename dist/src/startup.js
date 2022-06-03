"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.app = void 0;
var http_1 = require("http");
var config_1 = __importDefault(require("config"));
var express_1 = __importDefault(require("express"));
// import cors from 'cors'
var corsOrigin = config_1.default.get('corsOrigin');
var app = express_1.default();
exports.app = app;
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
app.use(express_1.default.static('public'));
// app.use(cors({
//   origin: corsOrigin,
//   credentials: true
// }))
var httpServer = http_1.createServer(app);
exports.httpServer = httpServer;
//# sourceMappingURL=startup.js.map