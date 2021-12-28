"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-misused-promises */
var save_survey_result_controller_factory_1 = require("@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory");
var express_route_adapter_1 = require("@/main/adapters/express-route-adapter");
var auth_1 = require("../middlewares/auth");
exports["default"] = (function (router) {
    // vai adaptar o controller e vai retornar em um formato que express entende
    router.put('/surveys/:surveyId/results', auth_1.auth, express_route_adapter_1.adaptRoute(save_survey_result_controller_factory_1.makeSaveSurveyResultController()));
});
