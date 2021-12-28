"use strict";
exports.__esModule = true;
exports.makeLoadSurveysController = void 0;
var log_controller_decorator_factory_1 = require("../../../decorators/log-controller-decorator-factory");
var load_surveys_controller_1 = require("../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller");
var db_load_surveys_factory_1 = require("../../../usecases/survey/load-surveys/db-load-surveys-factory");
var makeLoadSurveysController = function () {
    var controller = new load_surveys_controller_1.LoadSurveysController(db_load_surveys_factory_1.makeDbLoadSurveys());
    return log_controller_decorator_factory_1.makeLogControllerDecorator(controller);
};
exports.makeLoadSurveysController = makeLoadSurveysController;
