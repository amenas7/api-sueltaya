import { Request, Response } from 'express';
import ProductModel from '../models/Product.model';
import CrudRepository from '../shared/repository/CrudRepository';
import Product from '../shared/repository/ProductRepository';

class ProductController implements CrudRepository {
	async getAll(_: Request, res: Response) {
		try {
			const data = await ProductModel.find().populate("category", "name");
			if(data.length === 0){
				res.send({message: 'La lista de productos esta vacía', data}).status(204);
				return;
			}
			res.send({message: 'Productos listados correctamente', data});
			return;
		} catch (error) {
			res.send({
				error,
				message: 'Ha ocurrido un error en el servidor'
			}).status(500)
		}
	}

	async create(req: Request, res: Response) {
		try {
			const data = req.body as Product;
			const newProduct = new ProductModel(data);
			await newProduct.save();
			res.send({message: 'producto creado correctamente', data: newProduct});
		} catch (error) {
			res.status(500).send({
				error,
				message: 'Ha ocurrido un error en el servidor'
			})
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { _id, ...body } = req.body;

			const productUpdated = await ProductModel.findOneAndUpdate( { _id }, { ...body }, {
				returnDocument: 'after'
			});

			if (!productUpdated) {
				res.status(404).send({message: 'El producto no existe'});
			}

			res.send({message: 'producto actualizado correctamente', data: productUpdated})
		} catch (error) {
			res.status(500).send({
				error,
				message: 'Ha ocurrido un error en el servidor'
			})
		}
	}
}

export default ProductController;