"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectToArray = exports.SuggestWords = exports.JsonResponse = void 0;
var data_1 = require("./data");
var JsonResponse = function (res, status, msg, data, meta) {
    if (data === void 0) { data = null; }
    if (meta === void 0) { meta = null; }
    var body = {
        msg: '',
        data: null,
        meta: {
            total: 1,
            pagination: {
                pageSize: 1,
                page: 1
            }
        }
    };
    if (data) {
        body.data = data;
    }
    if (meta) {
        body.meta = meta;
    }
    else {
        delete body.meta;
    }
    if (typeof msg === 'string') {
        body.msg = msg;
    }
    res.status(status !== null && status !== void 0 ? status : 200).send(body);
    return;
};
exports.JsonResponse = JsonResponse;
var SuggestWords = function (value) {
    var arr = [];
    var i = 0;
    var _loop_1 = function () {
        var str = "" + value + (i % 2 == 0 ? i : "_" + i);
        var bad = (convertObjectToArray(data_1.badWords).find(function (item) { return str.indexOf(item.value) !== -1; }));
        if (bad == null)
            return "continue";
        arr.push(str.replace(bad.value, ''));
        i++;
        if (i === 100)
            return "break";
    };
    while (arr.length < 10) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    return arr;
};
exports.SuggestWords = SuggestWords;
var convertObjectToArray = function (object) {
    return __spreadArray([], Object.values(object));
};
exports.convertObjectToArray = convertObjectToArray;
//# sourceMappingURL=index.js.map