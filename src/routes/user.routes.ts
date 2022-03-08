// PATH : api/users
import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.get('/:_id', userController.getById);
router.post('/', userController.create);
router.post('/regsocial', userController.createSocial);
router.patch('/', userController.update);
router.get('/confirm/:token', userController.confirmAccount);
router.delete('/:_id', userController.delete);
export default router;