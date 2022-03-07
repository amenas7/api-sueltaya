import { Router } from 'express';
import userRoute from './user.routes';
import authRoute from './auth.routes';
import productRoute from './product.routes';
import categoryRoute from './category.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/products', productRoute);
router.use('/category', categoryRoute);

export default router;