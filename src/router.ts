import express, { Express, Router } from 'express';
import { venusController } from './api/venus/controllers/venusController';
import { inventoryController } from './api/venus/controllers/inventoryController';

class Routing {

    public apiRouter(app: Express) {
        const router: Router = express.Router();
        app.use('/api-venus/', venusController);
        app.use('/api-venus/inventory', inventoryController);
    };

};

export { Routing };
