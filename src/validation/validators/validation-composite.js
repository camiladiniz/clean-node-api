"use strict";
exports.__esModule = true;
exports.ValidationComposite = void 0;
var ValidationComposite = /** @class */ (function () {
    function ValidationComposite(validations) {
        this.validations = validations;
    }
    ValidationComposite.prototype.validate = function (input) {
        for (var _i = 0, _a = this.validations; _i < _a.length; _i++) {
            var validation = _a[_i];
            var error = validation.validate(input);
            if (error) {
                return error;
            }
        }
        return null;
    };
    return ValidationComposite;
}());
exports.ValidationComposite = ValidationComposite;
