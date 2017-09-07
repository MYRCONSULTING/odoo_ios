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
  
  // ========== TABLA PARA MANTENER EL USUARIO LOGUEADO ========== //
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (uid, email_login, pass_login, ip_login)');
  }, function(error) {
      myApp.alert('Ha ocurrido un error en la base de datos', 'Error');
      console.log('Transaction ERROR: ' + error.message);
  }, function() {
      //myApp.alert('Tablas creadas', 'Sucess');
  }); 


  // ========== TABLA PARA CREAR LOS PAGOS TEMPORALES ========== //
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS pagos (id, id_orden, cobrador, secuencia, fecha, cantidad)');
  }, function(error) {
      myApp.alert('Ha ocurrido un error en la base de datos', 'Error');
      console.log('Transaction ERROR: ' + error.message);
  }, function() {
      //myApp.alert('Tablas creadas', 'Sucess');
  }); 


  // ========== TABLA PARA CREAR LOS PRESTAMOS TEMPORALES ========== //
    // db.transaction(function (tx) {
    //   tx.executeSql('DROP TABLE prestamos');
    // });
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS prestamos (id, zona, cliente, valor_prestamo, interes, cuotas, fecha)');
  }, function(error) {
      myApp.alert('Ha ocurrido un error en la base de datos', 'Error');
      console.log('Transaction ERROR: ' + error.message);
  }, function() {
      //myApp.alert('Tablas creadas', 'Sucess');
  }); 


  // ========== TABLA PARA CREAR LOS GASTOS TEMPORALES ========== //
    // db.transaction(function (tx) {
    //   tx.executeSql('DROP TABLE prestamos');
    // });
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS gastos (id, zona, valor, fecha, concepto)');
  }, function(error) {
      myApp.alert('Ha ocurrido un error en la base de datos', 'Error');
      console.log('Transaction ERROR: ' + error.message);
  }, function() {
      //myApp.alert('Tablas creadas', 'Sucess');
  }); 

  // ========== TABLA PARA CREAR LOS CLIENTES TEMPORALES ========== //
    // db.transaction(function (tx) {
    //   tx.executeSql('DROP TABLE prestamos');
    // });
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (id, nombre, zona, direccion, telefono, movil)');
  }, function(error) {
      myApp.alert('Ha ocurrido un error en la base de datos', 'Error');
      console.log('Transaction ERROR: ' + error.message);
  }, function() {
      //myApp.alert('Tablas creadas', 'Sucess');
  });


  // ========== TABLA PARA CREAR LAS ZONAS TEMPORALES ========== //
    // db.transaction(function (tx) {
    //   tx.executeSql('DROP TABLE prestamos');
    // });
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS zonas (id, nombre, pais, encargado, capital, caja)');
  }, function(error) {
      myApp.alert('Ha ocurrido un error en la base de datos', 'Error');
      console.log('Transaction ERROR: ' + error.message);
  }, function() {
      //myApp.alert('Tablas creadas', 'Sucess');
  }); 
   
}