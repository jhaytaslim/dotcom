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
    requirementCount: 2
};
var passwordComplexityOptions = function () {
    return joi_password_complexity_1.default(complexityOptions);
};
function validateRegister(body) {
    var schema = joi_1.default.object({
        // ValidateLength(d.Username, 6, "Username").
        // ValidateLength(d.FirstName, 2, "Firstname").
        // ValidateLength(d.LastName, 2, "Lastname").
        // ValidateLength(d.Password, 6, "Password").
        // ValidateLength(d.ConfirmPassword, 6, "Confirm_Password").
        // ValidateLength(d.ReferrerID, 9, "Referral_Code").
        // ValidatePassword(d.Password, d.ConfirmPassword).
        username: joi_1.default.string().min(6).required(),
        firstName: joi_1.default.string().min(2).required(),
        lastName: joi_1.default.string().min(2).required(),
        password: passwordComplexityOptions().required(),
        referrerID: joi_1.default.string().min(9).required(),
        confirmPassword: joi_1.default.string()
            .valid(joi_1.default.ref('password'))
            .required(),
    });
    return schema.validate(body);
}
exports.validateRegister = validateRegister;
//# sourceMappingURL=user.js.map