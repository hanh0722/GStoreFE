import express from 'express';

import LoginController from '../controller/login.mjs';
const Router = express.Router();

Router.post("/login", LoginController);

export default Router;