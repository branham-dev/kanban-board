import { Hono } from 'hono';
import * as Controller from './auth.controller.js';
import { authenticate } from './middleware/auth.middleware.js';

const authRoute = new Hono();

authRoute.post('register', Controller.register);
authRoute.post('login', Controller.login);
authRoute.get('me', authenticate, Controller.current);
authRoute.post('logout', authenticate, Controller.logout);

export default authRoute;
