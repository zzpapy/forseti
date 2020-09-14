$(document).ready(function () {
        if($("#bankin_config_alert_message").length){
            swal({
                title: "Veuillez configurer votre compte bancaire",
                text: "Aucun compte bancaire n'est actuellement synchronisé, voulez vous en paramétrer un ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e3c94b",
                confirmButtonText: "Oui",
                cancelButtonText: "Pas maintenant",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function () {
                window.location.href = '/bankin';
            });
        }
});
