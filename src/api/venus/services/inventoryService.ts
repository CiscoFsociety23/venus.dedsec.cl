import { PrismaClient } from '@prisma/client';

class InventoryService {

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

    public async getAllCategories(){
        console.log(`[info]: Obteniendo listado de categorias`);
        const category = await this.prisma.categoria.findMany();
        console.log(`[info]: Categorias encontradas ${category.length}`);
        return category;
    };

};

export { InventoryService };
