"use strict";
exports.__esModule = true;
exports.makeDbLoadSurveys = void 0;
var survey_mongo_repository_1 = require("../../../../../infra/db/mongodb/survey/survey-mongo-repository");
var db_load_surveys_1 = require("../../../../../data/usecases/survey/load-surveys/db-load-surveys");
var makeDbLoadSurveys = function () {
    var surveyMongoRepository = new survey_mongo_repository_1.SurveyMongoRepository();
    return new db_load_surveys_1.DbLoadSurveys(surveyMongoRepository);
};
exports.makeDbLoadSurveys = makeDbLoadSurveys;
