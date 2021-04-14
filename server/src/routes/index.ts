import Router from 'express-promise-router';
import * as api from '../api';

const router = Router();

// TODO: Add actual logic, and define other endpoints
router.post('/login', api.login);

router.post('/signup', api.signup);

router.post('/verify_signup', api.verifySignUp);



export default router;
