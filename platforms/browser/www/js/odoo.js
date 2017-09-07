var lista_zonasid;
/**
 * [conexion description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} datosConexion [description]
 * @return {[type]}               [description]
 */
	function conexion(datosConexion){
		var respuesta = 0;
		$.xmlrpc({
		    url: datosConexion['ip_login'] + '/xmlrpc/2/common',
		    methodName: 'authenticate',
		    async : false,
		    params: [datosConexion['db'], datosConexion['email_login'], datosConexion['pass_login'], []],
		    success: function(response, status, jqXHR) {
		    	if (!isNaN(response[0])) {
		    		data_conexion['uid'] = response[0];
		    		respuesta = response[0];
		    	}
		    	else{
		    		respuesta = 0;
		    	}
		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    }
		}); 

		return respuesta;
	}


/**
 * [listaPrestamos description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	// function listaPrestamosOdoo(){
	// 	$.xmlrpc({
	// 	    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
	// 	    methodName: 'execute_kw',
	// 	    //async : false,
	// 	    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.order', 'search_read', [[]] , []],
	// 	    success: function(response, status, jqXHR) {
	// 	    	lista_prestamos = response[0];
	// 	    	cargarPrestamos();
	// 	    	myApp.hidePreloader();
	// 	    },
	// 	    error: function(jqXHR, status, error) {
	// 	    	console.log(error);
	// 	    }
	// 	});
	// }


/**
 * [listaPrestamos description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function listaPrestamosOdoo(){
		listaZonasId();
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    //async : false,
			params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.order', 'search_read', [[['zona','in',lista_zonasid]]] , {'order' : 'orden_visita asc'}],		    
			success: function(response, status, jqXHR) {
		    	lista_prestamos = response[0];
		    	cargarPrestamos();
		    	myApp.hidePreloader();
		    },
		    error: function(jqXHR, status, error) { 
		    	console.log(error);
		    }
		});
	}

/**
 * [listaPrestamos description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @return {[type]} [description]
 */
	function listaZonasOdoo(select = ''){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    //async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.zona', 'search_read',    [[['encargado_zona', '=', data_conexion['id_empleado']]]] , []],
		    success: function(response, status, jqXHR) {
		    	lista_zonas = response[0];
		    	if (select != '') {
		    		cargarZonas(select);
		    	}
		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    }
		});
	}


/**
 * [listaPaisOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {String} select [description]
 * @return {[type]}        [description]
 */
	function listaPaisOdoo(select = ''){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    //async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.zona.pais', 'search_read', [[]] , []],
		    success: function(response, status, jqXHR) {
		    	lista_paises = response[0];
		    	if (select != '') {
		    		cargarPaises(select);
		    	}
		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    }
		});
	}


/**
 * [listaClientesOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {String} select [description]
 * @return {[type]}        [description]
 */
	function listaClientesOdoo(select = ''){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    //async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'res.partner', 'search_read', [[]] , []],
		    success: function(response, status, jqXHR) {
		    	lista_clientes = response[0];
		    	if (select != '') {
		    		cargarClientes(select);
		    	}
		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    }
		});
	}

/**
 * [listaClientesporZonaOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {String} select [description]
 * @return {[type]}        [description]
 */
	function listaClientesPorZonaOdoo(select = '', zona){
		myApp.alert(zona);
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    //async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'res.partner', 'search_read', [[['customer', '=', 'True'],['zona', '=', parseInt(zona)]]] , []],
		    success: function(response, status, jqXHR) { 
		    	lista_clientes = response[0];
		    	if (select != '') {
		    		cargarClientes(select);
		    	}
		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    }
		});
	}


/**
 * [agregarPagoOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} datos [description]
 * @return {[type]}       [description]
 */
	function agregarPagoOdoo(datos){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.order.pagos', 'create', [{fecha_cobro : datos['fecha'], quantity : datos['cantidad'], order_id : datos['id_orden']}] , []],
		    success: function(response, status, jqXHR) {
		    	
		    },
		    error: function(jqXHR, status, error) {
		    	console.log('no');
		    	console.log(error);
		    }
		});
	}


/**
 * [agregarPagoOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} datos [description]
 * @return {[type]}       [description]
 */
	function agregarPrestamoOdoo(datos, tipo = false){
		var total = parseFloat(datos['valor_prestamo']) + parseFloat((datos['valor_prestamo'] * (datos['interes'] / 100)));
		var valor_de_cuota = total / parseInt(datos['cuotas']);

		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.order', 'create', [{zona : datos['zona'], client_id : datos['cliente'], valor_prestado : datos['valor_prestamo'], porcentaje_interes : datos['interes'], cantidad_cuotas : datos['cuotas'], date_begin : datos['fecha'], precio_a_pagar_total : total, valor_cuota : valor_de_cuota}] , []],
		    success: function(response, status, jqXHR) {
		    	if (tipo) {
		    		listaPrestamosOdoo();
		    	}
		    	else{

		    	}
		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    }
		});
	}

/**
 * [agregarClienteOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} cliente [description]
 * @return {[type]}         [description]
 */
	function agregarClienteOdoo(cliente){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'res.partner', 'create', [{name : cliente['nombre'], zona : cliente['zona']}] , []],
		    success: function(response, status, jqXHR) {

		    },
		    error: function(jqXHR, status, error) {
		    	console.log('no');
		    	console.log(error);
		    }
		});
	}


/**
 * [agregarZonaOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} zona [description]
 * @return {[type]}      [description]
 */
	function agregarZonaOdoo(zona){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.zona', 'create', [{name : zona['nombre'], pais : zona['pais'], capital : zona['capital'], caja : zona['caja'], encargado_zona : data_conexion['id_empleado']}] , []],
		    success: function(response, status, jqXHR) {
		    	console.log('yes');
		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    	console.log(status); 
		    	console.log(jqXHR);
		    }
		});
	}

/**
 * [agregarGastoOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} gasto [description]
 * @return {[type]}       [description]
 */
	function agregarGastoOdoo(gasto){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.gastos', 'create', [{zona : gasto['zona'], quantity : gasto['valor'], fecha_gasto : gasto['fecha'], razon : gasto['razon']}] , []],
		    success: function(response, status, jqXHR) {
		    	console.log('yes');
		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    	console.log(status);
		    	console.log(jqXHR);
		    }
		});
	}


/**
 * [actualizarPosicionesOdoo description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} posiciones [description]
 * @return {[type]}            [description]
 */
	function actualizarPosicionesOdoo(posiciones){
		console.log(posiciones);
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    async : true,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.order', 'write', [[parseInt(posiciones['id'])], {orden_visita : posiciones['orden_visita']}] , []],
		    success: function(response, status, jqXHR) {

		    },
		    error: function(jqXHR, status, error) {
		    	console.log(error);
		    	console.log(status);
		    	console.log(jqXHR);
		    }
		});
	}

/**
 * [id_empleado description]
 * @return {[type]} [description]
 */
	function id_empleado(){
		var respuesta = 0;
		$.xmlrpc({
		   url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		   methodName: 'execute_kw',
		   async : false,
		   params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'hr.employee', 'search', [[['user_id', '=', data_conexion['uid']]]] , []],
		   success: function(response, status, jqXHR) {
				result = response[0];
				respuesta = result[0];
		   },
		   error: function(jqXHR, status, error) {
		   	console.log(error);
			respuesta = 0;
		   }
		});
		return respuesta;
	}


	function listaZonasId(){
		$.xmlrpc({
		   url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		   methodName: 'execute_kw',
		   async : false,
		   params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.zona', 'search',    [[['encargado_zona', '=', data_conexion['id_empleado'] ]]] , []],
		   success: function(response, status, jqXHR) {
		   	lista_zonasid = response[0];
		   },
		   error: function(jqXHR, status, error) {
		   	console.log(error);
		   }
		});
	}