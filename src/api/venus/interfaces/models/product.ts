export interface Product {
    id:          number;
    nombre:      string;
    descripcion: string;
    categoria:   CategoriaProducto;
    precio:      number;
    stock:       number;
}

export interface CategoriaProducto {
    nombre: string;
}

export interface Categoria {
    id:     number;
    nombre: string;
}
