"use strict";
exports.__esModule = true;
exports.mockAddSurveyParams = exports.mockSurveyModels = exports.mockSurveyModel = void 0;
var mockSurveyModel = function () {
    return {
        id: 'any_id',
        question: 'any_question',
        answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }],
        date: new Date()
    };
};
exports.mockSurveyModel = mockSurveyModel;
var mockSurveyModels = function () {
    return [{
            id: 'any_id',
            question: 'any_question',
            answers: [{
                    image: 'any_image',
                    answer: 'any_answer'
                }],
            date: new Date()
        }, {
            id: 'other_id',
            question: 'other_question',
            answers: [{
                    image: 'other_image',
                    answer: 'other_answer'
                }],
            date: new Date()
        }];
};
exports.mockSurveyModels = mockSurveyModels;
var mockAddSurveyParams = function () { return ({
    question: 'any_question',
    answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
    date: new Date()
}); };
exports.mockAddSurveyParams = mockAddSurveyParams;
