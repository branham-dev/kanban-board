import { Hono } from 'hono';
import * as Controller from './auth.controller.js';

const authRoute = new Hono();

authRoute.post('register', Controller.register);
authRoute.post('login', Controller.login);
authRoute.get('me', Controller.current);

export default authRoute;
