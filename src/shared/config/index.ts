//LINUX  - MAC
import path from 'path';
import dotenv from 'dotenv';
// WINDOWS
// const dotenv = require('dotenv);
// const path = require('path');
// require('dotenv').config();

let configInit: any = null;

function initializeConfig(){
	if(configInit){
		return configInit;
	}
	if(process.env.NODE_ENV !== "prod"){
		dotenv.config({
			path: path.resolve(__dirname, `../../../.env.${process.env.NODE_ENV}`) ///Users/ismael/Documents/proyectos/NodeJS/Diplomado-Backend-4/clase6/src/shared/config
		});
	}else {
		dotenv.config();
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

export default initializeConfig;