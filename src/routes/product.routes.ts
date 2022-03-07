import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { check } from 'express-validator';
import fieldValidator from '../middlewares/fieldValidator.middleware';
import validateJWT from '../middlewares/validateJWT.middleware';
import validarIDproducto from '../middlewares/validarID.middleware';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAll);

router.post('/', [
    validateJWT,
    check('category', 'La categoria es requerida').notEmpty(),
    check('description', 'La descripcion es requerida').notEmpty(),
    check('name', 'El nombre es requerida').notEmpty(),
    check('price', 'El precio es requerida').notEmpty().isNumeric(),
    check('images', 'Se requiere minimo una imagen').notEmpty().isArray(),
    check('ingredients', 'Los ingredientes son ibligatorios').notEmpty(),
    fieldValidator
],productController.create);

router.patch('/', [
    validarIDproducto // usando middleware propio
],productController.update);

export default router;