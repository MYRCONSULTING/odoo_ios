/**
 * Archivo que contiene las diferentes funciones encargadas del manejo de usuarios de la app (login, registrar, etc)
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @company: Mundocomputo Armenia <contacto@mundocomputo.com>
 * @version: 1.0
 */
var user = [];

function login(userData){
	// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
	db.transaction(function(tx) {
	    tx.executeSql('INSERT INTO user VALUES (?,?,?,?)', ['1', userData['email-login'], userData['pass-login'], userData['ip-login']]);
	}, function(error) {
		return false;
	    //console.log('Transaction ERROR: ' + error.message);
	}, function() {
	    usuarioConectado();
	});
}

// Función que valida que exista una cuenta de usuario ya registrada
// @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
function usuarioConectado(){
	// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
  	db.transaction(function (txn) {
       	txn.executeSql('SELECT * FROM  user', [], function (tx, res) {
       		if (res.rows.length > 0) {
       			user = res.rows.item(0);
       			return true;
       		}
       		else{
       			return false;
       		}
       	});
       	return true;
    });
}

// Está función es la encargada de de cerrar la session actual de la app
// @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
function logOut(){
	// En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
	db.transaction(function(tx) {
	    tx.executeSql('DELETE FROM user');
	}, function(error) {
		return false;
	    //console.log('Transaction ERROR: ' + error.message);
	}, function() {
		user = null;
	    mainView.router.loadPage('login.html'); 
	});
}




