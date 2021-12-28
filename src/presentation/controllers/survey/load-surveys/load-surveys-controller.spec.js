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
var load_surveys_controller_1 = require("./load-surveys-controller");
var load_surveys_controller_protocols_1 = require("./load-surveys-controller-protocols");
var test_1 = require("@/presentation/test");
var test_2 = require("@/domain/test");
var mockdate_1 = require("mockdate");
var makeSut = function () {
    var loadSurveysStub = test_1.mockLoadSurveys();
    var sut = new load_surveys_controller_1.LoadSurveysController(loadSurveysStub);
    return {
        sut: sut,
        loadSurveysStub: loadSurveysStub
    };
};
describe('Load Surveys Controller', function () {
    beforeAll(function () {
        // mockou a data, então sempre que chamar uma data ele vai pegar essa
        mockdate_1["default"].set(new Date());
    });
    afterAll(function () {
        mockdate_1["default"].reset();
    });
    test('Should call LoadSurveys', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadSurveysStub, loadSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadSurveysStub = _a.loadSurveysStub;
                    loadSpy = jest.spyOn(loadSurveysStub, 'load');
                    return [4 /*yield*/, sut.handle({})];
                case 1:
                    _b.sent();
                    expect(loadSpy).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 200 on success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, httpResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.handle({})];
                case 1:
                    httpResponse = _a.sent();
                    expect(httpResponse).toEqual(load_surveys_controller_protocols_1.ok(test_2.mockSurveyModels()));
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 204 if LoadSurveys returns empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadSurveysStub, httpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadSurveysStub = _a.loadSurveysStub;
                    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise(function (resolve) { return resolve([]); }));
                    return [4 /*yield*/, sut.handle({})];
                case 1:
                    httpResponse = _b.sent();
                    expect(httpResponse).toEqual(load_surveys_controller_protocols_1.noContent());
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return 500 if LoadSurveys throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadSurveysStub, httpResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadSurveysStub = _a.loadSurveysStub;
                    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(function () { throw new Error(); });
                    return [4 /*yield*/, sut.handle({})];
                case 1:
                    httpResponse = _b.sent();
                    expect(httpResponse).toEqual(load_surveys_controller_protocols_1.serverError(new Error()));
                    return [2 /*return*/];
            }
        });
    }); });
});
