"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = exports.numeros = exports.personas = void 0;
const personas = [
    {
        nombre: 'Ismael',
        edad: 24
    },
    {
        nombre: 'Ana',
        edad: 27
    },
    {
        nombre: 'Luis',
        edad: 21
    },
];
exports.personas = personas;
const usuarios = [
    {
        _id: 1,
        username: 'admin',
        password: 'admin123'
    },
    {
        _id: 2,
        username: 'role',
        password: '123456'
    },
    {
        _id: 3,
        username: 'ismael',
        password: 'ismael123'
    },
    {
        _id: 4,
        username: 'evelyn',
        password: 'evelyn123'
    },
];
exports.usuarios = usuarios;
// List<Int> numeros = new List<Int>(); JAVA
const numeros = [0, 1, 2, 3, 4];
exports.numeros = numeros;
// export defaults
exports.default = personas;
