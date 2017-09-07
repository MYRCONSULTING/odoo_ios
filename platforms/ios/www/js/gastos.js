// ========== DECLARACIÓN DE VARIABLES GLOBALES ========= //
	var lista_nuevos_gastos = [];
// ========== FIN DECLARACIÓN DE VARIABLES GLOBALES ========= //

// Agregar un nuevo gasto
$$(document).on('click', '.btn-agregar-gasto', function (e) {
	var zona = $$('#lista-zonas-gasto').val();
	var fecha = $$('#fecha-gasto').val();
	var valor = $$('#cantidad-gasto').val();
	var concepto = $$('#gasto-realizado').val();

	var datos = [];
	datos['id'] = 'null';
	datos['zona'] = zona;
	datos['valor'] = valor;
	datos['fecha'] = fecha;
	datos['razon'] = concepto;

	if(verificarConexion() != 'none'){
		agregarGastoConexion(datos);
		//agregarGasto(datos);
	}
	else{ 
		agregarGasto(datos);
	}
	
});

/**
 * [agregarGasto description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} zona     [description]
 * @param  {[type]} fecha    [description]
 * @param  {[type]} valor    [description]
 * @param  {[type]} concepto [description]
 * @return {[type]}          [description]
 */
function agregarGasto(gasto){
	if (gasto['valor'] != '' && gasto['fecha'] != '' && gasto['zona'] != 0 && gasto['razon'] != 0) {
		db.transaction(function(tx) {
		    tx.executeSql('INSERT INTO gastos VALUES (?,?,?,?,?)', ['1', gasto['zona'], gasto['valor'], gasto['fecha'], gasto['razon']]);
		}, function(error) {
			myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
		}, function() {
		    myApp.alert('Gasto registrado temporalmente!', 'Exito');
		    nuevosGastos();
		}); 
	}
} 

/**
 * [agregarGasto description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} zona     [description]
 * @param  {[type]} fecha    [description]
 * @param  {[type]} valor    [description]
 * @param  {[type]} concepto [description]
 * @return {[type]}          [description]
 */
function agregarGastoConexion(gasto){
	if (gasto['valor'] != '' && gasto['fecha'] != '' && gasto['zona'] != 0 && gasto['razon'] != 0) {
		agregarGastoOdoo(gasto);
		myApp.alert('Gasto registrado exitosamente!', 'Exito');
	}
}


/**
 * [pagosRegistrados description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function nuevosGastos(){
		lista_nuevos_gastos = [];
		db.transaction(function (txn) {
	       	txn.executeSql('SELECT * FROM  gastos', [], function (tx, res) {
	       		if (res.rows.length > 0) {
	       			var lista_gastos_temp = res.rows;
	       			for (var i = 0; i < lista_gastos_temp.length; i++) {
	       				lista_nuevos_gastos.push(lista_gastos_temp.item(i));
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
	function limpiarGastos(){
		// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
		db.transaction(function(tx) {
		    tx.executeSql('DELETE FROM gastos');
		}, function(error) {
			return false;
		    //console.log('Transaction ERROR: ' + error.message);
		}, function() {
			
		});
	}
