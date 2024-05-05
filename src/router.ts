import express, { Express, Router } from 'express';
import { venusController } from './api/venus/controllers/venusController';

class Routing {

    public apiRouter(app: Express) {
        const router: Router = express.Router();
        app.use('/api-venus/', venusController);
    };

};

export { Routing };
