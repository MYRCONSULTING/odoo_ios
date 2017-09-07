/**
 * Archivo que contiene las diferentes funciones encargadas del manejo de usuarios de la app (login, registrar, etc)
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @company: Mundocomputo Armenia <contacto@mundocomputo.com>
 * @version: 1.0
 */
var user = [];

function login(userData){
    //Llamado a la funcino conexion en la ruta js/odoo.js
    if (data_conexion['uid'] != false){
        // En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO usuario VALUES (?,?,?,?,?,?)', [data_conexion['uid'], data_conexion['email_login'], data_conexion['pass_login'], data_conexion['ip_login'], data_conexion['db'], id_empleado()]);
        }, function(error) {
            myApp.alert('Ha ocurrido un error, por favor intente de nuevo más tarde', 'Error!');
        }, function() {
            usuarioConectado();
            setTimeout(function(){mainView.router.loadPage('listado.html');}, 300);
            myApp.hidePreloader();
            return true;
        }); 
    } 
    else{
        myApp.hidePreloader();
        myApp.alert('Información incorrecta, por favor verifique sus datos', 'Error!');
    }
}

// Función que valida que exista una cuenta de usuario ya registrada
// @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
function usuarioConectado(){
	// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
  	db.transaction(function (txn) {
       	txn.executeSql('SELECT * FROM  usuario', [], function (tx, res) {
       		if (res.rows.length > 0) {
       			user = res.rows.item(0);
                data_conexion = res.rows.item(0);
       		}
       	});
    });
}

// Está función es la encargada de de cerrar la session actual de la app
// @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
function logOut(){ 
    myApp.confirm('Todos los datos almacenados temporalmente serán eliminados', 'Cerrar Sesion', function (value) {
    	// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
    	db.transaction(function(tx) {
    	    tx.executeSql('DELETE FROM usuario');
    	}, function(error) {
    		return false;
    	    //console.log('Transaction ERROR: ' + error.message);
    	}, function() {
    		user = [];
            data_conexion = [];
    	    mainView.router.loadPage('login.html'); 
    	});
    });
}




