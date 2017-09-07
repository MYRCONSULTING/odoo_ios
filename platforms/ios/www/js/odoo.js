
/**
 * [conexion description]
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @param  {[type]} datosConexion [description]
 * @return {[type]}               [description]
 */
	function conexion(datosConexion){
		data_conexion['db'] = 'demo';
		$.xmlrpc({
		    url: datosConexion['ip_login'] + '/xmlrpc/2/common',
		    methodName: 'authenticate',
		    async : false,
		    params: [datosConexion['db'], datosConexion['email_login'], datosConexion['pass_login'], []],
		    success: function(response, status, jqXHR) {
		    	data_conexion['uid'] = response[0];
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
	function listaPrestamosOdoo(){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    //async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.order', 'search_read', [[]] , []],
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
	function listaPrestamosOdoo(){
		$.xmlrpc({
		    url: data_conexion['ip_login'] + '/xmlrpc/2/object',
		    methodName: 'execute_kw',
		    //async : false,
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.order', 'search_read', [[]] , []],
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
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.zona', 'search_read', [[]] , []],
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
		    params: [data_conexion['db'], data_conexion['uid'], data_conexion['pass_login'], 'prestamos.zona', 'create', [{name : zona['nombre'], pais : zona['pais'], capital : zona['capital'], caja : zona['caja']}] , []],
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