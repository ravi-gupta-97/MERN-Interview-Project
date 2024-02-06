import express from 'express';
import { getUser, signin, signup } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authentication.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getUser', verifyToken, getUser);

export default router;