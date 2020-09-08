/*FormWizard Init*/
$(function(){
	"use strict";
	if($('#registration_form').length >0){
		var form_2 = $("#registration_form");
		form_2.steps({
			headerTag: "h3",
			bodyTag: "fieldset",
			transitionEffect: "fade",
			titleTemplate: '#title#',
			labels: {
				next: "Suivant",
				previous: "Précédent",
			},
			onStepChanging: function (event, currentIndex, newIndex)
			{
				// Allways allow previous action even if the current form is not valid!
				if (currentIndex > newIndex)
				{
					return true;
				}

				// Needed in some cases if the user went back (clean up)
				if (currentIndex < newIndex)
				{
					// To remove error styles
					form_2.find(".body:eq(" + newIndex + ") label.error").remove();
					form_2.find(".body:eq(" + newIndex + ") .error").removeClass("error");
				}
				form_2.validate().settings.ignore = ":disabled,:hidden";
				return form_2.valid();
			},
			onFinishing: function (event, currentIndex)
			{
				form_2.validate().settings.ignore = ":disabled";
				return form_2.valid();
			},
			onFinished: function (event, currentIndex)
			{
				alert("Envoyé !");
			}
		}).validate({
			errorPlacement: function errorPlacement(error, element) { element.before(error); },
			rules: {
				'registration_form[password][second]': {
					equalTo: "#registration_form_password_first"
				}
			}
		});
	}
	
	$('#datable_1').DataTable({
		 "bFilter": false,
		 "bLengthChange": false,
		 "bPaginate": false,
		 "bInfo": false,
		  "footerCallback": function ( row, data, start, end, display ) {
				var api = this.api(), data;
	 
				// Remove the formatting to get integer data for summation
				var intVal = function ( i ) {
					return typeof i === 'string' ?
						i.replace(/[\$,]/g, '')*1 :
						typeof i === 'number' ?
							i : 0;
				};
	 
				// Total over all pages
				var total = api
					.column( 3 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
	 
				// Total over this page
				var pageTotal = api
					.column( 3, { page: 'current'} )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
	 
				// Update footer
				$( api.column( 3 ).footer() ).html(
					'$'+pageTotal
				);
			}
	});
	
});
		