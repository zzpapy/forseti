/*Editabletable Init*/

"use strict";

$(document).ready(function () {
    $('#edit_datable_charge').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    });

    $('.validate-chargetype').on('click', function (e) {
        e.preventDefault();
        let url = $(this).data('ajax--url');
        let transacId = $(this).data('transac-id');

        let chargeTypeId = $("#select-charge-type-" + transacId).val();
        if(chargeTypeId >= 1){
            $.ajax({
                method: "GET",
                url: url,
                data: { transactionid: transacId, chargetypeid: chargeTypeId }
            })
                .done(function( json ) {
                    $('#edit_datable_charge').DataTable().row( $("#row-"+transacId) ).remove().draw();
                    swal({
                        title: "Charge sauvegardée",
                        type: "success",
                        text: json.msg,
                        confirmButtonColor: "#76c880",
                    });
                });
        }
    });
});

