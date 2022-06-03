"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
var joi_1 = __importDefault(require("joi"));
var joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
var complexityOptions = {
    min: 6,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2
};
var passwordComplexityOptions = function () {
    return joi_password_complexity_1.default(complexityOptions);
};
function validateRegister(body) {
    var schema = joi_1.default.object({
        username: passwordComplexityOptions().required(),
        name: joi_1.default.string().optional()
    });
    return schema.validate(body);
}
exports.validateRegister = validateRegister;
//# sourceMappingURL=validate.js.map