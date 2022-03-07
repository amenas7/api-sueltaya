// path: api/test
import { Router } from 'express';
import { getAll, create } from '../controllers/test.controller';

const router = Router();

// router.get('/', (req, res) => {
// 	getAll(req, res);
// });
router.get('/', getAll); 
router.post('/', create );
 
export default router;