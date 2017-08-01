/**
 * Archivo encargado gestionar la conexion y procesos dedicados a la base de datos (sqlite) que usa la aplicación internamente
 * @author Nikollai Hernandez G. <nikollaihernandez@gmail.com>
 * @company: Mundocomputo Armenia <contacto@mundocomputo.com>
 * @version: 1.0
 */
// Declaracion de variables globales
var db = null;


function conexionDB(){
	 db = window.openDatabase('odoo.db', '1.0', '', 1);
}



function tablasInicialesDB(){
  // En caso de que no existan las tablas en la base de datos, este proceso es el encargado de crearlas.
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS user (id_user, username, password, ip)');
  }, function(error) {
      myApp.alert('Ha ocurrido un error en la base de datos', 'Error');
      console.log('Transaction ERROR: ' + error.message);
  }, function() {
      //myApp.alert('Tablas creadas', 'Sucess');
  }); 
    //     console.log(db);
    // db.transaction(function (txn) {
    //   txn.executeSql('SELECT * FROM  DemoTable', [], function (tx, res) {
    //     console.log(res.rows); // {"answer": 42} 
    //   });
    // });
}