import { Router } from 'express';
import CategoryController from '../controllers/categorycontroller';

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getAll);

export default router;