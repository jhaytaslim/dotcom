"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var nanoid_1 = require("nanoid");
var package_json_1 = require("../../package.json");
var data_1 = require("../utils/data");
var utils_1 = require("../utils");
var service_1 = require("../service");
var user_1 = require("../validate/user");
var router = express_1.default.Router();
router.get('/', function (_, res) {
    return res.send("Server is up and running version " + package_json_1.version);
});
router.post('/register', function (req, res, next) {
    try {
        var error = user_1.validateRegister(req.body).error;
        if (error)
            return utils_1.JsonResponse(res, 400, error.details[0].message);
        // send body to service
        var result = service_1.checkUsername(req.body.username);
        if (result.found === false) {
            result = {
                found: false,
                data: utils_1.SuggestWords(req.body.username)
            };
            return utils_1.JsonResponse(res, 400, 'username invalid', result);
        }
        var _id = nanoid_1.nanoid();
        data_1.users[_id] = __assign(__assign({}, req.body), { _id: _id });
        return utils_1.JsonResponse(res, 200, "User added successfully");
    }
    catch (err) {
        return utils_1.JsonResponse(res, 500, 'Server Error');
    }
});
router.get('/verify/stripe', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var stripe, verificationSession, clientSecret, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd');
                return [4 /*yield*/, stripe.identity.verificationSessions.create({
                        type: 'document',
                        return_url: 'https://www.google.com',
                        metadata: {
                            user_id: 'taslim'
                        },
                        options: {
                            document: {
                                allowed_types: ['id_card', 'driving_license']
                            }
                        }
                    })
                    // Return only the client secret to the frontend.
                ];
            case 1:
                verificationSession = _a.sent();
                clientSecret = { client_secret: verificationSession.client_secret,
                };
                return [2 /*return*/, utils_1.JsonResponse(res, 200, 'Word added successfully', verificationSession)];
            case 2:
                err_1 = _a.sent();
                console.info("\uD83D\uDE80 Error: " + err_1 + " ");
                return [2 /*return*/, utils_1.JsonResponse(res, 500, 'Server Error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=auth.js.map