// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
                             // Because we want to use dynamic navbar, we need to enable it for this view:
                             dynamicNavbar: true
                             });

$$(document).on('click', '#cerrar-session-btn', function (e) {
                //Llama a la funcion logout ubicada en el archivo ('www/js/login.js')
                logOut();
                });

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
                conexionDB();
                tablasInicialesDB();
                usuarioConectado();
                
                //Despues de tres segundos de iniciar la aplicacion se carga la vista de login y se muestran las barras de navbar y toolbar
                setTimeout(function(){
                           if (user['username']) {
                           mainView.router.loadPage('listado.html');
                           }
                           else{
                           mainView.router.loadPage('login.html');
                           }


                           
                           $$('.navbar').show();
                           $$('.toolbar').show();
                           }, 3000);
                });

//Oculta la barra de navbar y toolbar en la pantalla de splash
$$('.navbar').hide();
$$('.toolbar').hide();


// Now we need to run the code that will be executed only for About page.

// ======================================= AGREGAR GASTO ============================================ //
// Option 1. Using page callback for page (for "Agregar Gasto" page in this case) (recommended way):
myApp.onPageInit('agregar_gasto', function (page) {
                 // Do something here for "about" page
                 var fecha_gasto = myApp.calendar({
                                                  input: '#fecha-gasto',
                                                  });
                 
                 // Se muestra la fecha actual dentro del campo fecha del formulario para agregar un gasto.
                 var f = new Date();
                 var fecha_actual = [new Date(f.getFullYear(), f.getMonth(), f.getDate())];
                 fecha_gasto.setValue(fecha_actual);
                 })
// ===================================================================================================== //

// ======================================= RETIRO REALIZADO ============================================ //
// Option 1. Using page callback for page (for "Retiros Realizados" page in this case) (recommended way):
myApp.onPageInit('retiros_realizados', function (page) {
                 // Do something here for "about" page
                 var fecha_gasto = myApp.calendar({
                                                  input: '#fecha-retiro',
                                                  });
                 
                 // Se muestra la fecha actual dentro del campo fecha del formulario para agregar un gasto.
                 var f = new Date();
                 var fecha_actual = [new Date(f.getFullYear(), f.getMonth(), f.getDate())];
                 fecha_gasto.setValue(fecha_actual);
                 })
// ===================================================================================================== //


// ======================================= LOGIN ============================================ //
// Option 1. Using page callback for page (for "Login" page in this case) (recommended way):
myApp.onPageInit('login', function (page) {
                 $$(document).on('click', '#login-button', function (e) {
                                 var formData = myApp.formToJSON('#form-login');
                                 var dataLogin = eval('(' + JSON.stringify(formData) + ')');
                                 
                                 if (dataLogin['ip-login'].length > 0 && dataLogin['email-login'].length > 0 && dataLogin['pass-login'].length > 0) {
                                 //Llama a la funcion login ubicada en el archivo ('www/js/login.js')
                                 login(dataLogin);
                                 
                                 setTimeout(function(){
                                            if(user['username']){
                                            mainView.router.loadPage('listado.html');
                                            }
                                            else{
                                            myApp.alert('Error al intentar iniciar session, por favor verifique sus datos');
                                            }
                                            }, 100)
                                 }
                                 else{
                                 myApp.alert('Por favor complete todos los campos', 'Error!');
                                 }
                                 });
                 
                 myApp.closePanel();
                 })
// ===================================================================================================== //

//We can also add callback for all pages:
myApp.onPageInit('*', function (e) {
                 // Do something here when page loaded and initialized
                 myApp.closePanel();
                 });

// Cuando se abra la pestaña listado se ejecutarán las acciones
myApp.onPageInit('listado', function (page) {
                 // Do something here for "about" page
                 $$('.toolbar-icons a i').css('color', '#ababab');
                 $$('.listado-icon').css('color', '#a3498b');
                 $$('#title-left-menu').html(user['username']);

                    cols = document.querySelectorAll('#lista-clientes li');
                    [].forEach.call(cols, function(col) {
                      col.addEventListener('dragstart', handleDragStart, false);
                      col.addEventListener('dragenter', handleDragEnter, false)
                      col.addEventListener('dragover', handleDragOver, false);
                      col.addEventListener('dragleave', handleDragLeave, false);
                      col.addEventListener('drop', handleDrop, false);
                      col.addEventListener('dragend', handleDragEnd, false);
                    });
                 })

// Cuando se abra la pestaña retiros realizados se ejecutarán las acciones
myApp.onPageInit('retiros_realizados', function (page) {
                 // Do something here for "about" page
                 $$('.toolbar-icons a i').css('color', '#ababab');
                 $$('.retiros-icon').css('color', '#a3498b');
                 })

// Cuando se abra la pestaña agregar gasto se ejecutarán las acciones
myApp.onPageInit('agregar_gasto', function (page) {
                 // Do something here for "about" page
                 $$('.toolbar-icons a i').css('color', '#ababab');
                 $$('.gasto-icon').css('color', '#a3498b');
                 })

// Cuando se abra la pestaña prestamo gasto se ejecutarán las acciones
myApp.onPageInit('agregar_prestamo', function (page) {
                 // Do something here for "about" page
                 $$('.toolbar-icons a i').css('color', '#ababab');
                 $$('.prestamo-icon').css('color', '#a3498b');
                 })


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
                // Get page data from event data
                var page = e.detail.page;
                
                if (page.name === 'about') {
                // Following code will be executed for page with data-page attribute equal to "about"
                myApp.alert('Here comes About page');
                }
                })

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
                // Following code will be executed for page with data-page attribute equal to "about"
                myApp.alert('Here comes About page');
                })