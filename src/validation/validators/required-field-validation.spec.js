"use strict";
exports.__esModule = true;
var errors_1 = require("../../presentation/errors");
var required_field_validation_1 = require("./required-field-validation");
var makeSut = function () {
    return new required_field_validation_1.RequiredFieldValidation('field');
};
describe('RequiredField Validation', function () {
    test('Should return a MissingParamError if a validation fails', function () {
        var sut = makeSut();
        var error = sut.validate({ name: 'any_name' });
        expect(error).toEqual(new errors_1.MissingParamError('field'));
    });
    test('Should not return if validation succeeds', function () {
        var sut = makeSut();
        var error = sut.validate({ field: 'any_name' });
        expect(error).toBeFalsy();
    });
});
