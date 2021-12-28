"use strict";
exports.__esModule = true;
exports.makeLoginValidation = void 0;
var validators_1 = require("../../../../../validation/validators");
var email_validator_adapter_1 = require("../../../../../utils/email-validator-adapter");
var makeLoginValidation = function () {
    var validations = [];
    for (var _i = 0, _a = ['email', 'password']; _i < _a.length; _i++) {
        var field = _a[_i];
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    validations.push(new validators_1.EmailValidation('email', new email_validator_adapter_1.EmailValidatorAdapter()));
    return new validators_1.ValidationComposite(validations);
};
exports.makeLoginValidation = makeLoginValidation;
