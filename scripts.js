"use strict";

// TODO:
// - Leer las coordenadas para crear polígonos de algunos archivos para evitar dejar todo harcodeado
// - Añadir una sidebar que cuando se abra muestre un listado de ¿País? -> Estado -> Ciudad,
//   al darle click, la pantalla enfocará a la ciudad pulsada y coloreará las colonias fifis y humildes,
//   a la vez que descoloreará las colonias de otras ciudades.
// - Colorear todas las colonias :)
// - Poner unas estadísticas que contengan el porcentaje/ratio de colonias fifis y humildes, y puede ser que
//   la población también
// Ruta relativa al archivo JSON
const jsonsColonias = [
    'https://leoxdev.github.io/coloniassaltillo/coords/mexico/coahuila/saltillo.json',
    'https://leoxdev.github.io/coloniassaltillo/coords/mexico/san-luis-potosi/san-luis-potosi.json',
    'https://leoxdev.github.io/coloniassaltillo/coords/mexico/cdmx.json',
];

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
        maxZoom: 14,
    });

    // cargar todas las colonias de la ciudad seleccionada (default saltillo)
    // cargarColonias extrae los datos necesarios desde los archivos JSON locales para renderizar
    // los polígonos de las colonias.
    function cargarColonias(archivos) {
        for (const json of archivos) {
            console.log(json);
            peticionTraerJson(json);
        }
    }
    cargarColonias(jsonsColonias);

    const Bonanza = funcNuevaColonia([
        25.445251, -100.953649,
        25.445417, -100.952678,
        25.444329, -100.952310,
        25.442352, -100.952359,
        25.443043, -100.947830,
        25.444063, -100.947572,
        25.445212, -100.946928,
        25.445941, -100.946632,
        25.445941, -100.946632,
        25.445941, -100.946632,
        25.447524, -100.945798,
        25.447869, -100.945644,
        25.447786, -100.946052,
        25.447156, -100.949668,
        25.447925, -100.949853,
        25.447487, -100.952065,
        25.447335, -100.953045,
        25.447196, -100.953588,
        25.447111, -100.954125
    ]);
    const Bonanza_Polygon = funcCrearPolygon(Bonanza, true);
    const ParquesDeLaCañada = funcNuevaColonia([
        25.381228624179524, -101.02507348120665,
        25.377389959060128, -101.02215543407362,
        25.37626556079945, -101.02271338035612,
        25.373434789244346, -101.01859379570332,
        25.3807237420581, -101.01331438559315,
        25.388827926434004, -101.02142536656868
    ]);
    const ParquesDeLaCañada_Polygon = funcCrearPolygon(ParquesDeLaCañada, true);
    const JardinesDelValle = funcNuevaColonia([
        25.438479651716435, -101.00316814534551,
        25.44373075089691, -101.0004643417133,
        25.442044764130546, -100.9958508638173,
        25.441947892701528, -100.99610837497463,
        25.439564572258753, -100.99724581956785,
        25.43944836689214, -100.99840455282731,
        25.438130856926325, -101.0024815175787
    ]);
    const JardinesDelValle_Polygon = funcCrearPolygon(JardinesDelValle, true);
    const LasAmericasAmpliacion = funcNuevaColonia([
        25.448751, -100.952233,
        25.447520, -100.951927,
        25.447322, -100.953096,
        25.447191, -100.953586,
        25.447142, -100.954137,
        25.446962, -100.954638,
        25.446726, -100.955871,
        25.446679, -100.956369,
        25.446355, -100.957716,
        25.446376, -100.957873,
        25.447666, -100.957410,
        25.447651, -100.957285,
        25.447996, -100.955926,
        25.448533, -100.953375,
        25.448662, -100.952885
    ]);
    const LasAmericasAmpliacion_Polygon = funcCrearPolygon(LasAmericasAmpliacion, true);
    const CerroDelPueblo = funcNuevaColonia([
        25.439383, -101.021570,
        25.439383, -101.021570,
        25.439383, -101.021570,
        25.437099, -101.023806,
        25.436944, -101.024181,
        25.436405, -101.024349,
        25.435217, -101.023895,
        25.434890, -101.023952,
        25.434402, -101.024217,
        25.433841, -101.023949,
        25.432469, -101.023137,
        25.432222, -101.023154,
        25.432177, -101.022786,
        25.432030, -101.022505,
        25.431971, -101.022525,
        25.431956, -101.022503,
        25.431979, -101.022463,
        25.432039, -101.022449,
        25.432049, -101.022408,
        25.431863, -101.022059,
        25.432697, -101.021504,
        25.431829, -101.019623,
        25.432077, -101.019563,
        25.432412, -101.019446,
        25.432933, -101.019285,
        25.433900, -101.019044,
        25.434618, -101.018947,
        25.436361, -101.018742,
        25.437172, -101.018652,
        25.438059, -101.018553,
        25.438910, -101.018570,
        25.438350, -101.020870
    ]);
    const CerroDelPueblo_Polygon = funcCrearPolygon(CerroDelPueblo, false);

    const LasPilitas = funcNuevaColonia([
        22.132845, -100.954482,
        22.131810, -100.955701,
        22.131369, -100.955280,
        22.130249, -100.956642,
        22.131051, -100.957479,
        22.130328, -100.958310,
        22.131351, -100.958937,
        22.132299, -100.959576,
        22.133248, -100.960330,
        22.133329, -100.960367,
        22.133419, -100.960427,
        22.133755, -100.959570,
        22.134507, -100.958356,
        22.133848, -100.957733,
        22.133916, -100.957666,
        22.134193, -100.956445,
        22.134470, -100.956085,
        22.134072, -100.955675,
        22.134011, -100.955631,
        22.132852, -100.954485,
    ]);
    const LasPilitas_Polygon = funcCrearPolygon(LasPilitas, false);

    funcAñadirPolygonsColonias([
        Bonanza_Polygon,
        JardinesDelValle_Polygon,
        LasAmericasAmpliacion_Polygon,
        ParquesDeLaCañada_Polygon,

        CerroDelPueblo_Polygon,


        LasPilitas_Polygon,
    ]);
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
function funcCrearPolygon(coordsColonia, fifi) {
    let color = fifi ? 'rgba(0, 0, 255, 0.5)' : 'rgba(255, 0, 0, 0.5)';

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

// peticionTraerJson toma una url que contenga un JSON para hacer una peticion y retornarlo.
// Puede que funcione con otros tipos de archivos inintencionalmente.
function peticionTraerJson(url) {
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log('Output: ', out);
            // recorrer arreglo colonias, cada entrada de este arreglo contiene la info necesaria
            // para renderizar cada colonia
        }).catch(err => console.error(err));
}








// zoomOut when pressing Z
function zoomIn() {
    map.setView({
        zoom: ++map._options.zoom
    })
}
// zoomOut when pressing X
function zoomOut() {
    map.setView({
        zoom: --map._options.zoom
    })
}

// Zoom in/out con z,x
document.addEventListener('keydown', function (event) {
    // Check if the pressed key is the one you're interested in (e.g., 'Enter' key with keyCode 13)
    if (event.key === 'z') {
        zoomIn();
        return;
    }
    if (event.key === 'x') {
        zoomOut();
        return;
    }
    if (event.key === 'c') {
        console.log(map._options.zoom);
        return;
    }
});
