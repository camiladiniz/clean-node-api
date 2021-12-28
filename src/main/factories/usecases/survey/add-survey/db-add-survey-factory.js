"use strict";
exports.__esModule = true;
exports.makeDbAddSurvey = void 0;
var survey_mongo_repository_1 = require("../../../../../infra/db/mongodb/survey/survey-mongo-repository");
var db_add_survey_1 = require("../../../../../data/usecases/survey/add-survey/db-add-survey");
var makeDbAddSurvey = function () {
    var surveyMongoRepository = new survey_mongo_repository_1.SurveyMongoRepository();
    return new db_add_survey_1.DbAddSurvey(surveyMongoRepository);
};
exports.makeDbAddSurvey = makeDbAddSurvey;
