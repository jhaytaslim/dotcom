"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestWords = exports.JsonResponse = void 0;
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
    for (var i = 0; i < 20; i++) {
        arr.push("" + value + (i % 2 == 0 ? i : "_" + i));
    }
};
exports.SuggestWords = SuggestWords;
//# sourceMappingURL=index.js.map