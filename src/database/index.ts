/* 
configuracion de conexion de BD en mongo DB
*/
import mongoose from 'mongoose';
//import initializeConfig from '../shared/config'
//const env = initializeConfig();

// const url = env.DB_CONNECTION || "";
// const url = env.DB_CONNECTION ?? "";
//const url = env.DB_CONNECTION! as string;
const url = 'mongodb+srv://amenas:amenas@cluster0.uht6q.mongodb.net/restaurante';
// let url = env.DB_CONNECTION;

const DB_CONNECTION = async () => {
	try {
		// if(!url){
		// 	url = "";
		// }
		await mongoose.connect(url)
		//await mongoose.connect(url.replace("<user>", env.DB_USER).replace("<password>", env.DB_PASSWORD))
		console.log("La base de datos se ha conectado satisfactoriamente!");
	} catch (error) {
		Promise.reject(error);
	}
}

export default DB_CONNECTION;


// function sumar(a,b,total) {
// 	total(a+b);
// }
// 			//total
// sumar(1,4, function(result) {
// 	console.log(result)
// })