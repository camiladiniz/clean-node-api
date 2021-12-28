"use strict";
// garantir que se algum validator interno do composite falhar, retornar erro
exports.__esModule = true;
var errors_1 = require("../../presentation/errors");
var validation_composite_1 = require("./validation-composite");
var test_1 = require("@/validation/test");
var makeSut = function () {
    var validationStubs = [test_1.mockValidation(), test_1.mockValidation()];
    var sut = new validation_composite_1.ValidationComposite(validationStubs);
    return {
        sut: sut,
        validationStubs: validationStubs
    };
};
// se nenhum composite retornar erro, queremos não retornar tambem
describe('ValidationComposite', function () {
    test('Should return an error if any validation fails', function () {
        var _a = makeSut(), sut = _a.sut, validationStubs = _a.validationStubs;
        jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new errors_1.MissingParamError('field'));
        var error = sut.validate({ field: 'any_value' });
        expect(error).toEqual(new errors_1.MissingParamError('field'));
    });
    test('Should return the first error if more than one validation fails', function () {
        var _a = makeSut(), sut = _a.sut, validationStubs = _a.validationStubs;
        jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error());
        jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new errors_1.MissingParamError('field'));
        var error = sut.validate({ field: 'any_value' });
        expect(error).toEqual(new Error());
    });
    test('Should not return if validation succeeds', function () {
        var sut = makeSut().sut;
        var error = sut.validate({ field: 'any_value' });
        expect(error).toBeFalsy();
    });
});
