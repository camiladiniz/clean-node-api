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
var signup_controller_1 = require("./signup-controller");
var errors_1 = require("../../../errors");
var http_helper_1 = require("../../../helper/http/http-helper");
var test_1 = require("@/presentation/test");
var mockRequest = function () { return ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
    }
}); };
var makeSut = function () {
    var addAccountStub = test_1.mockAddAccount();
    var validationStub = test_1.mockValidation();
    var authenticationStub = test_1.mockAuthentication();
    var sut = new signup_controller_1.SignUpController(addAccountStub, validationStub, authenticationStub);
    return {
        sut: sut,
        addAccountStub: addAccountStub,
        validationStub: validationStub,
        authenticationStub: authenticationStub
    };
};
describe('SignUp Controller', function () {
    test('Should return 500 if AddAccount throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, addAccountStub, httpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, addAccountStub = _a.addAccountStub;
                    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return reject(new Error()); })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    return [4 /*yield*/, sut.handle(mockRequest())];
                case 1:
                    httpResponse = _b.sent();
                    expect(httpResponse).toEqual(http_helper_1.serverError(new errors_1.ServerError(undefined)));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call AddAccount with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, addAccountStub, addSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, addAccountStub = _a.addAccountStub;
                    addSpy = jest.spyOn(addAccountStub, 'add');
                    return [4 /*yield*/, sut.handle(mockRequest())];
                case 1:
                    _b.sent();
                    expect(addSpy).toHaveBeenCalledWith({
                        name: 'any_name',
                        email: 'any_email@mail.com',
                        password: 'any_password'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 403 if AddAccount returns null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, addAccountStub, httpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, addAccountStub = _a.addAccountStub;
                    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(function (resolve) { return resolve(null); }));
                    return [4 /*yield*/, sut.handle(mockRequest())];
                case 1:
                    httpResponse = _b.sent();
                    expect(httpResponse).toEqual(http_helper_1.forbidden(new errors_1.EmailInUseError()));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 200 if valid data is provided', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, httpResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.handle(mockRequest())];
                case 1:
                    httpResponse = _a.sent();
                    expect(httpResponse).toEqual(http_helper_1.ok({ accessToken: 'any_token' }));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call Validation with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, validationStub, validateSpy, httpRequest;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, validationStub = _a.validationStub;
                    validateSpy = jest.spyOn(validationStub, 'validate');
                    httpRequest = mockRequest();
                    return [4 /*yield*/, sut.handle(httpRequest)];
                case 1:
                    _b.sent();
                    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 400 if Validation returns an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, validationStub, httpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, validationStub = _a.validationStub;
                    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new errors_1.MissingParamError('any_field'));
                    return [4 /*yield*/, sut.handle(mockRequest())];
                case 1:
                    httpResponse = _b.sent();
                    expect(httpResponse).toEqual(http_helper_1.badRequest(new errors_1.MissingParamError('any_field')));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call Authentication with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, authenticationStub, authSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, authenticationStub = _a.authenticationStub;
                    authSpy = jest.spyOn(authenticationStub, 'auth');
                    return [4 /*yield*/, sut.handle(mockRequest())];
                case 1:
                    _b.sent();
                    expect(authSpy).toHaveBeenCalledWith({
                        email: 'any_email@mail.com',
                        password: 'any_password'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 500 if Authentication throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, authenticationStub, httpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, authenticationStub = _a.authenticationStub;
                    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(function () { throw new Error(); });
                    return [4 /*yield*/, sut.handle(mockRequest())];
                case 1:
                    httpResponse = _b.sent();
                    expect(httpResponse).toEqual(http_helper_1.serverError(new Error()));
                    return [2 /*return*/];
            }
        });
    }); });
});
