"use strict";
exports.__esModule = true;
exports.auth = void 0;
var express_middleware_adapter_1 = require("../adapters/express-middleware-adapter");
var auth_middleware_factory_1 = require("../factories/middlewares/auth-middleware-factory");
exports.auth = express_middleware_adapter_1.adaptMiddleware(auth_middleware_factory_1.makeAuthMiddleware());
