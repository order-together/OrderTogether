import { Router } from 'express';
import RateController from '../controller/rateController';

const router = Router();

router.post('/ratings', RateController.addRating);

export default router;
