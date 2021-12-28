"use strict";
exports.__esModule = true;
exports.makeDbAddAccount = void 0;
var db_add_account_1 = require("../../../../../data/usecases/account/add-account/db-add-account");
var account_mongo_repository_1 = require("../../../../../infra/db/mongodb/account/account-mongo-repository");
var bcrypt_adapter_1 = require("../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter");
var makeDbAddAccount = function () {
    var salt = 12;
    var bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(salt);
    var accountMongoRepository = new account_mongo_repository_1.AccountMongoRepository();
    return new db_add_account_1.DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository);
};
exports.makeDbAddAccount = makeDbAddAccount;
