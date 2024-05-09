import express, { Router, Request, Response } from 'express';
import { InventoryService } from '../services/inventoryService';

const inventoryController: Router = express.Router();
const inventoryService: InventoryService = new InventoryService();

inventoryController.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await inventoryService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    }
});

inventoryController.post('/products', async (req: Request, res: Response) => {
    try {
        const dataProduct = req.body;
        const createProduct = await inventoryService.createProduct(dataProduct);
        res.json(createProduct);
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    }
});

inventoryController.get('/categories', async (req: Request, res: Response) => {
    try {
        const category = await inventoryService.getAllCategories();
        res.json(category);
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    }
});

export { inventoryController };