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
var log_controller_decorator_1 = require("./log-controller-decorator");
var http_helper_1 = require("../../presentation/helper/http/http-helper");
var test_1 = require("@/data/test");
var test_2 = require("@/domain/test");
var makeFakeRequest = function () { return ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
    }
}); };
var makeSut = function () {
    var controllerStub = makeController();
    var logErrorRepositoryStub = test_1.mockLogErrorRepository();
    var sut = new log_controller_decorator_1.LogControllerDecorator(controllerStub, logErrorRepositoryStub);
    return {
        sut: sut,
        controllerStub: controllerStub,
        logErrorRepositoryStub: logErrorRepositoryStub
    };
};
var makeFakeServerError = function () {
    var fakeError = new Error();
    fakeError.stack = 'any_stack';
    return http_helper_1.serverError(fakeError);
};
var makeController = function () {
    var ControllerStub = /** @class */ (function () {
        function ControllerStub() {
        }
        ControllerStub.prototype.handle = function (httpRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) { return resolve(http_helper_1.ok(test_2.mockAccountModel())); })];
                        case 1: 
                        // esse obj foi substituido pelo helper ok e function makeAccount
                        // const httpResponse: HttpResponse = {
                        //   statusCode: 200,
                        //   body: {
                        //     name: 'Camila'
                        //   }
                        // }
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return ControllerStub;
    }());
    return new ControllerStub();
};
describe('LogController Decorator', function () {
    test('Should call controller handle', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, controllerStub, handleSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, controllerStub = _a.controllerStub;
                    handleSpy = jest.spyOn(controllerStub, 'handle');
                    return [4 /*yield*/, sut.handle(makeFakeRequest())];
                case 1:
                    _b.sent();
                    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest());
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return the same result of the controller', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, httpResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.handle(makeFakeRequest())
                        // expect(httpResponse).toEqual({
                        //   statusCode: 200,
                        //   body: {
                        //     name: 'Camila'
                        //   }
                        // })
                    ];
                case 1:
                    httpResponse = _a.sent();
                    // expect(httpResponse).toEqual({
                    //   statusCode: 200,
                    //   body: {
                    //     name: 'Camila'
                    //   }
                    // })
                    expect(httpResponse).toEqual(http_helper_1.ok(test_2.mockAccountModel()));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should call LogErrorRepository with correct error if controller returns a server error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, controllerStub, logErrorRepositoryStub, logSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, controllerStub = _a.controllerStub, logErrorRepositoryStub = _a.logErrorRepositoryStub;
                    logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');
                    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(function (resolve) { return resolve(makeFakeServerError()); }));
                    return [4 /*yield*/, sut.handle(makeFakeRequest())];
                case 1:
                    _b.sent();
                    expect(logSpy).toHaveBeenCalledWith('any_stack');
                    return [2 /*return*/];
            }
        });
    }); });
});
