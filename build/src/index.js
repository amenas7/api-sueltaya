"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const config_1 = __importDefault(require("./shared/config"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const env = (0, config_1.default)();
(0, database_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
let PORT = env.PORT; // 80 - 655NN
const url = `http://localhost:${PORT}`;
app.get('/', (request, response) => {
    const { params, query, body } = request;
    console.log({ params, query, body });
    response.send({
        success: true,
        message: 'El Servidor se esta ejecutando correctamente!'
    });
});
app.use('/api', index_routes_1.default);
app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en el puerto ${PORT}, visite: ${url} `);
    console.log(`El ambiente de desarrollo es: ${process.env.NODE_ENV}`);
});
