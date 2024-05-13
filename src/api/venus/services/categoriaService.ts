import { PrismaClient } from '@prisma/client';

class CategoriaService {

    private prisma: PrismaClient = new PrismaClient();

    public async getAllCategories(){
        console.log(`[info]: Obteniendo listado de categorias`);
        const category = await this.prisma.categoria.findMany();
        console.log(`[info]: Categorias encontradas ${category.length}`);
        return category;
    };

};

export { CategoriaService }
