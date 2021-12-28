"use strict";
exports.__esModule = true;
exports.CompareFieldsValidation = void 0;
var errors_1 = require("../../presentation/errors");
var CompareFieldsValidation = /** @class */ (function () {
    function CompareFieldsValidation(fieldName, fieldToCompareName) {
        this.fieldName = fieldName;
        this.fieldToCompareName = fieldToCompareName;
    }
    CompareFieldsValidation.prototype.validate = function (input) {
        if (input[this.fieldName] !== input[this.fieldToCompareName]) {
            return new errors_1.InvalidParamError(this.fieldToCompareName);
        }
        return null;
    };
    return CompareFieldsValidation;
}());
exports.CompareFieldsValidation = CompareFieldsValidation;
