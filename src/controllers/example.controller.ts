import {personas, usuarios} from '../mock';
import { Request, Response } from 'express';
// CRUD
// Create - Read - Update - Delete
const getAll = (request: Request, response: Response) => {
	try {
		const { query } = request;
		console.log({query});
		// throw Error('Hay un error');
		return response.send({
			success: true,
			data: personas
		});
	} catch {
		return response.send({
			success: false,
			error: {
				code: '01',
				message: 'Ha ocurrido un error al obtener las personas'
			}
		})
	}
}

const getByName = (request: Request, response: Response) => {
	try {
		const { name } = request.params;
		const personaFinded = personas.filter((persona) => persona.nombre.toLowerCase() === name.toLowerCase());
		if(!personaFinded.length){
			return response.send({
				success: false, 
				error: {code: '02', message: 'Personas no encontradas'}
			});
		}
		return response.send({
			success: true,
			data: personaFinded
		});
	} catch {
		return response.send({
			success: false,
			error: {
				code: '01',
				message: 'Ha ocurrido un error al obtener las personas'
			}
		})
	}
}

const login = (request: Request, response: Response) => {
	try {
		const { username, password } = request.query;
		console.log('login!')
		const user = usuarios.some(usuario => usuario.username === username && usuario.password === password);
		if(!user){
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
		})

	} catch {
		return response.send({
			success: false,
			error: {
				code: '01',
				message: 'Ha ocurrido un error al obtener las personas'
			}
		})
	}
}

const loginPost = (request: Request, response: Response) => {
	try {
		const { username, password } = request.body;
		console.log('login!', request.body)
		const user = usuarios.some(usuario => usuario.username === username && usuario.password === password);
		if(!user){
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
		})

	} catch (err: any) {
		console.error(err);
		return response.send({
			success: false,
			error: {
				code: '01',
				message: 'Ha ocurrido un error al logearse'
			}
		})
	}
}

//TODO - crear una funcion de actualizar personas


export {
	getAll,
	getByName,
	login,
	loginPost
}