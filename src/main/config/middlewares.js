"use strict";
exports.__esModule = true;
var middlewares_1 = require("../middlewares");
// use() é como middlewares são definidos
exports["default"] = (function (app) {
    app.use(middlewares_1.bodyParser);
    app.use(middlewares_1.cors);
    app.use(middlewares_1.contentType);
});
