/**
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @version  1.0
 * Mundocomputo Armenia
 */

// ========== VARIABLES GLOBALES ========== //

	var lista_prestamos = [];
	var lista_nuevos_prestamos = [];
	var lista_pagos = [];

// ======== fin VARIABLES GLOBALES ======== //

// Agregar un nuevo pago
$$(document).on('click', '.btn-agregar-pago', function (e) {
	var id_orden = $$(this).attr('data-orden');
	var cantidad = $$(this).attr('data-cantidad');
    agregarPago(id_orden, cantidad); 
});

$$(document).on('change', '#lista-zonas-prestamo', function (e) {
	if(verificarConexion() != 'none'){
		listaClientesPorZonaOdoo('#lista-clientes-prestamo', $$(this).val());
	}
});

// Agregar un nuevo prestamo
$$(document).on('click', '.btn-agregar-prestamo', function (e) {
	// Variables para la insercion del nuevo prestamo
	var cuotas = $$('#cuotas-prestamo').val();
	var valor = $$('#valor-prestamo').val();
	var interes = $$('#interes-prestamo').val(); 
	var fecha = $$('#fecha-prestamo').val(); 
	var zona = $$('#lista-zonas-prestamo').val();
	var cliente = $$('#lista-clientes-prestamo').val();

	//Si el dispositivo tiene conexion a internet se registrará directamente en odoo
	if(verificarConexion() != 'none'){
		if (cuotas.length > 0 && valor.length > 0 && interes.length > 0 && cliente != 0 && zona != 0) {
			agregarPrestamoConexion(cuotas, valor, interes, fecha, zona, cliente);
			$$('#cuotas-prestamo').val('');
			$$('#valor-prestamo').val('');
			$$('#interes-prestamo').val(''); 
		}
		else{
			myApp.alert('Por favor complete todos los campos', 'Error!');
		}
	}
	//De lo contrario se creara temporalmente para luego ser sincronizado
	else{
		myApp.alert('Verifique su conexion a internet', 'Error!');
		//agregarPrestamo(cuotas, valor, interes, fecha, zona, cliente);
	}
});

// Agregar una nueva noticia
$$(document).on('keyup', '.change-prestamo', function (e) {
	var cuotas = $$('#cuotas-prestamo').val();
	var valor = $$('#valor-prestamo').val();
	var interes = $$('#interes-prestamo').val(); 

	if (interes != '' && valor != '') {
		var valor_pagar = parseInt((valor * (interes / 100))) + parseInt(valor);
		$$('#precio-prestamo').html(valor_pagar);
		if (cuotas != '') {
			$$('#valor-cuota').html(valor_pagar / cuotas);
		}
	}

});

function cargarPrestamos(){
	var prestamos_DOM = '';

	if (lista_prestamos.length > 0) { 
		for (var i = 0; i < lista_prestamos.length; i++) {
			prestamo = lista_prestamos[i];

			if (verificarPago(prestamo['id'])) {
				var color = '#7bad8d';
			}
			else{
				var color = '#7c7bad';
			}
			prestamos_DOM += '<li data-order="'+prestamo['orden_visita']+'" data-id="'+prestamo['id']+'" id="orden-'+prestamo['id']+'">'+
		                        '<div class="item-content">'+
		                            '<div class="item-media">'+
		                                '<div style="background: '+color+'" class="tarjeta-prestamo">'+prestamo['name']+'</div>'+
		                            '</div>'+
		                            '<div class="item-inner">'+
		                                '<div class="item-title-row">'+
		                                    '<div style="text-transform: capitalize;" class="item-title">'+prestamo['client_id'][1]+'</div>'+
		                                    '<div class="item-after"><a data-cantidad="'+prestamo['valor_cuota']+'" data-orden="'+prestamo['id']+'" data-secuencia=""  style="background: #a3498b;" href="#" class="button button-fill btn-agregar-pago">Pagar</a></div>'+
		                                '</div>'+
		                                '<div class="item-text">Valor Cuota: <b>'+prestamo['valor_cuota']+'</b></div>'+
		                                '<div class="item-text">Cuotas Vencidas: <b>'+prestamo['cuotas_vencidas']+'</b></div>'+
		                                '<div class="item-text">Zona: <b>'+prestamo['zona'][1]+'</b></div>'+
		                            '</div>'+
		                        '</div>'+
		                        '<div class="sortable-handler"></div>'+
		                    '</li>';
		}
	}
	else{
		myApp.alert('No se han encontrado prestamos activos', 'Aviso!');
	}

	$$('#lista-prestamos').html(prestamos_DOM);
}



function agregarPago(id_orden, cantidad){
	myApp.prompt('Escriba la cantidad a pagar', 'Cantidad', function (value) {
        cantidad = value;
        db.transaction(function(tx) {
		    tx.executeSql('INSERT INTO pagos VALUES (?,?,?,?,?,?)',  ['null', id_orden, user['uid'], '1', fechaActual(), cantidad]);
		}, function(error) {
			myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
		}, function() {
			$$('#orden-' + id_orden + ' .tarjeta-prestamo').css('background', '#7bad8d');
			pagosRegistrados();
		}); 
    });
    $$('.modal-text-input').val(cantidad);
}


function pagosRegistrados(){
	lista_pagos = [];
	db.transaction(function (txn) {
       	txn.executeSql('SELECT * FROM  pagos', [], function (tx, res) {
       		if (res.rows.length > 0) {
       			lista_pagos_temp = res.rows;
       			for (var i = 0; i < lista_pagos_temp.length; i++) {
       				lista_pagos.push(lista_pagos_temp.item(i));
       			}
       		}
       	});
    });
}

function verificarPago(id_orden){
	if (lista_pagos.length > 0) {
		for (var i = 0; i < lista_pagos.length; i++) {
			if (lista_pagos[i]['id_orden'] == id_orden) {
				return true;
			}
		}
		return false;
	}
	return false;
}


function limpiarPagos(){
	// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
	db.transaction(function(tx) {
	    tx.executeSql('DELETE FROM pagos');
	}, function(error) {
		return false;
	    //console.log('Transaction ERROR: ' + error.message);
	}, function() {
		lista_pagos = [];
	});
}

function limpiarPrestamos(){
	// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
	db.transaction(function(tx) {
	    tx.executeSql('DELETE FROM prestamos');
	}, function(error) {
		return false;
	    //console.log('Transaction ERROR: ' + error.message);
	}, function() {
		lista_nuevos_prestamos = [];
	});
}

/**
 * [agregarPrestamo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function agregarPrestamo(cuotas, valor, interes, fecha, zona, cliente){
		if (cuotas != '' && valor != '' && interes != '' && fecha != '' && zona != 0 && cliente != 0) {
			db.transaction(function(tx) {
				    tx.executeSql('INSERT INTO prestamos VALUES (?,?,?,?,?,?,?)', ['1', zona, cliente, valor, interes, cuotas, fecha]);
				}, function(error) {
					myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
				}, function() {
				    myApp.alert('Prestamo registrado exitosamente!', 'Exito');
				    nuevosPrestamos();
				    $$('#cuotas-prestamo').val('');
				    $$('#valor-prestamo').val('');
					$$('#interes-prestamo').val(''); 
				}); 
		}

	}

/**
 * [agregarPrestamo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function agregarPrestamoConexion(cuotas, valor, interes, fecha, zona, cliente){
		if (cuotas != '' && valor != '' && interes != '' && fecha != '' && zona != 0 && cliente != 0) {
			var datos = [];
			datos['id'] = 'null';
			datos['zona'] = zona;
			datos['cliente'] = cliente;
			datos['valor_prestamo'] = valor;
			datos['interes'] = interes;
			datos['cuotas'] = cuotas;
			datos['fecha'] = fecha;
			agregarPrestamoOdoo(datos, true);
			myApp.alert('Prestamo registrado exitosamente!', 'Exito');
		}

	}

/**
 * [pagosRegistrados description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function nuevosPrestamos(){
		lista_nuevos_prestamos = [];
		db.transaction(function (txn) {
	       	txn.executeSql('SELECT * FROM  prestamos', [], function (tx, res) {
	       		if (res.rows.length > 0) {
	       			var lista_prestamos_temp = res.rows;
	       			for (var i = 0; i < lista_prestamos_temp.length; i++) {
	       				lista_nuevos_prestamos.push(lista_prestamos_temp.item(i));
	       			}
	       		}
	       	});
	    });
	}