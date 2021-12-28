"use strict";
exports.__esModule = true;
exports.mockEmailValidator = void 0;
var mockEmailValidator = function () {
    var EmailValidatorStub = /** @class */ (function () {
        function EmailValidatorStub() {
        }
        EmailValidatorStub.prototype.isValid = function (email) {
            return true;
        };
        return EmailValidatorStub;
    }());
    return new EmailValidatorStub();
};
exports.mockEmailValidator = mockEmailValidator;
