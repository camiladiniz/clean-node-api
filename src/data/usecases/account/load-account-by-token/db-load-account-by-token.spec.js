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
var db_load_account_by_token_1 = require("./db-load-account-by-token");
var test_1 = require("@/domain/test");
var test_2 = require("@/data/test");
var makeSut = function () {
    var decrypterStub = test_2.mockDecrypter();
    var loadAccountByTokenRepositoryStub = test_2.mockLoadAccountByTokenRepository();
    var sut = new db_load_account_by_token_1.DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub);
    return {
        sut: sut,
        decrypterStub: decrypterStub,
        loadAccountByTokenRepositoryStub: loadAccountByTokenRepositoryStub
    };
};
describe('DbLoadAccountByToken Usecase', function () {
    test('Should call Decrypter with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, decrypterStub, decryptSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, decrypterStub = _a.decrypterStub;
                    decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
                    return [4 /*yield*/, sut.load('any_token', 'any_role')];
                case 1:
                    _b.sent();
                    expect(decryptSpy).toHaveBeenCalledWith('any_token');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return null if Decrypter returns null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, decrypterStub, account;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, decrypterStub = _a.decrypterStub;
                    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(function (resolve) { return resolve(null); }));
                    return [4 /*yield*/, sut.load('any_token', 'any_role')];
                case 1:
                    account = _b.sent();
                    expect(account).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call LoadAccountRepository with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByTokenRepositoryStub, loadByTokenSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByTokenRepositoryStub = _a.loadAccountByTokenRepositoryStub;
                    loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken');
                    return [4 /*yield*/, sut.load('any_token', 'any_role')];
                case 1:
                    _b.sent();
                    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return null if LoadAccountRepository returns null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByTokenRepositoryStub, account;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByTokenRepositoryStub = _a.loadAccountByTokenRepositoryStub;
                    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(function (resolve) { return resolve(null); }));
                    return [4 /*yield*/, sut.load('any_token', 'any_role')];
                case 1:
                    account = _b.sent();
                    expect(account).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return an account on success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.load('any_token', 'any_role')];
                case 1:
                    account = _a.sent();
                    expect(account).toEqual(test_1.mockAccountModel());
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if Decrypter throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, decrypterStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, decrypterStub = _a.decrypterStub;
                    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.load('any_token', 'any_role');
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if LoadAccountByTokenRepository throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByTokenRepositoryStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByTokenRepositoryStub = _a.loadAccountByTokenRepositoryStub;
                    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.load('any_token', 'any_role');
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
