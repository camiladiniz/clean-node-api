"use strict";
exports.__esModule = true;
exports.makeAddSurveyValidation = void 0;
var validators_1 = require("../../../../../validation/validators");
var makeAddSurveyValidation = function () {
    var validations = [];
    for (var _i = 0, _a = ['question', 'answers']; _i < _a.length; _i++) {
        var field = _a[_i];
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    return new validators_1.ValidationComposite(validations);
};
exports.makeAddSurveyValidation = makeAddSurveyValidation;
