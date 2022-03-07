import { Request, Response } from 'express';
import CategoryModel from '../models/Category.model';

class CategoryController {
    async getAll(_: Request, res: Response) {
        try {
            const data = await CategoryModel.find();
            res.send({
                data,
                message: 'Lista de categorias'
            })
        } catch (error) {
            res.status(500).send({
                    error,
                    message: 'Ha ocurrido un error'
                })
        }
    }
}

export default CategoryController;