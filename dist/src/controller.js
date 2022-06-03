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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var nanoid_1 = require("nanoid");
var package_json_1 = require("../package.json");
var data_1 = require("./utils/data");
var utils_1 = require("./utils");
var validate_1 = require("./utils/validate");
var router = express_1.default.Router();
var convertObjectToArray = function (object) {
    return __spreadArray([], Object.values(object));
};
router.get('/', function (_, res) {
    return res.send("Server is up and running version " + package_json_1.version);
});
router.post('/register', function (req, res, next) {
    try {
        var result = void 0;
        var error = validate_1.validateRegister(req.body).error;
        if (error)
            return utils_1.JsonResponse(res, 400, error.details[0].message);
        //validate username for badWords
        var userWithBadWord = convertObjectToArray(data_1.badWords).find(function (item) { return req.body.username.indexOf(item.value) !== -1; });
        if (userWithBadWord)
            return utils_1.JsonResponse(res, 400, "Username cannot contain " + userWithBadWord.value);
        //validate username for badWords
        var userExisting = convertObjectToArray(data_1.users).find(function (item) { return req.body.username == item.username; });
        if (userExisting)
            return utils_1.JsonResponse(res, 400, 'Word already exists');
        // suggest usernames
        var _id = nanoid_1.nanoid();
        data_1.users[_id] = __assign(__assign({}, req.body), { _id: _id });
        res.send({
            data: convertObjectToArray(data_1.users),
            msg: 'User added successfully'
        });
        return next();
    }
    catch (err) {
    }
});
router.post('/words/add', function (req, res, next) {
    try {
        var word_1 = req.body.word;
        var existing = convertObjectToArray(data_1.badWords).find(function (item) { return item.value == word_1; });
        if (existing)
            return utils_1.JsonResponse(res, 400, 'Word already exists');
        var _id = nanoid_1.nanoid();
        data_1.badWords[_id] = { value: word_1, _id: _id };
        return utils_1.JsonResponse(res, 400, 'Word added successfully', data_1.badWords[_id]);
    }
    catch (err) {
        return utils_1.JsonResponse(res, 500, 'Server Error');
    }
});
router.get('/words', function (req, res, next) {
    try {
        return utils_1.JsonResponse(res, 200, "Resource fetched successfully", convertObjectToArray(data_1.badWords));
    }
    catch (err) {
        return utils_1.JsonResponse(res, 500, 'Server Error');
    }
});
router.delete('/words/:wordId', function (req, res, next) {
    try {
        var _id = req.params.wordId;
        delete data_1.badWords[_id];
        return utils_1.JsonResponse(res, 200, "word deleted successfully");
    }
    catch (err) {
        return utils_1.JsonResponse(res, 500, 'Server Error');
    }
});
exports.default = router;
//# sourceMappingURL=controller.js.map