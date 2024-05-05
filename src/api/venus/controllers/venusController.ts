import express, { Router, Request, Response } from "express";
import { VenusService } from "../services/venusService";
import { serviceInformation } from "../interfaces/controllers/informationsInterface";

const venusController: Router = express.Router();
const venusService: VenusService = new VenusService();

venusController.get('/', async (req: Request, res: Response) => {
    try {
        const getStatus: serviceInformation = await venusService.getServiceStatus();
        res.json(getStatus);
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    };
});

export { venusController };
