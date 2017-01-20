'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routerV = require('./router-v1');

var _routerV2 = _interopRequireDefault(_routerV);

var _routerV3 = require('./router-v2');

var _routerV4 = _interopRequireDefault(_routerV3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(function (req, res, next) {
   switch (req.headers.api_version) {
      case "1.0":
         (0, _routerV2.default)(req, res, next);
         break;

      case "2.0":
         (0, _routerV4.default)(req, res, next);
         break;

      default:
         (0, _routerV2.default)(req, res, next);
         break;
   }
});

exports.default = router;