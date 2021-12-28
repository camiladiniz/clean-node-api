"use strict";
exports.__esModule = true;
exports.makeDbLoadAccountByToken = void 0;
var db_load_account_by_token_1 = require("../../../../../data/usecases/account/load-account-by-token/db-load-account-by-token");
var jwt_adapter_1 = require("../../../../../infra/criptography/jwt-adapter/jwt-adapter");
var account_mongo_repository_1 = require("../../../../../infra/db/mongodb/account/account-mongo-repository");
var env_1 = require("../../../../config/env");
var makeDbLoadAccountByToken = function () {
    var jwtAdapter = new jwt_adapter_1.JwtAdapter(env_1["default"].jwtSecret);
    var accountMongoRepository = new account_mongo_repository_1.AccountMongoRepository();
    return new db_load_account_by_token_1.DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
exports.makeDbLoadAccountByToken = makeDbLoadAccountByToken;
