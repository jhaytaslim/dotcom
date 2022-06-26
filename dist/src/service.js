"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUsername = void 0;
var utils_1 = require("./utils");
var data_1 = require("./utils/data");
var user_1 = require("./validate/user");
var checkUsername = function (username) {
    var error = user_1.validateRegister({ username: username }).error;
    console.info("\uD83D\uDE80 badWords is/are :", error);
    if (error)
        return {
            found: false,
            data: utils_1.SuggestWords(username)
        };
    //validate username for badWords
    var userWithBadWord = (utils_1.convertObjectToArray(data_1.badWords).find(function (item) { return username.indexOf(item.value) !== -1; }));
    console.info("\uD83D\uDE80 userWithBadWord is/are :", userWithBadWord);
    if (userWithBadWord)
        return {
            found: false,
            data: utils_1.SuggestWords(username)
        };
    //validate username for badWords
    var userExisting = utils_1.convertObjectToArray(data_1.users).find(function (item) { return username == item.username; });
    console.info("\uD83D\uDE80 userExisting is/are :", userExisting);
    if (userExisting)
        return {
            found: false,
            data: utils_1.SuggestWords(username)
        };
    return {
        found: true,
        data: []
    };
};
exports.checkUsername = checkUsername;
//# sourceMappingURL=service.js.map