"use strict";
import nodemailer from 'nodemailer';

import { Response, Request } from 'express';
import UserModel from '../models/User.model';
import { comparar } from '../shared/utils/crypt';
import generateJWT from '../shared/utils/generateJWT.util';
import { encrypt } from "../shared/utils/crypt";

class AuthController {
	
	public async login(req: Request, res: Response){
		try {
			const { email, password } = req.body;
			//verificar si existe el correo
			const user = await UserModel.findOne( {email} ); // SQL -> SELECT * FROM usuarios where email = "ejemplo@mail.com"
			if( !user ){
				return res.send({
					ok: false,
					message: 'Usuario no encontado', 
					error: { code: 'ER001', message: 'El usuario no existe'}}).status(404);
			}

			//verifica si aún no activa el correo
			const verificar = await UserModel.findOne( {email, verify: 'false'} );
			if(verificar){
				res.status(404).send({ok: false, message: 'Revisa tu correo y activa'});
				return;
			}

			// const verificar2 = await UserModel.findOne( {email, verify: 'false', state: 'true'} );
			// if(verificar2){
			// 	res.status(404).send({ok: false, message: 'Revisa tu correo y activa'});
			// 	return;
			// }

			//verifica si la cuenta está suspendida
			const suspendida = await UserModel.findOne( {email, state: 'false'} );
			if(suspendida){
				res.status(404).send({ok: false, message: 'Tu cuenta está suspendida'});
				return;
			}

			// const suspendida2 = await UserModel.findOne( {email, state: 'false', verify: 'false'} );
			// if(suspendida2){
			// 	res.status(404).send({ok: false, message: 'Tu cuenta está suspendida'});
			// 	return;
			// }

			//si todo está bien procede al login
			const validPassword = comparar(password, user.password);
			if(!validPassword){
				return res.send({
					ok: false,
					message: 'Usuario o contraseña incorrectos', 
					error: { code: 'ER002', message: 'Las credenciales son erroneas'}}).status(401);
			}
			const token = await generateJWT(user._id, email);
			return res.send({
				ok: true,
				message: 'Usuario loggeado correctamente', 
				token,
				data: user
			});
		} catch (error) {
			res.send({
				message: 'Ha ocurrido un error en el servidor', 
				error}).status(500);
		}
	}

	public async email_recovery(req: Request, res: Response){
		try {
			//const { _id, ...body } = req.body;
			const { email } = req.body;
			const user = await UserModel.findOne( {email} );
			
			if(!user){
				res.status(404).send({ok: false, message: 'Usuario no encontrado'});
				return;
			}

			//generando codigo aleatorio
			let num = Math.floor((Math.random() * (10-1))+1);
			let num2 = Math.floor((Math.random() * (10-1))+1);
			let num3 = Math.floor((Math.random() * (10-1))+1);
			let num4 = Math.floor((Math.random() * (10-1))+1);
			let aleatorio = num.toString()+num2.toString()+num3.toString()+num4.toString();
			console.log(aleatorio);

			await UserModel.updateOne( { _id : user._id }, {$set: { code_verification: aleatorio }}, {
				returnDocument: 'after'
			}) //...body => {name: 'actualizada'}


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
				to: `${email}`, // list of receivers
				subject: "Reinicia tu clave de SueltaYa! ✔", // Subject line
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
					<p style="font-family: 'Ubuntu', sans-serif; font-size: 16px; padding-left: 20px; padding-right: 20px; text-align: center;"> Ha solicitado el restablecimiento de su contraseña en SueltaYa!, motivo por el cual de parte de nuestro equipo este es su código de verificación: </p>

					<div style="margin-left: auto; margin-right: auto; display: block; font-size: 60px; text-align: center;"> <b style="color: #00A9E3; font-family: 'Ubuntu', sans-serif;">${aleatorio}</b> </div>	
					
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

			res.status(200).json({
				ok: true,
				message: "Correo enviado"
			})

		} catch (error) {
			res.send({
				message: 'Ha ocurrido un error en el servidor', 
				error: (error as Error).message }).status(500);
		}
	}

	public async cambiar_password(req: Request, res: Response){
		try {
			const { code, email, password } = req.body;
			const user = await UserModel.findOne( {email, code_verification: code} );
			
			if(!user){
				res.status(404).send({ok: false, message: 'Los datos ingresados no son correctos'});
				return;
			}

			const newpassword = encrypt(password);
			await UserModel.updateOne( { _id : user._id, code_verification: code }, {$set: { password: newpassword, code_verification: "" } }, {
				returnDocument: 'after'
			})

			res.status(200).json({
				ok: true,
				message: "Contraseña actualizada"
			})

		} catch (error) {
			res.send({
				message: 'Ha ocurrido un error en el servidor', 
				error: (error as Error).message }).status(500);
		}
	}

	public async verificar_code(req: Request, res: Response){
		try {
			const { code, email } = req.body;
			const user = await UserModel.findOne( {email, code_verification: code} );
			
			if(!user){
				res.status(404).send({ok: false, message: 'Los datos ingresados no son correctos'});
				return;
			}

			res.status(200).json({
				ok: true,
				message: "Codigo de verificación correcto"
			})

		} catch (error) {
			res.send({
				message: 'Ha ocurrido un error en el servidor', 
				error: (error as Error).message }).status(500);
		}
	}

}

export default AuthController;