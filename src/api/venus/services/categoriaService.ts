import { PrismaClient } from '@prisma/client';

class CategoriaService {

    private prisma: PrismaClient = new PrismaClient();

    public async getAllCategories(){
        console.log(`[info]: Obteniendo listado de categorias`);
        const category = await this.prisma.categoria.findMany();
        console.log(`[info]: Categorias encontradas ${category.length}`);
        return category;
    };

    public async getCategory(inputCategoriName: string){
        console.log(`[info]: Obteniendo categoria ${inputCategoriName}`);
        const [ category ] = await this.prisma.categoria.findMany({ where: { nombre: inputCategoriName }});
        console.log(`[info]: Categoria ${category.nombre} id ${category.id}`);
        return category;
    }

};

export { CategoriaService }
