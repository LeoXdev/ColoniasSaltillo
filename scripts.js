"use strict";

const jsonsColonias = [
    'https://leoxdev.github.io/ColoniasSaltillo/coords/mexico/coahuila/saltillo.json',
    'https://leoxdev.github.io/ColoniasSaltillo/coords/mexico/san-luis-potosi/san-luis-potosi.json',
    //'https://leoxdev.github.io/ColoniasSaltillo/coords/mexico/cdmx.json',
];
// Cuando se quieran hacer pruebas con JSON locales, encender un
// localhost que sirva los JSON y usar este arreglo.
// Esto permite checar actualizaciones de múltiples colonias en lugar de una por una
// que era como se hacía con el código comentado que había antes.
/* const jsonsColonias = [
    'http://localhost:8080/mexico/coahuila/saltillo.json',
    'http://localhost:8080/mexico/san-luis-potosi/san-luis-potosi.json',
    //'.../cdmx.json',
]; */

// map se tornó una variable global para que cualquier función pueda acceder a los identificadores dentro.
let map;
// GetMap se llama después de que el script que contiene la API de Bing Maps carga por completo.
function GetMap() {
    // Los parámetros del constructor de map Map se detallan en:
    // https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/mapoptions-object
    map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(25.423215, -101.002852),
        zoom: 3,

        disableBirdseye: true,
        disableKeyboardInput: true,
        disableMapTypeSelectorMouseOver: true,
        disableStreetside: true,
        disableStreetsideAutoCoverage: true,
        enableClickableLogo: false,
        enableInertia: false,
        maxZoom: 18,
    });

    // cargar todas las colonias de la ciudad seleccionada (default saltillo)
    // posiblemente sea buena idea cambiar la estructura de datos que guarda los objetos de las
    // colonias debido a que la creacion es O(n^2) y nisiquiera se checa el estado/subdivisión ni país
    // coloniasPorCiudad es un mapa que al pasarle un nombre, se accede a un arreglo con objetos
    // que describen cada colonia.
    const coloniasPorciudad = new Map([
        ["saltillo", []],
        ["san-luis-potosi", []]
    ]);
    // cargarColonias hace peticiones GET a los archivos JSON alojados en github pages y los guarda
    // en memoria con ayuda de peticionJsonCiudad, después los renderiza en pantalla.
    function cargarColonias(urls) {
        for (const url of urls) {
            funcPeticionJsonCiudad(url).then(res => {
                for (let i = 0; i < res.colonias.length; i++) {
                    const el = res.colonias[i];
                    const ciudad = url.split('/')[url.split('/').length - 1].replace('.json', '');

                    coloniasPorciudad.get(ciudad).push(el);
                    const polygon = funcCrearPolygon(funcNuevaColonia(el.coordenadas),
                        el.fifi, el.brechas);
                    map.entities.push(polygon);
                }
            });
        }
    }
    cargarColonias(jsonsColonias);
    console.log(coloniasPorciudad.get('saltillo'));
}
// funcNuevaColonia recibe un arreglo de longitud par con coordenadas vértices
// que servirán para crear un nuevo Polygon que cubrirá una colonia.
function funcNuevaColonia(coordenadas) {
    // El siguiente error aparece si se pasa a la función una cantidad no par de params
    if (!funcEsPar(coordenadas.length)) return console.error("se ingresó una cantidad no valida de coordenadas");

    // retorno es un arreglo que contiene todos los vertices del poligono que
    // cubre una colonia.
    let retorno = [];
    for (let i = 0; i < coordenadas.length; i += 2) {
        retorno.push(new Microsoft.Maps.Location(coordenadas[i], coordenadas[i + 1]));
    }
    return retorno;
}
// funcCrearPolygon recibe un arreglo de coordenadas (de una colonia) junto a
// un booleano que debe indicar si la colonia es fifi con true y falso caso contrario.
function funcCrearPolygon(coordsColonia, fifi, brechas) {
    let color = fifi ? 'rgba(0, 0, 255, 0.5)' : 'rgba(255, 0, 0, 0.5)';

    // Si la colonia no tiene ajugeros en sus límites.
    if (!brechas)
        return new Microsoft.Maps.Polygon(coordsColonia, {
            fillColor: color,
            strokeColor: color,
            strokeThickness: 2
        });

    return new Microsoft.Maps.Polygon(coordsColonia, {
        fillColor: color,
        strokeColor: color,
        strokeThickness: 2
    });
}
// funcAñadirPolygonsColonias recibe un arreglo de polygons y los añade al mapa.
function funcAñadirPolygonsColonias(polygons) {
    for (let i = 0; i < polygons.length; i++) {
        map.entities.push(polygons[i]);
    }
}
function funcEsPar(num) { return num % 2 == 0; }

// funcPeticionJsonCiudad toma una url que albergue un JSON para hacer una petción que lo traiga a memoria.
// Puede que funcione con otros tipos de archivos inintencionalmente.
const funcPeticionJsonCiudad = async (url) => {
    const response = await fetch(url);
    return await response.json();
}
