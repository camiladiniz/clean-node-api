"use strict";
exports.__esModule = true;
exports.makeSaveSurveyResultController = void 0;
var log_controller_decorator_factory_1 = require("../../../decorators/log-controller-decorator-factory");
var save_survey_result_controller_1 = require("@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller");
var db_load_survey_by_id_factory_1 = require("@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory");
var db_save_survey_result_factory_1 = require("@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory");
var makeSaveSurveyResultController = function () {
    var controller = new save_survey_result_controller_1.SaveSurveyResultController(db_load_survey_by_id_factory_1.makeDbLoadSurveyById(), db_save_survey_result_factory_1.makeDbSaveSurveyResult());
    return log_controller_decorator_factory_1.makeLogControllerDecorator(controller);
};
exports.makeSaveSurveyResultController = makeSaveSurveyResultController;
