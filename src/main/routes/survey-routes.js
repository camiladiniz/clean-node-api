"use strict";
exports.__esModule = true;
var express_route_adapter_1 = require("../adapters/express-route-adapter");
var add_survey_controller_factory_1 = require("../factories/controllers/survey/add-survey/add-survey-controller-factory");
var load_surveys_controller_factory_1 = require("../factories/controllers/survey/load-surveys/load-surveys-controller-factory");
var admin_auth_1 = require("../middlewares/admin-auth");
var auth_1 = require("../middlewares/auth");
// para não precisar criar as rotas dos controllers manualmente
// export default (router: Router): void => {
//   router.post('/signup', (req, res) => {
//     res.json({ ok: 'ok' })
//   })
// }
exports["default"] = (function (router) {
    // vai adaptar o controller e vai retornar em um formato que express entende
    router.post('/surveys', admin_auth_1.adminAuth, express_route_adapter_1.adaptRoute(add_survey_controller_factory_1.makeAddSurveyController()));
    router.get('/surveys', auth_1.auth, express_route_adapter_1.adaptRoute(load_surveys_controller_factory_1.makeLoadSurveysController()));
});
