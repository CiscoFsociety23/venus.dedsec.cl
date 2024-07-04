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
    };

    public async createCategory(category: string){
        console.log(`[info]: Creando la categoria ${category}`);
        const createProduct = await this.prisma.categoria.create({data: { nombre: category }})
        console.log(`[info]: Categoria ${category}, creada con exito. ID: ${createProduct.id}`);
        return createProduct;
    };

};

export { CategoriaService }
