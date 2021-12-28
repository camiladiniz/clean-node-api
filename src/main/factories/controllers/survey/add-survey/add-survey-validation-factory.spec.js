"use strict";
exports.__esModule = true;
var validators_1 = require("../../../../../validation/validators");
var add_survey_validation_factory_1 = require("./add-survey-validation-factory");
jest.mock('../../../../../validation/validators/validation-composite');
describe('AddSurveyValidation Factory', function () {
    test('Should call ValidationComposite with all validations', function () {
        add_survey_validation_factory_1.makeAddSurveyValidation();
        var validations = [];
        for (var _i = 0, _a = ['question', 'answers']; _i < _a.length; _i++) {
            var field = _a[_i];
            validations.push(new validators_1.RequiredFieldValidation(field));
        }
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
