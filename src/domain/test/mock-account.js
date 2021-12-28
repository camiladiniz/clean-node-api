"use strict";
exports.__esModule = true;
exports.mockFakeAuthentication = exports.mockAccountModel = exports.mockAddAccountParams = void 0;
var mockAddAccountParams = function () { return ({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
}); };
exports.mockAddAccountParams = mockAddAccountParams;
var mockAccountModel = function () { return Object.assign({}, exports.mockAddAccountParams(), { id: 'any_id' }); };
exports.mockAccountModel = mockAccountModel;
var mockFakeAuthentication = function () { return ({
    email: 'any_email@mail.com',
    password: 'any_password'
}); };
exports.mockFakeAuthentication = mockFakeAuthentication;
