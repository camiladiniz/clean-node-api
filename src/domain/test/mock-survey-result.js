"use strict";
exports.__esModule = true;
exports.mockSaveSurveyResultModel = exports.mockSaveSurveyResultParams = void 0;
var mockSaveSurveyResultParams = function () { return ({
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    date: new Date()
}); };
exports.mockSaveSurveyResultParams = mockSaveSurveyResultParams;
var mockSaveSurveyResultModel = function () { return Object.assign({}, exports.mockSaveSurveyResultParams(), {
    id: 'any_id'
}); };
exports.mockSaveSurveyResultModel = mockSaveSurveyResultModel;
