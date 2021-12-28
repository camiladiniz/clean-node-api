"use strict";
exports.__esModule = true;
var validators_1 = require("../../../../../validation/validators");
var signup_validation_factory_1 = require("./signup-validation-factory");
jest.mock('../../../../../validation/validators/validation-composite');
var makeEmailValidator = function () {
    var EmailValidatorStub = /** @class */ (function () {
        function EmailValidatorStub() {
        }
        EmailValidatorStub.prototype.isValid = function (email) {
            return true;
        };
        return EmailValidatorStub;
    }());
    return new EmailValidatorStub();
};
// garntir que qnd o metodo makeSignUpValidation o metodo validation composite seja chamado passando as instancias desejadas
// como estamos no mainlayer e n estamos injetando dependencias no construtor é mais chato pq estamos querendo testar um modulo do composite
describe('SignUpValidation Factory', function () {
    test('Should call ValidationComposite with all validations', function () {
        signup_validation_factory_1.makeSignUpValidation();
        var validations = [];
        for (var _i = 0, _a = ['name', 'email', 'password', 'passwordConfirmation']; _i < _a.length; _i++) {
            var field = _a[_i];
            validations.push(new validators_1.RequiredFieldValidation(field));
        }
        validations.push(new validators_1.CompareFieldsValidation('password', 'passwordConfirmation'));
        validations.push(new validators_1.EmailValidation('email', makeEmailValidator()));
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
