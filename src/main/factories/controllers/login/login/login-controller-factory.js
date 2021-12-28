"use strict";
exports.__esModule = true;
exports.makeLoginController = void 0;
var login_validation_factory_1 = require("./login-validation-factory");
var login_controller_1 = require("../../../../../presentation/controllers/login/login/login-controller");
var db_authentication_factory_1 = require("../../../usecases/account/authentication/db-authentication-factory");
var log_controller_decorator_factory_1 = require("../../../decorators/log-controller-decorator-factory");
var makeLoginController = function () {
    var controller = new login_controller_1.LoginController(db_authentication_factory_1.makeDbAuthentication(), login_validation_factory_1.makeLoginValidation());
    return log_controller_decorator_factory_1.makeLogControllerDecorator(controller);
};
exports.makeLoginController = makeLoginController;
