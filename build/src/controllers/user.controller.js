"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../models/User.model"));
class UserController {
    constructor() { }
    async getAll(_, res) {
        try {
            const users = await User_model_1.default.find();
            res.send({ users, message: 'Lista de usuarios obtenida', success: true });
            return;
        }
        catch (error) {
            res.send({ error, message: 'Ha ocurrido un problema', success: false });
        }
    }
    async getById(req, res) {
        try {
            const { _id } = req.params;
            const user = await User_model_1.default.findById(_id);
            if (!user) {
                res.send({ message: 'Usuario no encontrado', success: false }).status(404);
                return;
            }
            res.send({ message: 'Usuaario encontrado', user, success: true });
        }
        catch (error) {
            res.send({ error, message: 'Ha ocurrido un problema', success: false });
        }
    }
    async create(req, res) {
        try {
            const user = req.body;
            const userDb = new User_model_1.default(user);
            await userDb.save();
            res.send({ userDb, message: 'Usuario creado correctamente' });
        }
        catch (error) {
            res.send({ error, message: 'Problemas al crear el usuario' });
        }
    }
    async update(req, res) {
        try {
            const { _id, ...body } = req.body;
            if (!_id) {
                res.send({ error: { code: 1, message: 'falta parametros' }, message: 'La propiedad id es obligatoria', success: false });
            }
            const userFinded = await User_model_1.default.findByIdAndUpdate(_id, { ...body }, {
                returnDocument: 'after'
            }); //...body => {name: 'actualizada'}
            res.send({ user: userFinded, message: 'actualizado correctamente', success: true });
        }
        catch (error) {
            res.send({ error, message: 'Problemas al actualizar el usuario' });
        }
    }
    async delete(req, res) {
        try {
            const { _id } = req.params;
            if (!_id) {
                res.send({ error: { code: 1, message: 'falta parametros' }, message: 'La propiedad id es obligatoria', success: false });
            }
            await User_model_1.default.deleteOne({ _id });
            res.send({ message: 'Usuario eliminado correctamente', success: true });
        }
        catch (error) {
            res.send({ error, message: 'Problemas al eliminar el usuario' });
        }
    }
}
exports.default = UserController;
