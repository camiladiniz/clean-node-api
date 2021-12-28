"use strict";
exports.__esModule = true;
var email_validator_adapter_1 = require("./email-validator-adapter");
var validator_1 = require("validator");
jest.mock('validator', function () { return ({
    isEmail: function () {
        return true;
    }
}); });
var makeSut = function () {
    return new email_validator_adapter_1.EmailValidatorAdapter();
};
describe('EmailValidator Adapter', function () {
    test('Should return false if validator returns false', function () {
        var sut = makeSut();
        jest.spyOn(validator_1["default"], 'isEmail').mockReturnValueOnce(false);
        var isValid = sut.isValid('invalid_email@mail.com');
        expect(isValid).toBe(false);
    });
    test('Should return false if validator returns true', function () {
        var sut = makeSut();
        var isValid = sut.isValid('valid_email@mail.com');
        expect(isValid).toBe(true);
    });
    test('Should call validator with correct email', function () {
        // garante que não seja passado nada estático no controller
        var sut = makeSut();
        var isEmailSpy = jest.spyOn(validator_1["default"], 'isEmail');
        sut.isValid('any_email@mail.com');
        expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
    });
});
