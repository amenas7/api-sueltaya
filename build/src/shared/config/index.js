"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//LINUX  - MAC
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// WINDOWS
// const dotenv = require('dotenv);
// const path = require('path');
// require('dotenv').config();
let configInit = null;
function initializeConfig() {
    if (configInit) {
        return configInit;
    }
    if (process.env.NODE_ENV !== "prod") {
        dotenv_1.default.config({
            path: path_1.default.resolve(__dirname, `../../../.env.${process.env.NODE_ENV}`) ///Users/ismael/Documents/proyectos/NodeJS/Diplomado-Backend-4/clase6/src/shared/config
        });
    }
    else {
        dotenv_1.default.config();
    }
    configInit = process.env;
    return process.env;
}
// function initializeConfig(){
// 	if(!configInit){ // NO HAY CONFIG INIT
// 		config();
// 		configInit = process.env;
// 	}
// 	return configInit;
// }
exports.default = initializeConfig;
