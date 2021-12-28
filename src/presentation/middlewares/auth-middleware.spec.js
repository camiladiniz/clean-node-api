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
var http_helper_1 = require("../helper/http/http-helper");
var access_denied_error_1 = require("../errors/access-denied-error");
var auth_middleware_1 = require("./auth-middleware");
var test_1 = require("@/presentation/test");
var makeFakeRequest = function () { return ({
    headers: {
        'x-access-token': 'any_token'
    }
}); };
var makeSut = function (role) {
    var loadAccountByTokenStub = test_1.mockLoadAccountByToken();
    var sut = new auth_middleware_1.AuthMiddleware(loadAccountByTokenStub, role);
    return {
        sut: sut,
        loadAccountByTokenStub: loadAccountByTokenStub
    };
};
describe('Auth Middleware', function () {
    test('Should return 403 if no x-access-token exists in headers', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, httpResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.handle({})];
                case 1:
                    httpResponse = _a.sent();
                    expect(httpResponse).toEqual(http_helper_1.forbidden(new access_denied_error_1.AccessDeniedError()));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call LoadAccountByToken with correct accessToken', function () { return __awaiter(void 0, void 0, void 0, function () {
        var role, _a, sut, loadAccountByTokenStub, loadSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    role = 'any_role';
                    _a = makeSut(role), sut = _a.sut, loadAccountByTokenStub = _a.loadAccountByTokenStub;
                    loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
                    return [4 /*yield*/, sut.handle(makeFakeRequest())];
                case 1:
                    _b.sent();
                    expect(loadSpy).toHaveBeenCalledWith('any_token', role);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 403 if LoadAccountByToken returns null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByTokenStub, httpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByTokenStub = _a.loadAccountByTokenStub;
                    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(function (resolve) { return resolve(null); }));
                    return [4 /*yield*/, sut.handle(makeFakeRequest())];
                case 1:
                    httpResponse = _b.sent();
                    expect(httpResponse).toEqual(http_helper_1.forbidden(new access_denied_error_1.AccessDeniedError()));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 200 if LoadAccountByToken returns an account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, httpResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.handle(makeFakeRequest())];
                case 1:
                    httpResponse = _a.sent();
                    expect(httpResponse).toEqual(http_helper_1.ok({ accountId: 'any_id' }));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 500 if LoadAccountByToken throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadAccountByTokenStub, httpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadAccountByTokenStub = _a.loadAccountByTokenStub;
                    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(function () { throw new Error(); });
                    return [4 /*yield*/, sut.handle(makeFakeRequest())];
                case 1:
                    httpResponse = _b.sent();
                    expect(httpResponse).toEqual(http_helper_1.serverError(new Error()));
                    return [2 /*return*/];
            }
        });
    }); });
});
