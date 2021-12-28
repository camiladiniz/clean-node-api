"use strict";
exports.__esModule = true;
exports.makeDbLoadSurveyById = void 0;
var survey_mongo_repository_1 = require("../../../../../infra/db/mongodb/survey/survey-mongo-repository");
var db_load_survey_by_id_1 = require("@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id");
var makeDbLoadSurveyById = function () {
    var surveyMongoRepository = new survey_mongo_repository_1.SurveyMongoRepository();
    return new db_load_survey_by_id_1.DbLoadSurveyById(surveyMongoRepository);
};
exports.makeDbLoadSurveyById = makeDbLoadSurveyById;
