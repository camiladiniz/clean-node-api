"use strict";
exports.__esModule = true;
exports.makeDbSaveSurveyResult = void 0;
var db_save_survey_result_1 = require("@/data/usecases/survey-result/save-survey-result/db-save-survey-result");
var survey_result_mongo_repository_1 = require("@/infra/db/mongodb/survey/survey-result/survey-result-mongo-repository");
var makeDbSaveSurveyResult = function () {
    var surveyResultMongoRepository = new survey_result_mongo_repository_1.SurveyResultMongoRepository();
    return new db_save_survey_result_1.DbSaveSurveyResult(surveyResultMongoRepository);
};
exports.makeDbSaveSurveyResult = makeDbSaveSurveyResult;
