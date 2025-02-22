//definicion de textos del menu

const textos = {
    menu: "Selecciona una opción:\n1. Convertir moneda\n2. Agregar nueva moneda\n3. Salir",
    cantidad: "Ingresa la cantidad a convertir:",
    monedaOrigen: "Ingresa la moneda de origen (ejemplo: USD, EUR, ARS):",
    monedaDestino: "Ingresa la moneda de destino (ejemplo: USD, EUR, ARS):",
    resultado: (cantidad, nombreOrigen, resultado, nombreDestino) =>
        `${cantidad} ${nombreOrigen} equivale a ${resultado} ${nombreDestino}`,
    codigo: "Ingresa el código de la nueva moneda (ejemplo: BRL):",
    nombre: "Ingresa el nombre de la nueva moneda (ejemplo: Real brasilero):",
    tasa: "Ingresa la tasa de cambio respecto al USD (ejemplo: 5.0):",
    agregada: (codigo, nombre) => `Moneda ${codigo} (${nombre}) agregada correctamente.`,
    datoInvalido: "Datos inválidos. No se pudo agregar la moneda.",
    opcionInvalida: "Opción no válida. Intenta de nuevo.",
    salir: "Gracias por usar la app conversor de monedas. ¡Te esperamos pronto!",
    monedaNoSoportada: "Moneda no soportada.",
};

//array de objetos con la informacion de las monedas

let monedas = [
    { codigo: "USD", nombre: "Dólares estadounidenses", tasa: 1.0 },
    { codigo: "EUR", nombre: "Euros", tasa: 0.96 },
    { codigo: "ARS", nombre: "Pesos argentinos", tasa: 1057.77 },
];


// Función para obtener el nombre de una moneda

function obtenerNombreMoneda(codigo) {
    const moneda = monedas.find((moneda) => moneda.codigo === codigo);
    return moneda ? moneda.nombre : "Moneda desconocida";
}

// Función para convertir moneda

function convertirMoneda(cantidad, monedaOrigen, monedaDestino) {
    let tasaOrigen, tasaDestino;

    for (let i = 0; i < monedas.length; i++) {
        if (monedas[i].codigo === monedaOrigen) {
            tasaOrigen = monedas[i].tasa;
        }
        if (monedas[i].codigo === monedaDestino) {
            tasaDestino = monedas[i].tasa;
        }
    }

    if (tasaOrigen === undefined || tasaDestino === undefined) {
        return textos.monedaNoSoportada;
    }

    const cantidadEnUSD = cantidad / tasaOrigen;
    const cantidadConvertida = cantidadEnUSD * tasaDestino;

    return {
        cantidad: cantidadConvertida.toFixed(2),
        nombreOrigen: obtenerNombreMoneda(monedaOrigen),
        nombreDestino: obtenerNombreMoneda(monedaDestino),
    };
}

// Función para agregar una nueva moneda

function agregarMoneda() {
    const codigo = prompt(textos.codigo).toUpperCase();
    const nombre = prompt(textos.nombre);
    const tasa = parseFloat(prompt(textos.tasa));

    if (codigo && nombre && !isNaN(tasa)) {
        monedas.push({ codigo, nombre, tasa });
        alert(textos.agregada(codigo, nombre));
    } else {
        alert(textos.datoInvalido);
    }
}