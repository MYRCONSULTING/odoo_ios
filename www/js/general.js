// ========== VARIABLES GLOBALES ========== //
	var config = {base_url: '', url_services : 'http://mundocomputo.com/odoo/'};
	var data_conexion = [];
	var lista_zonas = [];
	var lista_clientes = [];
	var lista_paises = [];
// ======== fin VARIABLES GLOBALES ======== //

function verificarConexion(){
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    return(networkState);
}


function fechaActual(){
	var f = new Date();
	var mes = '';
	var dia = '';

	if ((f.getMonth() +1) < 10) {
		mes = '0' + (f.getMonth() +1);
	}
	else{
		mes = (f.getMonth() +1);
	}

	if ((f.getDate()) < 10) {
		dia = '0' + (f.getDate());
	}
	else{
		dia = (f.getDate());
	}
	var fecha_actual = f.getFullYear() + '-' + mes + '-' + dia;
	return fecha_actual;
}


/**
 * [cargarZonas description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} select [description]
 * @return {[type]}        [description]
 */
function cargarZonas(select){
	zonas = lista_zonas;
	var options_DOM = '<option value="0">Seleccionar Zona</option>';
	if (zonas.length > 0) {
		for (var i = 0; i < zonas.length; i++) {
			var zona = zonas[i];
			options_DOM += '<option value="'+zona['id']+'">'+zona['name']+'</option>';
		}
	}

	$$(select).html(options_DOM);
}


/**
 * [cargarZonas description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} select [description]
 * @return {[type]}        [description]
 */
	function cargarClientes(select){
		clientes = lista_clientes;

		var options_DOM = '<option value="0">Seleccionar Cliente</option>';
		if (clientes.length > 0) {
			for (var i = 0; i < clientes.length; i++) {
				var cliente = clientes[i];
				options_DOM += '<option value="'+cliente['id']+'">'+cliente['name']+'</option>';
			}
		}

		$$(select).html(options_DOM);
	}

/**
 * [cargarPaises description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function cargarPaises(select){
		paises = lista_paises;
		console.log(paises);
		var options_DOM = '<option value="0">Seleccionar Pais</option>';
		if (paises.length > 0) {
			for (var i = 0; i < paises.length; i++) {
				var pais = paises[i];
				options_DOM += '<option value="'+pais['id']+'">'+pais['name']+'</option>';
			}
		}

		$$(select).html(options_DOM);
	}

/**
 * [sincronizar description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function sincronizar(){
		if(verificarConexion() != 'none'){
			// =============================== PAGOS =============================== //
			if (lista_pagos.length > 0) {
				for (var i = 0; i < lista_pagos.length; i++) {
					pago = lista_pagos[i];
					agregarPagoOdoo(pago);
				}
			}

			limpiarPagos();
			// ============================== PRESTAMOS ================================ //
			cargarPrestamos();

			if (lista_nuevos_prestamos.length > 0) {
				for (var i = 0; i < lista_nuevos_prestamos.length; i++) {
					prestamo = lista_nuevos_prestamos[i];
					agregarPrestamoOdoo(prestamo);
				}
			}

			limpiarPrestamos();
			// ================================ CLIENTES ============================== //
			nuevosClientes();

			if (lista_nuevos_clientes.length > 0) {
				for (var i = 0; i < lista_nuevos_clientes.length; i++) {
					cliente = lista_nuevos_clientes[i];
					agregarClienteOdoo(cliente);
				}
			}

			limpiarClientes();
			// ================================ ZONAS ============================== //
			nuevasZonas();
			
			setTimeout(function(){
				if (lista_nuevas_zonas.length > 0) {
					for (var i = 0; i < lista_nuevas_zonas.length; i++) {
						zona = lista_nuevas_zonas[i];
						console.log(i);
						agregarZonaOdoo(zona);
					}
				}
			}, 200)

			limpiarZonas();

			setTimeout(function(){
				myApp.hidePreloader();
				myApp.alert('Sincronización terminada con exito!', 'Exito!');
			}, 300);
		}
		else{
			myApp.alert('Por favor verifique su conexión a internet!', 'Error');
		}
	}