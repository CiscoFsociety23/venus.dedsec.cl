import { PrismaClient } from '@prisma/client';

class CategoriaService {

    private prisma: PrismaClient = new PrismaClient();

    public async getAllCategories(){
        try {
            this.prisma.$connect();
            console.log(`[info]: Obteniendo listado de categorias`);
            const category = await this.prisma.categoria.findMany();
            console.log(`[info]: Categorias encontradas ${category.length}`);
            return category;
        } finally {
            this.prisma.$disconnect();
        }
    };

    public async getCategory(inputCategoriName: string){
        try {
            this.prisma.$connect();
            console.log(`[info]: Obteniendo categoria ${inputCategoriName}`);
            const [ category ] = await this.prisma.categoria.findMany({ where: { nombre: inputCategoriName }});
            console.log(`[info]: Categoria ${category.nombre} id ${category.id}`);
            return category;
        } finally {
            this.prisma.$disconnect();
        }
    };

    public async createCategory(category: string){
        try {
            this.prisma.$connect();
            console.log(`[info]: Creando la categoria ${category}`);
            const createProduct = await this.prisma.categoria.create({data: { nombre: category }})
            console.log(`[info]: Categoria ${category}, creada con exito. ID: ${createProduct.id}`);
            return createProduct;
        } finally {
            this.prisma.$disconnect();
        }
    };

};

export { CategoriaService }
