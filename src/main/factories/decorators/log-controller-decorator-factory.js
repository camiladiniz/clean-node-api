"use strict";
exports.__esModule = true;
exports.makeLogControllerDecorator = void 0;
var log_controller_decorator_1 = require("../../decorators/log-controller-decorator");
var log_mongo_repository_1 = require("../../../infra/db/mongodb/log/log-mongo-repository");
var makeLogControllerDecorator = function (controller) {
    var logMongoRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(controller, logMongoRepository);
};
exports.makeLogControllerDecorator = makeLogControllerDecorator;
