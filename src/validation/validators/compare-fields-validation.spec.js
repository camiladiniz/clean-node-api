"use strict";
exports.__esModule = true;
var compare_fields_validation_1 = require("./compare-fields-validation");
var errors_1 = require("../../presentation/errors");
var makeSut = function () {
    return new compare_fields_validation_1.CompareFieldsValidation('field', 'fieldToCompare');
};
describe('CompareFields Validation', function () {
    test('Should return a InvalidParamError if validation fails', function () {
        var sut = makeSut();
        var error = sut.validate({
            field: 'any_value',
            fieldToCompare: 'wrong_value'
        });
        expect(error).toEqual(new errors_1.InvalidParamError('fieldToCompare'));
    });
    test('Should not return if validation succeeds', function () {
        var sut = makeSut();
        var error = sut.validate({
            field: 'any_value',
            fieldToCompare: 'any_value'
        });
        expect(error).toBeFalsy();
    });
});
