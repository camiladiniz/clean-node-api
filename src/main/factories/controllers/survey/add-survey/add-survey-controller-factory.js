"use strict";
exports.__esModule = true;
exports.makeAddSurveyController = void 0;
var log_controller_decorator_factory_1 = require("../../../decorators/log-controller-decorator-factory");
var add_survey_controller_1 = require("../../../../../presentation/controllers/survey/add-survey/add-survey-controller");
var add_survey_validation_factory_1 = require("./add-survey-validation-factory");
var db_add_survey_factory_1 = require("../../../usecases/survey/add-survey/db-add-survey-factory");
var makeAddSurveyController = function () {
    var controller = new add_survey_controller_1.AddSurveyController(add_survey_validation_factory_1.makeAddSurveyValidation(), db_add_survey_factory_1.makeDbAddSurvey());
    return log_controller_decorator_factory_1.makeLogControllerDecorator(controller);
};
exports.makeAddSurveyController = makeAddSurveyController;
