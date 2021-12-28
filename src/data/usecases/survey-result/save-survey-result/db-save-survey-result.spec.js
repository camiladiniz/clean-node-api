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
var db_save_survey_result_1 = require("./db-save-survey-result");
var test_1 = require("@/domain/test");
var test_2 = require("@/data/test");
var mockdate_1 = require("mockdate");
var makeSut = function () {
    var saveSurveyResultRepositoryStub = test_2.mockSaveSurveyResultRepository();
    var sut = new db_save_survey_result_1.DbSaveSurveyResult(saveSurveyResultRepositoryStub);
    return {
        sut: sut,
        saveSurveyResultRepositoryStub: saveSurveyResultRepositoryStub
    };
};
describe('DbAddSurvey Usecase', function () {
    beforeAll(function () {
        // mockou a data, então sempre que chamar uma data ele vai pegar essa
        mockdate_1["default"].set(new Date());
    });
    afterAll(function () {
        mockdate_1["default"].reset();
    });
    test('Should call SaveSurveyResultRepository with correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, saveSurveyResultRepositoryStub, saveSpy, surveyResultData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, saveSurveyResultRepositoryStub = _a.saveSurveyResultRepositoryStub;
                    saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
                    surveyResultData = test_1.mockSaveSurveyResultModel();
                    return [4 /*yield*/, sut.save(surveyResultData)];
                case 1:
                    _b.sent();
                    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should throw if SaveSurveyResultRepository throws', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sut, saveSurveyResultRepositoryStub, promise;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = makeSut(), sut = _a.sut, saveSurveyResultRepositoryStub = _a.saveSurveyResultRepositoryStub;
                    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(function () { throw new Error(); });
                    promise = sut.save(test_1.mockSaveSurveyResultParams());
                    return [4 /*yield*/, expect(promise).rejects.toThrow()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Should return SurveyResult on success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sut, surveyResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sut = makeSut().sut;
                    return [4 /*yield*/, sut.save(test_1.mockSaveSurveyResultParams())];
                case 1:
                    surveyResult = _a.sent();
                    expect(surveyResult).toEqual(test_1.mockSaveSurveyResultModel());
                    return [2 /*return*/];
            }
        });
    }); });
});