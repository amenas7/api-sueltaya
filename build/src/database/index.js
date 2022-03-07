"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
configuracion de conexion de BD en mongo DB
*/
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../shared/config"));
const env = (0, config_1.default)();
// const url = env.DB_CONNECTION || "";
// const url = env.DB_CONNECTION ?? "";
const url = env.DB_CONNECTION;
// let url = env.DB_CONNECTION;
const DB_CONNECTION = async () => {
    try {
        // if(!url){
        // 	url = "";
        // }
        await mongoose_1.default.connect(url.replace("<user>", env.DB_USER).replace("<password>", env.DB_PASSWORD));
        console.log("La base de datos se ha conectado satisfactoriamente!");
    }
    catch (error) {
        Promise.reject(error);
    }
};
exports.default = DB_CONNECTION;
// function sumar(a,b,total) {
// 	total(a+b);
// }
// 			//total
// sumar(1,4, function(result) {
// 	console.log(result)
// })
