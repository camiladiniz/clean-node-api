"use strict";
exports.__esModule = true;
exports.makeAuthMiddleware = void 0;
var auth_middleware_1 = require("../../../presentation/middlewares/auth-middleware");
var db_load_account_by_token_factory_1 = require("../usecases/account/load-account-by-token/db-load-account-by-token-factory");
var makeAuthMiddleware = function (role) {
    return new auth_middleware_1.AuthMiddleware(db_load_account_by_token_factory_1.makeDbLoadAccountByToken(), role);
};
exports.makeAuthMiddleware = makeAuthMiddleware;
