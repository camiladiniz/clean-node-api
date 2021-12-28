"use strict";
exports.__esModule = true;
exports.cors = void 0;
var cors = function (req, res, next) {
    // temos que chamar enxt dps de todos os middlewares senão requisição fica amarrada
    res.set('access-control-allow-origin', '*');
    res.set('access-control-allow-methods', '*');
    res.set('access-control-allow-headers', '*');
    next();
};
exports.cors = cors;
