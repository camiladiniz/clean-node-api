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
var db_load_surveys_1 = require("./db-load-surveys");
var test_1 = require("@/data/test");
var test_2 = require("@/domain/test");
var mockdate_1 = require("mockdate");
var makeSut = function () {
    var loadSurveysRepositoryStub = test_1.mockLoadSurveysRepository();
    var sut = new db_load_surveys_1.DbLoadSurveys(loadSurveysRepositoryStub);
    return {
        sut: sut,
        loadSurveysRepositoryStub: loadSurveysRepositoryStub
    };
};
// testar a integração com o repoitório
describe('DbLoadSurveys', function () {
    beforeAll(function () {
        // mockou a data, então sempre que chamar uma data ele vai pegar essa
        mockdate_1["default"].set(new Date());
    });
    afterAll(function () {
        mockdate_1["default"].reset();
    });
    test('Should call LoadSurveysRepository', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadSurveysRepositoryStub, loadAllSpy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadSurveysRepositoryStub = _a.loadSurveysRepositoryStub;
                    loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
                    return [4 /*yield*/, sut.load()];
                case 1:
                    _b.sent();
                    expect(loadAllSpy).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return a list of Surveys on success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, surveys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.load()];
                case 1:
                    surveys = _a.sent();
                    expect(surveys).toEqual(test_2.mockSurveyModels());
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if LoadSurveysRepository throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, loadSurveysRepositoryStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, loadSurveysRepositoryStub = _a.loadSurveysRepositoryStub;
                    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.load();
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
