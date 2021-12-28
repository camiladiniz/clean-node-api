"use strict";
exports.__esModule = true;
exports.EmailValidation = void 0;
var errors_1 = require("../../presentation/errors");
var EmailValidation = /** @class */ (function () {
    function EmailValidation(fieldName, emailValidator) {
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
    }
    EmailValidation.prototype.validate = function (input) {
        var isValid = this.emailValidator.isValid(input[this.fieldName]);
        if (!isValid) {
            return new errors_1.InvalidParamError(this.fieldName);
        }
        return null;
    };
    return EmailValidation;
}());
exports.EmailValidation = EmailValidation;
