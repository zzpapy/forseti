/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../grandin_theme/vendors/bower_components/jquery-wizard.js/css/wizard.css';

// jquery-steps css
import '../grandin_theme/vendors/bower_components/jquery-wizard.js/css/wizard.css'

// vector map CSS
import '../grandin_theme/vendors/bower_components/jquery.steps/demo/css/jquery.steps.css';

// Data table CSS
import '../grandin_theme/vendors/bower_components/datatables/media/css/jquery.dataTables.min.css';

// bootstrap-touchspin CSS
import '../grandin_theme/vendors/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css';

// Jasny-bootstrap CSS
import '../grandin_theme/vendors/bower_components/jasny-bootstrap/dist/css/jasny-bootstrap.min.css';

// Sweet alert
import '../grandin_theme/vendors/bower_components/sweetalert/dist/sweetalert.css';

// Boostrap Treeview
import '../grandin_theme/vendors/bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.css';

// Select
import '../grandin_theme/vendors/bower_components/bootstrap-select/dist/css/bootstrap-select.min.css';

// custom style
import '../grandin_theme/css/style.css';

import '../css/app.css';

// require jQuery normally
const $ = require('jquery');
// create global $ and jQuery variables
global.$ = global.jQuery = $;
// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';
console.log(window.location.href)
$(".link").removeClass("active")
$('.link').each(function(){
    console.log(this.pathname,location.pathname)
    
        if(this.pathname === location.pathname){
            $(this).addClass('active')
        }
})
if(location.pathname == '/home'){
    $('.home').addClass('active')
}