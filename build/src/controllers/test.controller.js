"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getAll = void 0;
const Test_model_1 = __importDefault(require("../models/Test.model"));
const getAll = async (_, res) => {
    try {
        const data = await Test_model_1.default.find(); // SELECT * FROM test
        res.send(data).status(200);
    }
    catch (error) {
        res.status(500).send({
            message: 'Ha ocurrido un error',
            error
        });
    }
};
exports.getAll = getAll;
const create = async (req, res) => {
    try {
        const testData = new Test_model_1.default(req.body); // { name: 'ismael', age: 24, cursos: []}
        await testData.save(); // INSERT INTO TABLE_NAME Values ()
        res.send({
            message: 'Registro creado correctamente'
        }).status(200);
    }
    catch (error) {
        res.status(500).send({
            message: 'Ha ocurrido un error',
            error
        });
    }
};
exports.create = create;
