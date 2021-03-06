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
				next: "<span>Suivant</span> <i class='fa fa-arrow-right'></i>",
				previous: "<i class='fa fa-arrow-left'></i> <span>Précédent</span>",
				finish: "<span>Valider</span> <i class='fa fa-check'></i>",
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
				form_2.submit();
			}
		}).validate({
			errorPlacement: function errorPlacement(error, element) { element.before(error); },
			rules: {
				'registration_form[password][second]': {
					equalTo: "#registration_form_password_first"
				}
			}
		});

		$("a[href='#previous']").parent('li').addClass("col-sm-4 col-xs-4 col-lg-2 col-md-4");
		$("a[href='#previous']").addClass('btn btn-info text-center');
		$("a[href='#next']").parent('li').addClass("col-sm-4 col-xs-4 col-lg-2 col-md-4");
		$("a[href='#next']").addClass('btn btn-info text-center');
		$("a[href='#finish']").parent('li').addClass("col-sm-4 col-xs-4 col-lg-2 col-md-4");
		$("a[href='#finish']").addClass('btn btn-success text-center');
	}
});
		