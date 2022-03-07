"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// path: api/test
const express_1 = require("express");
const test_controller_1 = require("../controllers/test.controller");
const router = (0, express_1.Router)();
// router.get('/', (req, res) => {
// 	getAll(req, res);
// });
router.get('/', test_controller_1.getAll);
router.post('/', test_controller_1.create);
exports.default = router;
