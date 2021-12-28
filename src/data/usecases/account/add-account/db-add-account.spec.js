"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var db_add_account_1 = require("./db-add-account");
var test_1 = require("@/domain/test");
var test_2 = require("@/data/test");
var mockLoadAccountByEmailRepository = function () {
    var LoadAccountByEmailRepositoryStub = /** @class */ (function () {
        function LoadAccountByEmailRepositoryStub() {
        }
        LoadAccountByEmailRepositoryStub.prototype.loadByEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) { return resolve(null); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return LoadAccountByEmailRepositoryStub;
    }());
    return new LoadAccountByEmailRepositoryStub();
};
var makeSut = function () {
    var encrypterStub = test_2.mockHasher();
    var addAccountRepositoryStub = test_2.mockAddAccountRepository();
    var loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
    var sut = new db_add_account_1.DbAddAccount(encrypterStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub);
    return {
        sut: sut,
        encrypterStub: encrypterStub,
        addAccountRepositoryStub: addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub: loadAccountByEmailRepositoryStub
    };
};
describe('DbAddAccountUseCase', function () {
    test('Should call Encrypter with correct password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, encrypterStub, encryptSpy, accountData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, encrypterStub = _a.encrypterStub;
                    encryptSpy = jest.spyOn(encrypterStub, 'hash');
                    accountData = {
                        name: 'any_name',
                        email: 'any_email@mail.com',
                        password: 'any_password'
                    };
                    return [4 /*yield*/, sut.add(accountData)];
                case 1:
                    _b.sent();
                    expect(encryptSpy).toHaveBeenCalledWith('any_password');
                    return [2 /*return*/];
            }
        });
    }); });
    // teste para garantir que o erro será encaminhado ao controller
    // esse tipo de teste é feito para garantir que só o controller tenha try catch, e se houver algum erro o controller receba isso
    test('Should throw if Hasher throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, encrypterStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, encrypterStub = _a.encrypterStub;
                    // mockando uma dependencia
                    jest.spyOn(encrypterStub, 'hash').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.add(test_1.mockAddAccountParams());
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call AddAccountRepository with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, addAccountRepositoryStub, addSpy, accountData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, addAccountRepositoryStub = _a.addAccountRepositoryStub;
                    addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
                    accountData = {
                        name: 'any_name',
                        email: 'any_email@mail.com',
                        password: 'any_password'
                    };
                    return [4 /*yield*/, sut.add(accountData)];
                case 1:
                    _b.sent();
                    expect(addSpy).toHaveBeenCalledWith({
                        name: 'any_name',
                        email: 'any_email@mail.com',
                        password: 'hashed_password'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if AddAccountRepositoryStub throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, addAccountRepositoryStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, addAccountRepositoryStub = _a.addAccountRepositoryStub;
                    // mockando uma dependencia
                    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.add(test_1.mockAddAccountParams());
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // caso de sucesso não mockamos, apenas caso de erro
    test('Should return an account o success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.add(test_1.mockAddAccountParams())];
                case 1:
                    account = _a.sent();
                    expect(account).toEqual(test_1.mockAccountModel());
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return null if LoadAccountEmailReposiotory not return null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByEmailRepositoryStub, account;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByEmailRepositoryStub = _a.loadAccountByEmailRepositoryStub;
                    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(function (resolve) { return resolve(test_1.mockAccountModel()); }));
                    return [4 /*yield*/, sut.add(test_1.mockAddAccountParams())];
                case 1:
                    account = _b.sent();
                    expect(account).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call LoadAccountByEmailRepository with correct email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByEmailRepositoryStub, loadSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByEmailRepositoryStub = _a.loadAccountByEmailRepositoryStub;
                    loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
                    return [4 /*yield*/, sut.add(test_1.mockAddAccountParams())];
                case 1:
                    _b.sent();
                    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
                    return [2 /*return*/];
            }
        });
    }); });
});
