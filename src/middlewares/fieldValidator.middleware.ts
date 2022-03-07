import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


function fieldValidator(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        console.log({mapped: errors.mapped()})
        if(!errors.isEmpty()){
            const keys = Object.keys(errors.mapped());
            const errorObject = keys.map((param) => { // error.name
                return {
                   campo: param, // "name"
                    mensaje: errors.mapped()[param].msg 
                }
            });
            res.status(400).send({
                message: 'Campos imcompletos o invalidos',
                error: errorObject
            })
            return;
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: 'Ha ocurrido un error',
            error
        })
    }
}

export default fieldValidator;