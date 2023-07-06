var overlay;
var isOverlayVisible = true;

function hideOverlay() {
    overlay.classList.add('hide');
    enablePointerEvents();
    isOverlayVisible = false;
}

function showOverlay() {
    if (isOverlayVisible) {
        overlay.classList.remove('hide');
        disablePointerEvents();
        isOverlayVisible = true;
    }
}

function enablePointerEvents() {
    var mapElement = document.getElementById('map');
    var markerElements = document.querySelectorAll('.leaflet-marker-icon');
    var controlAttributionElement = document.querySelector('.leaflet-control-attribution');

    mapElement.style.pointerEvents = 'auto';
    markerElements.forEach(function (markerElement) {
        markerElement.style.pointerEvents = 'auto';
    });
    controlAttributionElement.style.display = 'block';
}

function disablePointerEvents() {
    var mapElement = document.getElementById('map');
    var markerElements = document.querySelectorAll('.leaflet-marker-icon');
    var controlAttributionElement = document.querySelector('.leaflet-control-attribution');

    mapElement.style.pointerEvents = 'none';
    markerElements.forEach(function (markerElement) {
        markerElement.style.pointerEvents = 'none';
    });
    controlAttributionElement.style.display = 'none';
}

window.onload = function () {
    initMap();

    overlay = document.querySelector('.overlay');

    overlay.onclick = function (event) {
        if (event.target === overlay) {
            hideOverlay();
        }
    };

    overlay.onmouseover = function () {
        showOverlay();
    };

    overlay.onmouseout = function () {
        showOverlay();
    };
};

function initMap() {
    var location = [-19.955797, -49.528168];

    var map = L.map('map').setView(location, 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors',
        minZoom: 7,
        maxZoom: 11
    }).addTo(map);

    // ALTERA O LUGAR DOS MARCADOR AQUI
    var markers = [
        //Fronteira 
        [-20.282052, -49.204268],
        //Frutal
        [-20.026279, -48.936289],
        //Campina Verde
        [-19.534013, -49.480777],
        //Iturama
        [-19.727056, -50.193868],
        //Prata
        [-19.307959, -48.926551],
        //Comendador Gomes
        [-19.697279, -49.083621],
        //São José do Rio preto
        [-20.812728, -49.376518],
        //Votuporanga
        [-20.418244, -49.976256],
        //Catanduva
        [-21.137413, -48.973937],
        //Fernandópolis
        [-20.284253, -50.246776],
        //Riolândia
        [-19.981843, -49.680095],
        //Orindiúva
        [-20.182054, -49.350015],
        //Barretos
        [-20.572285, -48.567653],
        //Guaraci
        [-20.500234, -48.943958],
    ];

    // COLOCA O NOME DE CADA MARCADOR EM ORDEM
    var markerNames = [
        "Fronteira",
        "Frutal",
        "Campina Verde",
        "Iturama",
        "Prata",
        "Comendador Gomes",
        "São José do Rio preto",
        "Votuporanga",
        "Catanduva",
        "Fernandópolis",
        "Riolândia",
        "Orindiúva",
        "Barretos",
        "Guaraci"
    ];
    var citySelect = document.getElementById('city-select');
    for (var i = 0; i < markerNames.length; i++) {
        var option = document.createElement('option');
        option.text = markerNames[i];
        citySelect.add(option);
    }

    citySelect.addEventListener('change', function () {
        var selectedCityIndex = this.selectedIndex;
        var selectedMarker = markers[selectedCityIndex];
        var selectedZoom = 11;

        map.setView(selectedMarker, selectedZoom);
    });


    for (var i = 0; i < markers.length; i++) {
        L.marker(markers[i]).addTo(map).bindPopup(markerNames[i]);
    }
}