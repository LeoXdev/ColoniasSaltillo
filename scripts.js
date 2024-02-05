"use strict";
// GetMap se llama después de que el script que contiene la API de Bing Maps carga por completo.
function GetMap() {
    var map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(25.423215, -101.002852),
        zoom: 14
    });

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
        25.438130856926325, -101.0024815175787,
    ]);
    const JardinesDelValle_Polygon = funcCrearPolygon(JardinesDelValle, true);
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
        25.438350, -101.020870,
    ]);
    const CerroDelPueblo_Polygon = funcCrearPolygon(CerroDelPueblo, false);

    map.entities.push(ParquesDeLaCañada_Polygon);
    map.entities.push(JardinesDelValle_Polygon);
    map.entities.push(CerroDelPueblo_Polygon);
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
function funcEsPar(num) { return num % 2 == 0; }