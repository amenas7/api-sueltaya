"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// path: api/example
const express_1 = require("express");
const example_controller_1 = require("../controllers/example.controller");
const router = (0, express_1.Router)();
// router.get('/', (req, res) => {
// 	getAll(req, res);
// });
router.get('/', example_controller_1.getAll); // /api/example/
router.get('/filter/:name', example_controller_1.getByName); // /api/example/filter/cualquier-nombre
router.get('/loguin/', example_controller_1.login); // api/example/loguin
router.post('/loguin', example_controller_1.loginPost);
exports.default = router;
