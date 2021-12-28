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
var supertest_1 = require("supertest");
var mongo_helper_1 = require("../../infra/db/mongodb/helpers/mongo-helper");
var app_1 = require("../config/app");
var jsonwebtoken_1 = require("jsonwebtoken");
var env_1 = require("../config/env");
var surveyCollection;
var accountCollection;
var makeAccessToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, id, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, accountCollection.insertOne({
                    name: 'Camila',
                    email: 'camila@gmail.com',
                    password: '123'
                })];
            case 1:
                res = _a.sent();
                id = res.insertedId;
                accessToken = jsonwebtoken_1.sign({ id: id }, env_1["default"].jwtSecret);
                return [4 /*yield*/, accountCollection.updateOne({
                        _id: id
                    }, {
                        $set: {
                            accessToken: accessToken
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, accessToken];
        }
    });
}); };
describe('Survey Result Routes', function () {
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
                    accountCollection = mongo_helper_1.MongoHelper.getCollection('accounts');
                    return [4 /*yield*/, accountCollection.deleteMany({})];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('PUT /api/surveys/:surveyId/results', function () {
        // verifica se o body é parseado e o server entenda
        test('Should return 403 on save survey without accessToken', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](app_1["default"])
                            .put('/api/surveys/any_id/results')
                            .send({
                            answer: 'any_answer'
                        })
                            .expect(403)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('Should return 200 on save survey with accessToken', function () { return __awaiter(void 0, void 0, void 0, function () {
            var accessToken, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        return [4 /*yield*/, surveyCollection.insertOne({
                                question: 'Question',
                                answers: [{
                                        answer: 'Answer 1',
                                        image: 'http://image-name.com'
                                    }, {
                                        answer: 'Answer 2'
                                    }],
                                date: new Date()
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, supertest_1["default"](app_1["default"])
                                .put("/api/surveys/" + res.insertedId.toString() + "/results")
                                .set('x-access-token', accessToken)
                                .send({
                                answer: 'Answer 1'
                            })
                                .expect(200)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
