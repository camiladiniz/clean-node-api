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
var mongo_helper_1 = require("../helpers/mongo-helper");
var account_mongo_repository_1 = require("./account-mongo-repository");
var test_1 = require("@/domain/test");
var accountCollection;
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
                    accountCollection = mongo_helper_1.MongoHelper.getCollection('accounts');
                    return [4 /*yield*/, accountCollection.deleteMany({})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var makeSut = function () {
        return new account_mongo_repository_1.AccountMongoRepository();
    };
    describe('add()', function () {
        test('Should return an account on add success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, sut.add(test_1.mockAddAccountParams())];
                    case 1:
                        account = _a.sent();
                        expect(account).toBeTruthy();
                        expect(account.id).toBeTruthy();
                        expect(account.name).toBe('any_name');
                        expect(account.email).toBe('any_email@mail.com');
                        expect(account.password).toBe('any_password');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('loadByEmail()', function () {
        test('Should return an account on loadByEmail success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, accountCollection.insertOne({
                                name: 'any_name',
                                email: 'any_email@mail.com',
                                password: 'any_password'
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sut.loadByEmail('any_email@mail.com')];
                    case 2:
                        account = _a.sent();
                        expect(account).toBeTruthy();
                        expect(account.id).toBeTruthy();
                        expect(account.name).toBe('any_name');
                        expect(account.email).toBe('any_email@mail.com');
                        expect(account.password).toBe('any_password');
                        return [2 /*return*/];
                }
            });
        }); });
        test('Should return null if loadByEmail fails', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, sut.loadByEmail('any_email@mail.com')];
                    case 1:
                        account = _a.sent();
                        expect(account).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('updateAccessToken()', function () {
        test('Should update the account accessToken on updateAccessToken success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, res, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, accountCollection.insertOne({
                                name: 'any_name',
                                email: 'any_email@mail.com',
                                password: 'any_password'
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res.accessToken).toBeFalsy();
                        return [4 /*yield*/, sut.updateAccessToken(res.insertedId, 'any_token')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, accountCollection.findOne({ _id: res.insertedId })];
                    case 3:
                        account = _a.sent();
                        expect(account).toBeTruthy();
                        expect(account === null || account === void 0 ? void 0 : account.accessToken).toBe('any_token');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('loadByToken()', function () {
        test('Should return an account on loadByToken without role', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, accountCollection.insertOne({
                                name: 'any_name',
                                email: 'any_email@mail.com',
                                password: 'any_password',
                                accessToken: 'any_token'
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sut.loadByToken('any_token')];
                    case 2:
                        account = _a.sent();
                        expect(account).toBeTruthy();
                        expect(account.id).toBeTruthy();
                        expect(account.name).toBe('any_name');
                        expect(account.email).toBe('any_email@mail.com');
                        expect(account.password).toBe('any_password');
                        return [2 /*return*/];
                }
            });
        }); });
        test('Should return an account on loadByToken with admin role', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, accountCollection.insertOne({
                                name: 'any_name',
                                email: 'any_email@mail.com',
                                password: 'any_password',
                                accessToken: 'any_token',
                                role: 'admin'
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sut.loadByToken('any_token', 'admin')];
                    case 2:
                        account = _a.sent();
                        expect(account).toBeTruthy();
                        expect(account.id).toBeTruthy();
                        expect(account.name).toBe('any_name');
                        expect(account.email).toBe('any_email@mail.com');
                        expect(account.password).toBe('any_password');
                        return [2 /*return*/];
                }
            });
        }); });
        test('Should return null on loadByToken with invalid role', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, accountCollection.insertOne({
                                name: 'any_name',
                                email: 'any_email@mail.com',
                                password: 'any_password',
                                accessToken: 'any_token'
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sut.loadByToken('any_token', 'admin')];
                    case 2:
                        account = _a.sent();
                        expect(account).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        test('Should return an account on loadByToken if user is admin', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, accountCollection.insertOne({
                                name: 'any_name',
                                email: 'any_email@mail.com',
                                password: 'any_password',
                                accessToken: 'any_token',
                                role: 'admin'
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sut.loadByToken('any_token')];
                    case 2:
                        account = _a.sent();
                        expect(account).toBeTruthy();
                        expect(account.id).toBeTruthy();
                        expect(account.name).toBe('any_name');
                        expect(account.email).toBe('any_email@mail.com');
                        expect(account.password).toBe('any_password');
                        return [2 /*return*/];
                }
            });
        }); });
        test('Should return null if loadByToken fails', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = makeSut();
                        return [4 /*yield*/, sut.loadByEmail('any_token')];
                    case 1:
                        account = _a.sent();
                        expect(account).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
