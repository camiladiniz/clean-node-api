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
var db_authentication_1 = require("./db-authentication");
var test_1 = require("@/data/test");
var test_2 = require("@/domain/test");
var makeSut = function () {
    var loadAccountByEmailRepositoryStub = test_1.mockLoadAccountByEmailRepository();
    var hashComparerStub = test_1.mockHashComparer();
    var encrypterStub = test_1.mockEncrypter();
    var updateAccessTokenRepositoryStub = test_1.mockUpdateAccessTokenRepository();
    var sut = new db_authentication_1.DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub);
    return {
        sut: sut,
        loadAccountByEmailRepositoryStub: loadAccountByEmailRepositoryStub,
        hashComparerStub: hashComparerStub,
        encrypterStub: encrypterStub,
        updateAccessTokenRepositoryStub: updateAccessTokenRepositoryStub
    };
};
describe('DbAuthentication UseCase', function () {
    // testando integração entre compojentes
    test('Should call LoadAccountByEmailRepository with correct email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByEmailRepositoryStub, loadSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByEmailRepositoryStub = _a.loadAccountByEmailRepositoryStub;
                    loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
                    return [4 /*yield*/, sut.auth(test_2.mockFakeAuthentication())];
                case 1:
                    _b.sent();
                    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if LoadAccountByEmailRepository throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByEmailRepositoryStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByEmailRepositoryStub = _a.loadAccountByEmailRepositoryStub;
                    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.auth(test_2.mockFakeAuthentication());
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return null if LoadAccountByEmailRepository returns null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByEmailRepositoryStub, accessToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByEmailRepositoryStub = _a.loadAccountByEmailRepositoryStub;
                    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null);
                    return [4 /*yield*/, sut.auth(test_2.mockFakeAuthentication())];
                case 1:
                    accessToken = _b.sent();
                    expect(accessToken).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call HashComparer with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, hashComparerStub, compareSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, hashComparerStub = _a.hashComparerStub;
                    compareSpy = jest.spyOn(hashComparerStub, 'compare');
                    return [4 /*yield*/, sut.auth(test_2.mockFakeAuthentication())];
                case 1:
                    _b.sent();
                    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if HashComparer throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, hashComparerStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, hashComparerStub = _a.hashComparerStub;
                    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.auth(test_2.mockFakeAuthentication());
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return null if HashComparer returns false', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, hashComparerStub, accessToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, hashComparerStub = _a.hashComparerStub;
                    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(function (resolve) { return resolve(false); }));
                    return [4 /*yield*/, sut.auth(test_2.mockFakeAuthentication())];
                case 1:
                    accessToken = _b.sent();
                    expect(accessToken).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call Encrypter with correct id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, encrypterStub, encryptSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, encrypterStub = _a.encrypterStub;
                    encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
                    return [4 /*yield*/, sut.auth(test_2.mockFakeAuthentication())];
                case 1:
                    _b.sent();
                    expect(encryptSpy).toHaveBeenCalledWith('any_id');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if Encrypter throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, encrypterStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, encrypterStub = _a.encrypterStub;
                    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.auth(test_2.mockFakeAuthentication());
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return a token on success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.auth(test_2.mockFakeAuthentication())];
                case 1:
                    accessToken = _a.sent();
                    expect(accessToken).toBe('any_token');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call UpdateAccessTokenRepository with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, updateAccessTokenRepositoryStub, updateSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, updateAccessTokenRepositoryStub = _a.updateAccessTokenRepositoryStub;
                    updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken');
                    return [4 /*yield*/, sut.auth(test_2.mockFakeAuthentication())];
                case 1:
                    _b.sent();
                    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if UpdateAccessTokenRepository throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, updateAccessTokenRepositoryStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, updateAccessTokenRepositoryStub = _a.updateAccessTokenRepositoryStub;
                    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.auth(test_2.mockFakeAuthentication());
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
