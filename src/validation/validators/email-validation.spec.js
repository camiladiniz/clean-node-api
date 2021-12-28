"use strict";
exports.__esModule = true;
var email_validation_1 = require("./email-validation");
var errors_1 = require("../../presentation/errors");
var test_1 = require("@/validation/test");
var makeSut = function () {
    var emailValidatorStub = test_1.mockEmailValidator();
    var sut = new email_validation_1.EmailValidation('email', emailValidatorStub);
    return {
        sut: sut,
        emailValidatorStub: emailValidatorStub
    };
};
describe('Email Validation', function () {
    test('Should return an error if EmailValidator returns false', function () {
        var _a = makeSut(), sut = _a.sut, emailValidatorStub = _a.emailValidatorStub;
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
        var error = sut.validate({ email: 'any_email@mail.com' });
        expect(error).toEqual(new errors_1.InvalidParamError('email'));
    });
    // validar se o email validator será chamado com o mesmo e-mail passado ao email validation
    test('Should call EmailValidator with correct email', function () {
        var _a = makeSut(), sut = _a.sut, emailValidatorStub = _a.emailValidatorStub;
        var isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
        sut.validate({ email: 'any_email@mail.com' });
        expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
    });
    test('Should throw if EmailValidator throws', function () {
        var _a = makeSut(), sut = _a.sut, emailValidatorStub = _a.emailValidatorStub;
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(function () {
            throw new Error();
        });
        // o erro deve ser repassado pq essa classe não quer tratar a exceção. dá para usar esse toThrow pq o validate é um método sincrono
        expect(sut.validate).toThrow();
    });
});
