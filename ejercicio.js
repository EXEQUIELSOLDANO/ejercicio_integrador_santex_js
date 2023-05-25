class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}

// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */

    //Enunciado 1

    async agregarProducto(sku, cantidad) {
        console.log(`Agregando ${cantidad} ${sku}`);

        try {
            // Busco el producto en la "base de datos"
            const producto = await findProductBySku(sku);
            //console.log("Producto encontrado", producto);
            // Validamos y buscamos el producto en el carrito
            let productoCarro = this.productos.find(producto => producto.sku === sku);
            if (productoCarro) {
                // Si el producto ya existe, actualizo la cantidad 
                //console.log("Actualizando cantidad del producto", producto.nombre);
                productoCarro.cantidad += cantidad;
                ProductoEnCarrito.cantidad=productoCarro.cantidad;
                ProductoEnCarrito.precio = productoCarro.precio
                console.log(`Ingresó ${cantidad} unidades del producto ${producto.nombre}`);
                console.log(carrito);                
                
            } else {
                    // Creo un producto nuevo
                const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre,cantidad);
                this.productos.push(nuevoProducto);     
                console.log(`Ingresó ${cantidad} unidades del producto ${producto.nombre}`);           
                console.log(carrito);
                

                // Verifico si la categoría ya está en la lista de categorías.
                if (!this.categorias.includes(producto.categoria)) {
                // Si la categoría no está en la lista, la agrego
                    this.categorias.push(producto.categoria);
                }
            }   

            this.precioTotal = this.precioTotal + (producto.precio * cantidad);
            }
         
        catch (error) {
            const mensaje = "Error: " + error
            console.log(mensaje);
        }
    }

    //ENUNCIADO 2
    
       
    eliminarProducto(sku, cantidad) {        
        return new Promise((resolve, reject) => {             
            try {
                setTimeout(() => {                    
                    //Busco el indice del producto a "eliminar" en el array de productos, para luego usar 
                    //la funcion splice                           
                    const indiceProducto = this.productos.findIndex(p => p.sku === sku);
                    if ( indiceProducto === -1) {   //Si no cumple la condición devulve -1
                        reject(new Error(`El producto ${sku} que desea eliminar no se encuentra en el carrito`));                         
                    }
                    else
            {           
                        const buscarPrecio = (sku) => {           
                            const productoEncontrado = productosDelSuper.find(product => product.sku === sku);
                            return productoEncontrado.precio       
                        } 
                        let precioEliminado = buscarPrecio(sku);
                                    
                        const producto = this.productos[indiceProducto];
                                                           
                        if (cantidad === producto.cantidad) {
                            console.log()
                            this.categorias.splice(indiceProducto,1);                            
                            this.productos.splice(indiceProducto, 1);                            
                            resolve(`Se eliminó el producto ${producto.nombre} del carrito`);
                            this.precioTotal = this.precioTotal - (precioEliminado * cantidad)    
                            
                        } 
                        else if (cantidad < producto.cantidad ){
                            producto.cantidad -= cantidad;                              
                            resolve(`se eliminó la cantidad de ${cantidad} del producto ${producto.nombre} del carrito`);
                            this.precioTotal = this.precioTotal - (precioEliminado * cantidad)    
 
                        }
                        else {
                            throw new Error("vuelva a ingresar la cantidad deseada");
                        }
                        
                    }                    
                }, 3000);
            } catch (error) {
                console.log("Error: " + Error)
            }
                       
        });
    }
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`El producto ${sku} no se encuentra en el listado del productos del Supermercado`);
            }
        }, 1500);
    });
}       
        

const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);

carrito.agregarProducto('WE328NJ', 4);

carrito.agregarProducto('KS944RUR', 8)

//ENUNCIADO 3

const eliminar = carrito.eliminarProducto('WE328NJ')

eliminar.then((resultado) => {console.log(resultado);console.log(carrito);}).catch((error) => {console.log(error)});