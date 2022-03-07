"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPost = exports.login = exports.getByName = exports.getAll = void 0;
const mock_1 = require("../mock");
// CRUD
// Create - Read - Update - Delete
const getAll = (request, response) => {
    try {
        const { query } = request;
        console.log({ query });
        // throw Error('Hay un error');
        return response.send({
            success: true,
            data: mock_1.personas
        });
    }
    catch {
        return response.send({
            success: false,
            error: {
                code: '01',
                message: 'Ha ocurrido un error al obtener las personas'
            }
        });
    }
};
exports.getAll = getAll;
const getByName = (request, response) => {
    try {
        const { name } = request.params;
        const personaFinded = mock_1.personas.filter((persona) => persona.nombre.toLowerCase() === name.toLowerCase());
        if (!personaFinded.length) {
            return response.send({
                success: false,
                error: { code: '02', message: 'Personas no encontradas' }
            });
        }
        return response.send({
            success: true,
            data: personaFinded
        });
    }
    catch {
        return response.send({
            success: false,
            error: {
                code: '01',
                message: 'Ha ocurrido un error al obtener las personas'
            }
        });
    }
};
exports.getByName = getByName;
const login = (request, response) => {
    try {
        const { username, password } = request.query;
        console.log('login!');
        const user = mock_1.usuarios.some(usuario => usuario.username === username && usuario.password === password);
        if (!user) {
            return response.send({
                success: false,
                error: {
                    code: '03',
                    message: 'Usuario o password incorrecto'
                }
            });
        }
        return response.send({
            success: true,
            message: 'Usuario logeado correctamente'
        });
    }
    catch {
        return response.send({
            success: false,
            error: {
                code: '01',
                message: 'Ha ocurrido un error al obtener las personas'
            }
        });
    }
};
exports.login = login;
const loginPost = (request, response) => {
    try {
        const { username, password } = request.body;
        console.log('login!', request.body);
        const user = mock_1.usuarios.some(usuario => usuario.username === username && usuario.password === password);
        if (!user) {
            return response.send({
                success: false,
                error: {
                    code: '03',
                    message: 'Usuario o password incorrecto'
                }
            });
        }
        return response.send({
            success: true,
            message: 'Usuario logeado correctamente'
        });
    }
    catch (err) {
        console.error(err);
        return response.send({
            success: false,
            error: {
                code: '01',
                message: 'Ha ocurrido un error al logearse'
            }
        });
    }
};
exports.loginPost = loginPost;
