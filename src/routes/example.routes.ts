// path: api/example
import { Router } from 'express';
import { getAll, getByName, login, loginPost } from '../controllers/example.controller';

const router = Router();

// router.get('/', (req, res) => {
// 	getAll(req, res);
// });
router.get('/', getAll); // /api/example/
router.get('/filter/:name', getByName); // /api/example/filter/cualquier-nombre
router.get('/loguin/', login); // api/example/loguin
router.post('/loguin', loginPost);

export default router;