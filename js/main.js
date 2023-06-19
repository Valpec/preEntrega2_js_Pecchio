class Producto {
    constructor(id, categoria, nombre, precio) {
        this.id = id,
            this.categoria = categoria,
            this.nombre = nombre,
            this.precio = precio
    }
    mostrarProducto() {
        console.log(`${this.id} | ${this.categoria} | ${this.nombre} | $${this.precio}`)
    }
}
// objetos del catalogo
const prod1 = new Producto(1, "Vela", "Alba", 3500)
const prod2 = new Producto(2, "Vela", "Bir", 3700)
const prod3 = new Producto(3, "Vela", "Cata", 3000)
const prod4 = new Producto(4, "Aromatizador", "Diana", 2000)
const prod5 = new Producto(5, "Aromatizador", "Rita", 2500)
const prod6 = new Producto(6, "Textil", "Manta", 1500)
const prod7 = new Producto(7, "Textil", "Almohadon Liso", 2500)
const prod8 = new Producto(8, "Textil", "Camino de mesa", 1700)
const prod9 = new Producto(9, "Decoracion", "Colgante Corazon", 1000)
const prod10 = new Producto(10, "Decoracion", "Ramo de flores de tela", 2000)

const catalogo = []
catalogo.push(prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10)

// funcion para mostrar por consola los arrays con objetos Producto
function mostrarArrayProducto(array) {
    console.log(`ID  |     Categoria    |    Nombre   |  Precio`)
    array.forEach(
        prod => prod.mostrarProducto()
    )
}

function agregarProds(catalogo, carrito) {
    let eleccion
    // muestro catalogo por console.log 
    console.log(`\nCatalogo:`)
    mostrarArrayProducto(catalogo)

    do {
        eleccion = parseInt(prompt(`El catálogo se encuentra en la consola.\nSeleccione la ID del producto que desea agregar \nPresione 0 si desea finalizar la operación`))
        while (isNaN(eleccion) || eleccion > catalogo.length || eleccion < 0) {
            eleccion = parseInt(prompt(`El valor ingresado no es una opción correcta. Ingrese un ID correcto`))
        }

        // aunque la eleccion sea 0, el ciclo se va a realizar por completo, asi que controlo que no se agrege un elemento con indice -1
        if (eleccion != 0) {
            carrito.push(catalogo[eleccion - 1])
            console.log(`Producto ${catalogo[eleccion - 1].categoria}, de ID ${catalogo[eleccion - 1].id} agregado exitosamente al carrito !`)
        }
    }
    while (eleccion != 0)
    // cada vez que agrego elementos al carrito, lo devuelvo ordenado por id para que sea mas facil de visualizar en operaciones posteriores
    carrito = carrito.sort((a, b) => a.id - b.id)
    alert(`Operación finalizada`)
}


function verCarrito(carrito) {
    // acumulo en la variable el total de los productos agregados. 
    let valorCarrito = carrito.reduce((acum, prod) => acum + prod.precio, 0)
    if (carrito.length == 0) {
        alert(`Por el momento su carrito esta vacio`)
    } else {
        console.log(`\n El monto total del carrito hasta el momento es $${valorCarrito} y su contenido  es:`)
        mostrarArrayProducto(carrito)
    }
    return valorCarrito
}


function elminarCarrito(carrito) {
    // me aseguro que hay elementos en el carrito que eliminar
    if (carrito.length != 0) {
        console.log(`\nSu carrito:`)
        mostrarArrayProducto(carrito)

        // despues de mostrar el contenido, pido id del producto que quiere eliminar y le doy 0 como oportunidad de arrepentirse
        let borrar = parseInt(prompt(`Puede visualizar los elementos actuales en el carrito en la consola. Seleccione la ID del producto que desea eliminar. \n Seleccione 0 si desea cancelar la operación`))
        // guardo en un array todos los id de los productos
        let carrId = carrito.map(prod => prod.id)

        // busco primer y ultimo indice del id que se quiere buscar
        let indice = carrId.indexOf(borrar)
        let ultIndice = carrId.lastIndexOf(borrar)

        if (borrar == 0) {
            alert(`Se ha cancelado la operación. No se eliminó ningun producto del carrito.`)
        }

        // si la busqueda del indice da -1, es porque no existe prod con ese id
        else if (indice < 0) {
            alert(`No se encontraron productos con ese ID`)
            return
        }

        // si no se quiso salir y si es qeu existe un producto con ese id, se revisa la cantidad de productos que existen y se eliminan segun se ve:
        else {
            // la variable diferencia es la cantidad de productos que se encontraron con ese id
            let diferencia = (ultIndice - indice) + 1

            let cant = parseInt(prompt(`Se han encontrado ${diferencia} productos con ese ID. ¿Cuántos desea eliminar?`))
            while (cant > diferencia) {
                cant = parseInt(prompt(`No se pueden eliminar mas productos de los  que ya tiene en el carrito. (${diferencia}). Por favor intente nuevamente`))
            }
            carrito.splice(indice, cant)
            alert(`El carrito ha sido actualizado`)
            console.log(`\nEl carrito ha sido actualizado:`)
            mostrarArrayProducto(carrito)
        }

    } else {
        alert(`No se pueden eliminar productos del carrito si éste está vacio`)
    }
}


function realizarCompra(carrito) {
    let salir_compra = false
    let monto = carrito.reduce((acum, prod) => acum + prod.precio, 0)

    do {
        let medio_pago = prompt(`Seleccione un medio de pago
        1. Tarjeta credito
        2. Transferencia
        0. Volver a menu`)

        switch (medio_pago) {
            case "1":
            case "2":
                //si existe algo en el carrito, por ahora, se procede igual sin importar la forma de pago
                if (monto > 0) {
                    alert(`La compra fue realizada exitosamente. Muchas gracias por comprar productos en nuestro emprendimiento`)
                    salir_menu = true
                }
                // si no existe nada en el carrito
                else {
                    alert(`La compra no pudo ser realizada. No hay elementos en el carrito.`)
                    salir_menu = false
                }
                salir_compra = true
                break
            // salir sin seleccionar metodo de pago
            case "0":
                alert('La compra no fue realizada.')
                salir_compra = true
                salir_menu = false
                break
            default:
                alert(`La opción ingresada no es correcta. Intente nuevamente`)
                break
        }
    }
    while (!salir_compra)
    return salir_menu
}


// funcion principal de menu 
function menu(nombre, catalogo) {
    // inicializo valores 
    let salir_menu = false
    const carrito = []

    do {
        let opcion = prompt(`Nos alegra que quiera comprar con nosotros ${nombre}. Seleccione una de las siguientes opciones
    1. Agregar productos al carrito
    2. Ver carrito
    3. Eliminar productos del carrito
    4. Finalizar compra
    0. Cancelar compra`)
        switch (opcion) {
            case "1":
                agregarProds(catalogo, carrito)
                break
            case "2":
                verCarrito(carrito)
                break
            case "3":
                elminarCarrito(carrito)
                break
            case "4":
                salir_menu = realizarCompra(carrito)
                break
            case "0":
                alert(`La compra fue cancelada. Gracias por visitarnos.`)
                salir_menu = true
                break
            default:
                alert(`${opcion} No es una opcion valida. Por favor intente de nuevo`)
                break
        }
    }
    while (!salir_menu)
}

// inicio de simulador. llamada a la funcion principal
let nombre = prompt(`¡Hola! Te damos la bienvenida al carrito de Cattalina DECO-HOME. \n¡Por favor, abre tu consola para poder interactuar con las siguientes opciones!\n
    -Ingresa tu nombre para continuar`)

menu(nombre, catalogo)
