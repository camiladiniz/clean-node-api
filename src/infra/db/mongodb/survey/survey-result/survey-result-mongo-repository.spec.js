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
var mongo_helper_1 = require("../../helpers/mongo-helper");
var survey_result_mongo_repository_1 = require("./survey-result-mongo-repository");
var surveyCollection;
var surveyResultCollection;
var accountCollection;
var makeSut = function () {
    return new survey_result_mongo_repository_1.SurveyResultMongoRepository();
};
var makeSurvey = function () { return __awaiter(void 0, void 0, void 0, function () {
    var survey, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                survey = {
                    question: 'any_question',
                    answers: [{
                            image: 'any_image',
                            answer: 'any_answer'
                        }, {
                            answer: 'other_answer'
                        }],
                    date: new Date()
                };
                return [4 /*yield*/, surveyCollection.insertOne(survey)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, mongo_helper_1.MongoHelper.map(survey, res)];
        }
    });
}); };
var makeAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var account, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account = {
                    name: 'any_name',
                    email: 'any_email@mail.com',
                    password: 'any_password'
                };
                return [4 /*yield*/, accountCollection.insertOne(account)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, mongo_helper_1.MongoHelper.map(account, res)];
        }
    });
}); };
describe('Account Mongo Repository', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongo_helper_1.MongoHelper.connect(process.env.MONGO_URL)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongo_helper_1.MongoHelper.disconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    surveyCollection = mongo_helper_1.MongoHelper.getCollection('surveys');
                    return [4 /*yield*/, surveyCollection.deleteMany({})];
                case 1:
                    _a.sent();
                    surveyResultCollection = mongo_helper_1.MongoHelper.getCollection('surveyResults');
                    return [4 /*yield*/, surveyResultCollection.deleteMany({})];
                case 2:
                    _a.sent();
                    accountCollection = mongo_helper_1.MongoHelper.getCollection('accounts');
                    return [4 /*yield*/, accountCollection.deleteMany({})];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('save()', function () {
        test('Should add a survey result if its new', function () { return __awaiter(void 0, void 0, void 0, function () {
            var survey, account, sut, surveyResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeSurvey()];
                    case 1:
                        survey = _a.sent();
                        return [4 /*yield*/, makeAccount()];
                    case 2:
                        account = _a.sent();
                        sut = makeSut();
                        return [4 /*yield*/, sut.save({
                                surveyId: survey.id,
                                accountId: account.id,
                                answer: survey.answers[0].answer,
                                date: new Date()
                            })];
                    case 3:
                        surveyResult = _a.sent();
                        expect(surveyResult).toBeTruthy();
                        expect(surveyResult.id).toBeTruthy();
                        expect(surveyResult.answer).toBe(survey.answers[0].answer);
                        return [2 /*return*/];
                }
            });
        }); });
        test('Should update survey result if its not new', function () { return __awaiter(void 0, void 0, void 0, function () {
            var survey, account, res, sut, surveyResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeSurvey()];
                    case 1:
                        survey = _a.sent();
                        return [4 /*yield*/, makeAccount()];
                    case 2:
                        account = _a.sent();
                        return [4 /*yield*/, surveyResultCollection.insertOne({
                                surveyId: survey.id,
                                accountId: account.id,
                                answer: survey.answers[0].answer,
                                date: new Date()
                            })];
                    case 3:
                        res = _a.sent();
                        sut = makeSut();
                        return [4 /*yield*/, sut.save({
                                surveyId: survey.id,
                                accountId: account.id,
                                answer: survey.answers[1].answer,
                                date: new Date()
                            })];
                    case 4:
                        surveyResult = _a.sent();
                        expect(surveyResult).toBeTruthy();
                        // expect(surveyResult.id).toEqual(res.insertedId)
                        expect(surveyResult.answer).toBe(survey.answers[1].answer);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
