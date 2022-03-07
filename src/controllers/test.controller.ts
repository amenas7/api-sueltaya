import TestModel from "../models/Test.model";
import { Request, Response } from 'express';

const getAll = async (_: Request, res: Response) => {
	try {
		const data = await TestModel.find() // SELECT * FROM test
		res.send(data).status(200);
	} catch (error) {
		res.status(500).send({
			message: 'Ha ocurrido un error',
			error
		});
	}
}

const create = async (req: Request, res: Response) => {
	try {
		const testData = new TestModel(req.body); // { name: 'ismael', age: 24, cursos: []}
		await testData.save(); // INSERT INTO TABLE_NAME Values ()
		
		res.send({
			message: 'Registro creado correctamente'
		}).status(200);
	} catch (error) {
		res.status(500).send({
			message: 'Ha ocurrido un error',
			error
		});
	}
}

export { getAll, create }