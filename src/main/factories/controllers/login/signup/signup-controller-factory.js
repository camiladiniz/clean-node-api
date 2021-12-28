"use strict";
exports.__esModule = true;
exports.makeSignUpController = void 0;
var signup_controller_1 = require("../../../../../presentation/controllers/login/signup/signup-controller");
var signup_validation_factory_1 = require("./signup-validation-factory");
var db_authentication_factory_1 = require("../../../usecases/account/authentication/db-authentication-factory");
var db_add_account_factory_1 = require("../../../usecases/account/add-account/db-add-account-factory");
var log_controller_decorator_factory_1 = require("../../../decorators/log-controller-decorator-factory");
var makeSignUpController = function () {
    var controller = new signup_controller_1.SignUpController(db_add_account_factory_1.makeDbAddAccount(), signup_validation_factory_1.makeSignUpValidation(), db_authentication_factory_1.makeDbAuthentication());
    return log_controller_decorator_factory_1.makeLogControllerDecorator(controller);
};
exports.makeSignUpController = makeSignUpController;
