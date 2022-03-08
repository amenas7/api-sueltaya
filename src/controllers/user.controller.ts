"use strict";
import nodemailer from 'nodemailer';
import { Request, Response } from "express";
import UserModel from "../models/User.model";
import CrudRepository from "../shared/repository/CrudRepository";
import UserRepository from "../shared/repository/UserRepository";
import { encrypt } from "../shared/utils/crypt";
//import jwt from 'jsonwebtoken';
import getTokenData from "./../shared/utils/config";
import bcrypt from 'bcrypt';

class UserController implements CrudRepository {
	constructor(){}

	public async getAll(_: Request, res: Response): Promise<void> {
		try {
			const users = await UserModel.find();
			res.send({users, message: 'Lista de usuarios obtenida', success: true});
			return
		} catch (error) {
			res.send({error, message: 'Ha ocurrido un problema', success: false});
		}
	}

	public async getById(req: Request, res: Response): Promise<void> {
		try {
			const { _id } = req.params;
			const user = await UserModel.findById(_id);
			if(!user){
				res.send({message: 'Usuario no encontrado', success:false}).status(404);
				return;
			}
			res.send({message: 'Usuaario encontrado', user, success:true});
		} catch (error) {
			res.send({error, message: 'Ha ocurrido un problema', success: false});
		}
	}

	public async create(req: Request, res: Response): Promise<void> {
		try {
			const user = req.body as UserRepository;

			const tmp_email = user.email;

			const Buscaruser = await UserModel.findOne( {email: tmp_email} );
			
			if(Buscaruser){
				res.status(404).send({ok: false, message: 'Ya existe una cuenta registrada con este correo'});
				return;
			}

			user.password = encrypt(user.password!);
			const userDb = new UserModel(user);
			await userDb.save();

			//
			//const token = getToken();
			const salt = bcrypt.genSaltSync();
    		const token = bcrypt.hashSync( tmp_email, salt );

			//return console.log(token);

			// const token = jwt.sign({
			// 	email: tmp_email 
			// }, 'SECRET', { expiresIn: '5d' })

			//return console.log(token);

			//enviando correo
			async function main() {
				let transporter = nodemailer.createTransport({
				host: "email-smtp.us-east-1.amazonaws.com",
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: 'AKIAUKBIQ63CIWYCN36V', // generated ethereal user
					pass: 'BLIaMiuzRhig3PChcz5D/QNVFobwNbBCQkCjDceIrIcY', // generated ethereal password
				},
				});
			
				// send mail with defined transport object
				let info = await transporter.sendMail({
				from: 'amenas94@gmail.com', // sender address
				to: `${user.email}`, // list of receivers
				subject: "✔ Activa tu cuenta de SueltaYa! ", // Subject line
				//text: "Funcionamiento correcto", // plain text body
				html: `<!DOCTYPE html>
				<html lang="en">
				<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<link rel="preconnect" href="https://fonts.googleapis.com">
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
				<title>Document</title>
				<style>
					.card {
					border-width: 1px;
					border-style: solid;
					border-color: #E0E0E0;
					border-radius: 8px;
					padding: 16px;
					max-width: 512px;
					margin-left: auto;
					margin-right: auto;
					}
					.title {
					color: #202124;
					width: 100%;
					}
					ul {
					color: #202124;
					}
				</style>
				</head>
				<body>
				<div class="card">
					<div class="title">
					<img style="margin-left: auto; margin-right: auto; display: block;width: 20%" src="https://i.postimg.cc/LXrK9R2V/logo-email-sueltaya.png">
					</div>
					<p style="font-family: 'Ubuntu', sans-serif; font-size: 16px; padding-left: 20px; padding-right: 20px; text-align: center;"> Te damos la bienvenida a la familia de SueltaYa!, recuerda que para poder usar nuestra plataforma es necesario confirmar tu correo electrónico a través del siguiente enlace: </p>

					<div style="margin-left: auto; margin-right: auto; display: block; font-size: 25px; text-align: center;">
					<a href="https://appsueltaya.web.app/verify-account/${token}" style="font-family: 'Ubuntu', sans-serif; padding: 12px; color: white; background-color: #00A9E3; border-radius: 5px; text-decoration: none"> Activar mi cuenta</a> 
					</div>	
					
					<br>
					<div style="color: #757575; margin-left: auto;  margin-right: auto; text-align: center;">
					<small>⚡ Email generado automáticamente, favor no responder ⚡</small> <br>
					<small> © 2022 SueltaYa! </small>
					</div>
				</div>
				</body>
				</html>`, // html body
				});
			
				console.log("Message sent: %s", info.messageId);
				console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
			}

			main().catch(console.error);
			
			res.send({userDb, message: 'Usuario creado correctamente'})	
		} catch (error) {
			console.log(error);
			res.send({error, message: 'Problemas al crear el usuario'})
		}
	}

	public async confirmAccount(req: Request, res: Response): Promise<void> {
		try {
			//const user = req.body as UserRepository;
			// Obtener el token
			const { token } = req.params;
       
			// Verificar la data
			const data = await getTokenData(token);

			if(!data) {
				res.json({
					success: false,
					msg: 'Error al obtener data'
				});
		   }

		   const email = data!['email'];

		   const Buscaruser = await UserModel.findOne( {email: email} );
			
			if(!Buscaruser){
				res.status(404).send({ok: false, message: 'El usuario no existe'});
				return;
			}

			// Actualizar usuario
			await UserModel.updateOne( { email : email }, {$set: { state: "true", verify: "true" } }, {
				returnDocument: 'after'
			})

			res.status(200).json({
				ok: true,
				message: "Usuario confirmado correctamente"
			})

		} catch (error) {
			console.log(error);
			res.send({error, message: 'Problemas al confirmar el usuario'})
		}
	}

	public async createSocial(req: Request, res: Response): Promise<void> {
		try {
			const user = req.body as UserRepository;

			//const tmp_email = user.email;

			// const Buscaruser = await UserModel.findOne( {email: tmp_email} );
			
			// if(Buscaruser){
			// 	res.status(404).send({ok: false, message: 'Ya existe una cuenta registrada con este correo'});
			// 	return;
			// }

			//user.password = encrypt(user.password!);
			const userDb = new UserModel(user);
			await userDb.save();
			
			res.send({userDb, message: 'Usuario creado correctamente'})	
		} catch (error) {
			console.log(error);
			res.send({error, message: 'Problemas al crear el usuario'})
		}
	}

	public async update(req: Request, res: Response): Promise<void> {
		try {
			const { _id, ...body} = req.body;
			if(!_id){
				res.send({error: {code: 1, message: 'falta parametros'}, message:'La propiedad id es obligatoria', success: false});
			}
			if(body.password){
				body.password = encrypt(body.password);
			}
			const userFinded = await UserModel.findByIdAndUpdate(_id, {...body}, {
				returnDocument: 'after'
			}) //...body => {name: 'actualizada'}
			res.send({user: userFinded, message: 'actualizado correctamente', success: true});
		} catch (error) {
			res.send({error, message: 'Problemas al actualizar el usuario'})

		}
	}

	public async delete(req: Request, res: Response) {
		try {
			const { _id } = req.params;
			if(!_id){
				res.send({error: {code: 1, message: 'falta parametros'}, message:'La propiedad id es obligatoria', success: false});
			}
			await UserModel.deleteOne({_id});
			res.send({message: 'Usuario eliminado correctamente', success: true});
		} catch (error) {
			res.send({error, message: 'Problemas al eliminar el usuario'})
		}
	}
}

export default UserController;