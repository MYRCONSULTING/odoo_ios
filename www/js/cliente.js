// ========== DECLARACIÓN DE VARIABLES GLOBALES ========= //
	var lista_nuevos_clientes = [];
	var lista_nuevas_zonas = [];
	var lista_paises = [];
// ========== FIN DECLARACIÓN DE VARIABLES GLOBALES ========= //

// Agregar un nuevo cliente
	$$(document).on('click', '.btn-agregar-cliente', function (e) {
		var cliente = [];
		cliente['zona'] = $$('#lista-zonas-cliente').val();
		cliente['nombre'] = $$('#nombre-cliente').val();
		cliente['telefono'] = $$('#telefono-cliente').val();
		cliente['movil'] = $$('#movil-cliente').val();
		cliente['direccion'] = $$('#direccion-cliente').val();

		if(verificarConexion() != 'none'){
			agregarClienteOdoo(cliente);
		}
		else{
			agregarCliente(cliente);
		}

		$$('#nombre-cliente').val('');
		$$('#telefono-cliente').val('');
		$$('#movil-cliente').val('');
		$$('#direccion-cliente').val('');
	});

	$$(document).on('click', '.btn-agregar-zona', function (e) {
		var zona = [];
		zona['pais'] = $$('#lista-pais-zona').val();
		zona['nombre'] = $$('#nombre-zona').val();
		zona['capital'] = $$('#capital-zona').val();
		zona['caja'] = $$('#caja-zona').val();

		if(verificarConexion() != 'none'){
			agregarZonaOdoo(zona);
		}
		else{
			agregarZona(zona);
		}

		$$('#nombre-zona').val('');
		$$('#capital-zona').val('');
		$$('#caja-zona').val('');
	});

/**
 * [agregarCliente description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} cliente [description]
 * @return {[type]}         [description]
 */
	function agregarCliente(cliente){
		if (cliente['nombre'] != '' && cliente['zona'] != 0) {
			db.transaction(function(tx) {
			    tx.executeSql('INSERT INTO clientes VALUES (?,?,?,?,?,?)', ['null', cliente['nombre'], cliente['zona'], '', '', '']);
			}, function(error) {
				myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
			}, function() {
			    myApp.alert('Cliente registrado exitosamente!', 'Exito');
			    nuevosClientes();
			}); 
		}
	}

/**
 * [nuevosclientes description] 
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function nuevosClientes(){
		lista_nuevos_clientes = [];
		db.transaction(function (txn) {
	       	txn.executeSql('SELECT * FROM  clientes', [], function (tx, res) {
	       		if (res.rows.length > 0) {
	       			var lista_clientes_temp = res.rows;
	       			for (var i = 0; i < lista_clientes_temp.length; i++) {
	       				lista_nuevos_clientes.push(lista_clientes_temp.item(i));
	       			}
	       		}
	       	});
	    });
	}

/**
 * [limpiarClientes description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function limpiarClientes(){
		// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
		db.transaction(function(tx) {
		    tx.executeSql('DELETE FROM clientes');
		}, function(error) {
			return false;
		    //console.log('Transaction ERROR: ' + error.message);
		}, function() {
			
		});
	}


/**
 * [agregarZona description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} zona [description]
 * @return {[type]}      [description]
 */
	function agregarZona(zona){
		if (zona['nombre'] != '' && zona['capital'] != '' && zona['caja'] != '' && zona['pais'] != 0) {
			db.transaction(function(tx) {
			    tx.executeSql('INSERT INTO zonas VALUES (?,?,?,?,?,?)', ['null', zona['nombre'], zona['pais'], data_conexion['uid'], zona['capital'], zona['caja']]);
			}, function(error) {
				myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
			}, function() {
			    myApp.alert('Zona registrada exitosamente!', 'Exito');
			    nuevasZonas();
			    console.log(lista_nuevas_zonas);
			}); 
		}
	}

/**
 * [nuevasZonas description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function nuevasZonas(){
		lista_nuevas_zonas = [];
		db.transaction(function (txn) {
	       	txn.executeSql('SELECT * FROM  zonas', [], function (tx, res) {
	       		if (res.rows.length > 0) {
	       			var lista_nuevas_zonas_temp = res.rows;
	       			for (var i = 0; i < lista_nuevas_zonas_temp.length; i++) {
	       				lista_nuevas_zonas.push(lista_nuevas_zonas_temp.item(i));
	       			}
	       		}
	       	});
	    });
	}


/**
 * [limpiarZonas description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function limpiarZonas(){
		// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
		db.transaction(function(tx) {
		    tx.executeSql('DELETE FROM zonas');
		}, function(error) {
			return false;
		    //console.log('Transaction ERROR: ' + error.message);
		}, function() {
			
		});
	}
