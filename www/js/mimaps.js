var app = {
	inicio: function() {
		this.iniciaFastClick();
	},

	iniciaFastClick: function () {
		FastClick.attach(document.body);
	},

	dispositivoListo: function(){
		navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
	},

	pintaCoordenadasEnMapa: function(position){
		var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXJpZWwiLCJhIjoiY2s5d3dwNDB2MDVhODNlcWRrd3l1djR4aSJ9.AvRXaGoKZIzNNVpxRetaKA', {
			attribution: '',//Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imag© <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 13	}).addTo(miMapa);

		app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

		miMapa.on('click', function(evento){
									var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
									app.pintaMarcador(evento.latlng, texto, miMapa);
								});
	},

	pintaMarcador: function(latlng, texto, mapa){
		var marcador = L.marker(latlng).addTo(mapa);
		marcador.bindPopup(texto).openPopup();
	},

	errorAlSolicitarLocalizacion: function(error){
		console.log(error.code + ': ' + error.message);
	}
};

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() { app.inicio(); }, false);
	document.addEventListener('deviceready', function() { app.dispositivoListo(); }, false);
}