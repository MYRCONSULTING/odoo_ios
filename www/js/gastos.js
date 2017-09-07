// ========== DECLARACIÓN DE VARIABLES GLOBALES ========= //
	var lista_nuevos_gastos = [];
// ========== FIN DECLARACIÓN DE VARIABLES GLOBALES ========= //

// Agregar un nuevo gasto
$$(document).on('click', '.btn-agregar-gasto', function (e) {
	var zona = $$('#lista-zonas-gasto').val();
	var fecha = $$('#fecha-gasto').val();
	var valor = $$('#cantidad-gasto').val();
	var concepto = $$('#gasto-realizado').val();

	agregarGasto(zona, fecha, valor, concepto);
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
function agregarGasto(zona, fecha, valor, concepto){
	if (valor != '' && fecha != '' && zona != 0 && concepto != 0) {
		db.transaction(function(tx) {
		    tx.executeSql('INSERT INTO gastos VALUES (?,?,?,?,?)', ['1', zona, valor, fecha, concepto]);
		}, function(error) {
			myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
		}, function() {
		    myApp.alert('Gasto registrado exitosamente!', 'Exito');
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
function agregarGastoConexion(zona, fecha, valor, concepto){
	if (valor != '' && fecha != '' && zona != 0 && concepto != 0) {
		var datos = [];
		datos['id'] = 'null';
		datos['zona'] = zona;
		datos['valor'] = valor;
		datos['fecha'] = fecha;
		datos['concepto'] = concepto;
		agregarGastoOdoo(datos);
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