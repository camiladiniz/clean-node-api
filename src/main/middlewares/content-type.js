"use strict";
exports.__esModule = true;
exports.contentType = void 0;
var contentType = function (req, res, next) {
    // temos que chamar enxt dps de todos os middlewares senão requisição fica amarrada
    res.type('json');
    next();
};
exports.contentType = contentType;
