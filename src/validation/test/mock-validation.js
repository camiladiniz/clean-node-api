"use strict";
exports.__esModule = true;
exports.mockValidation = void 0;
var mockValidation = function () {
    var ValidationStub = /** @class */ (function () {
        function ValidationStub() {
        }
        ValidationStub.prototype.validate = function (input) {
            return null;
        };
        return ValidationStub;
    }());
    return new ValidationStub();
};
exports.mockValidation = mockValidation;
