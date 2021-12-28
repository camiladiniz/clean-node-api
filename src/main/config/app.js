"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("./middlewares");
var routes_1 = require("./routes");
var app = express_1["default"]();
middlewares_1["default"](app);
routes_1["default"](app);
exports["default"] = app;
