import { PrismaClient } from '@prisma/client';
import { CreateProduct } from '../interfaces/models/product';

class ProductService {

    private prisma: PrismaClient = new PrismaClient();

    public async getAllProducts(){
        console.log(`[info]: Obteniendo listado de productos`);
        const products = await this.prisma.producto.findMany({
            select: {
                id: true,
                nombre: true,
                descripcion: true,
                categoria: {
                    select: { nombre: true }
                },
                precio: true,
                stock: true
            }
        });
        console.log(`[info]: Productos encontrados ${products.length}`);
        return products;
    };

    public async createProduct(dataProduct: CreateProduct){
        console.log(`[info]: Creacion del producto ${dataProduct.nombre}`);
        const [ getCategoryID ] = await this.prisma.categoria.findMany({ select: { id: true }, where: { nombre: dataProduct.categoria } });
        const createProduct = await this.prisma.producto.create({
            data: {
                nombre: dataProduct.nombre,
                descripcion: dataProduct.descripcion,
                categoria: { connect: { id: getCategoryID.id } },
                precio: dataProduct.precio,
                stock: dataProduct.stock
            }
        });
        console.log(`[info]: Producto ${dataProduct.nombre} creado con el SKU ${createProduct.id}`);
        return createProduct;
    };

    public async deleteProduct(idProduct: number){
        console.log(`[info]: Se elimina el producto con id ${idProduct}`);
        const deleteP = await this.prisma.producto.delete({ where: { id: idProduct } });
        console.log(deleteP);
        return deleteP;
    };

    public async getProductById(productId: number){
        console.log(`[info]: Obteniendo producto con el SKU: ${productId}`);
        const product = await this.prisma.producto.findUnique({where: { id: productId }});
        return product;
    };

    public async shopProduct(productId: number, quantity: number){
        console.log(`[info]: Realizando compra del producto con el SKU: ${productId}`);
        const product = await this.getProductById(productId);
        const getQuantityAfterShop = Number(product?.stock) - quantity;
        console.log(`[info]: Realizando update en la base de datos`);
        const update = await this.prisma.producto.update({
            where: { id: productId },
            data: {
                precio: product?.precio,
                nombre: product?.nombre,
                descripcion: product?.descripcion,
                id_categoria: product?.id_categoria,
                stock: getQuantityAfterShop
            }
        });
        return update;
    };

};

export { ProductService }
