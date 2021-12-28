"use strict";
exports.__esModule = true;
exports.RequiredFieldValidation = void 0;
var errors_1 = require("../../presentation/errors");
var RequiredFieldValidation = /** @class */ (function () {
    function RequiredFieldValidation(fieldName) {
        this.fieldName = fieldName;
    }
    RequiredFieldValidation.prototype.validate = function (input) {
        if (!input[this.fieldName]) {
            return new errors_1.MissingParamError(this.fieldName);
        }
        return null;
    };
    return RequiredFieldValidation;
}());
exports.RequiredFieldValidation = RequiredFieldValidation;
