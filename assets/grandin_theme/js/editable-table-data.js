/*Editabletable Init*/

"use strict";

$(document).ready(function () {
    $('#edit_datable_charge').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    });

    $('#edit_datable_charge').on('draw.dt', function () {
        $('.selectpicker').selectpicker();
    });

    $('.validate-chargetype').on('click', function (e) {
        e.preventDefault();
        console.log("toto")
        let url = $(this).data('ajax--url');
        let transacId = $(this).data('transac-id');

        let chargeTypeId = $("#select-charge-type-" + transacId).val();

        if (chargeTypeId >= 1) {
            swal({
                title: "Catégoriser toutes les occurences",
                text: "Voulez-vous catégoriser toutes les occurences de cette transaction ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e3c94b",
                confirmButtonText: "Oui",
                cancelButtonText: "Non",
                closeOnConfirm: false
            }, function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        method: "GET",
                        url: url,
                        data: {transactionid: transacId, chargetypeid: chargeTypeId, all: true}
                    })
                        .done(function (json) {
                            var dataTable = $('#edit_datable_charge').DataTable();
                            $.each(json.transactionids, function () {
                                dataTable.row($("#row-" + this)).remove();
                            });
                            dataTable.draw();
                            $("#count-transactions").html(json.count);
                            swal({
                                title: "Charges sauvegardées",
                                type: "success",
                                text: json.msg,
                                confirmButtonColor: "#76c880",
                            });
                        });
                } else {
                    $.ajax({
                        method: "GET",
                        url: url,
                        data: {transactionid: transacId, chargetypeid: chargeTypeId}
                    })
                        .done(function (json) {
                            $('#edit_datable_charge').DataTable().row($("#row-" + transacId)).remove().draw();
                            swal({
                                title: "Charge sauvegardée",
                                type: "success",
                                text: json.msg,
                                confirmButtonColor: "#76c880",
                            });
                            let initial = $("#count-transactions").html();
                            $("#count-transactions").html(initial - 1);
                        });
                }
            });
        }
    });
    
    $('#edit_datable_recette_list').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    });

    $('#edit_datable_recette_list').on('draw.dt', function () {
        $('.selectpicker').selectpicker();
    });


    $('#edit_datable_recette').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    });

    $('#edit_datable_recette').on('draw.dt', function () {
        $('.selectpicker').selectpicker();
    });

    $('.validate-userRecette').on('click', function (e) {
        e.preventDefault();
       
        let url = $(this).data('ajax--url');
        let transacId = $(this).data('transac-id');
        let description = $(this).data('description');
        
        let recetteUserId = $("#select-recette-user-" + transacId).val();
        if(recetteUserId <1){
            recetteUserId = null
        }
        if (recetteUserId >= 1 || recetteUserId == null) {
            swal({
                title: "Catégoriser toutes les occurences",
                text: "Voulez-vous catégoriser toutes les occurences de cette transaction ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e3c94b",
                confirmButtonText: "Oui",
                cancelButtonText: "Non",
                closeOnConfirm: false
            }, function (isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        method: "GET",
                        url: url,
                        data: {transactionid: transacId, user_id: recetteUserId,description:description, all: true}
                    })
                        .done(function (json) {
                            var dataTable = $('#edit_datable_recette').DataTable();
                            
                            $.each(json.transactionids, function () {
                                dataTable.row($("#row-" + this)).remove();
                            });
                            dataTable.draw();
                            $("#count-transactions").html(json.count);
                            swal({
                                title: "Recettes sauvegardées",
                                type: "success",
                                text: json.msg,
                                confirmButtonColor: "#76c880",
                            });
                        });
            } else {
                    $.ajax({
                            method: "POST",
                            url: url,
                            data: {transactionid: transacId, user_id: recetteUserId}
                        })
                        .done(function (json) {
                            $('#edit_datable_recette').DataTable().row($("#row-" + transacId)).remove().draw();
                            swal({
                                title: "Recette sauvegardée",
                                type: "success",
                                text: json.msg,
                                confirmButtonColor: "#76c880",
                            });
                            let initial = $("#count-transactions").html();
                            $("#count-transactions").html(initial - 1);
                        });
                }
            });
        }
    });

   
});

