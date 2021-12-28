"use strict";
exports.__esModule = true;
var express_route_adapter_1 = require("../adapters/express-route-adapter");
var signup_controller_factory_1 = require("../factories/controllers/login/signup/signup-controller-factory");
var login_controller_factory_1 = require("../factories/controllers/login/login/login-controller-factory");
// para não precisar criar as rotas dos controllers manualmente
// export default (router: Router): void => {
//   router.post('/signup', (req, res) => {
//     res.json({ ok: 'ok' })
//   })
// }
exports["default"] = (function (router) {
    // vai adaptar o controller e vai retornar em um formato que express entende
    router.post('/signup', express_route_adapter_1.adaptRoute(signup_controller_factory_1.makeSignUpController()));
    router.post('/login', express_route_adapter_1.adaptRoute(login_controller_factory_1.makeLoginController()));
});
