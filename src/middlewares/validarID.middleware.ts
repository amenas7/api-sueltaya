import { Request, Response, NextFunction } from 'express';


const validarIDproducto = (req: Request, res: Response, next: NextFunction) => {

    try {
        // leer id
        const { _id } = req.body;

        if( !_id ) {
            return res.send({
                msg: 'El campo id es obligatorio'
            });
        }
        next();

    } catch (error) {
        return res.send({
            msg: error
        });
    }   
    
}

export default validarIDproducto;