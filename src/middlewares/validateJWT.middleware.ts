import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        console.log({authorization});
        if(!authorization){
            res.status(401).send({
                message: 'Faltan credenciaales o usuario no conocido'
            });
            return;
        }
        const { uid }: any = JWT.verify(authorization.replace("Bearer ", ""), 'D1pl0Mad0'!);
        //@ts-ignore
        req.uid = uid;
        next();
    } catch (error) {
        res.status(500).send({
            message: 'Ha ocurrido un problema', error
        });
    }}
    export default validateJWT;