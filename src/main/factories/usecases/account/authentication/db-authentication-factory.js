"use strict";
exports.__esModule = true;
exports.makeDbAuthentication = void 0;
var env_1 = require("../../../../config/env");
var db_authentication_1 = require("@/data/usecases/account/authentication/db-authentication");
var account_mongo_repository_1 = require("@/infra/db/mongodb/account/account-mongo-repository");
var bcrypt_adapter_1 = require("@/infra/criptography/bcrypt-adapter/bcrypt-adapter");
var jwt_adapter_1 = require("@/infra/criptography/jwt-adapter/jwt-adapter");
var makeDbAuthentication = function () {
    var salt = 12;
    var bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(salt);
    var jwtAdapter = new jwt_adapter_1.JwtAdapter(env_1["default"].jwtSecret);
    var accountMongoRepository = new account_mongo_repository_1.AccountMongoRepository();
    return new db_authentication_1.DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository);
};
exports.makeDbAuthentication = makeDbAuthentication;
