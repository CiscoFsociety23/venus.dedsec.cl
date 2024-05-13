import express, { Router, Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { CategoriaService } from '../services/categoriaService';
import { ProveedorService } from '../services/proveedorService';

const inventoryController: Router = express.Router();
const productService: ProductService = new ProductService();
const categorieService: CategoriaService = new CategoriaService();
const proveedorService: ProveedorService = new ProveedorService();

inventoryController.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    }
});

inventoryController.post('/products', async (req: Request, res: Response) => {
    try {
        const dataProduct = req.body;
        const createProduct = await productService.createProduct(dataProduct);
        if(createProduct.id){
            res.json({ status: true, producto: createProduct });
        } else {
            res.json({ status: false });
        }
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    }
});

inventoryController.delete('/products', async (req: Request, res: Response) => {
    try {
        const { productID } = req.query;
        const deleteProduct = await productService.deleteProduct(Number(productID));
        res.json({ status: true, res: 'Producto eliminado', deleteProduct });
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    }
});

inventoryController.get('/categories', async (req: Request, res: Response) => {
    try {
        const category = await categorieService.getAllCategories();
        res.json(category);
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    }
});

export { inventoryController };
