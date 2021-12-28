"use strict";
exports.__esModule = true;
var validators_1 = require("../../../../../validation/validators");
var login_validation_factory_1 = require("./login-validation-factory");
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
describe('LoginValidation Factory', function () {
    test('Should call ValidationComposite with all validations', function () {
        login_validation_factory_1.makeLoginValidation();
        var validations = [];
        for (var _i = 0, _a = ['email', 'password']; _i < _a.length; _i++) {
            var field = _a[_i];
            validations.push(new validators_1.RequiredFieldValidation(field));
        }
        validations.push(new validators_1.EmailValidation('email', makeEmailValidator()));
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
