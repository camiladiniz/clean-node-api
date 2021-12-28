"use strict";
exports.__esModule = true;
exports.EmailValidatorAdapter = void 0;
var validator_1 = require("validator");
var EmailValidatorAdapter = /** @class */ (function () {
    function EmailValidatorAdapter() {
    }
    EmailValidatorAdapter.prototype.isValid = function (email) {
        return validator_1["default"].isEmail(email);
    };
    return EmailValidatorAdapter;
}());
exports.EmailValidatorAdapter = EmailValidatorAdapter;
