$(document).ready(function() {
    //detction event click
    $(".valid_coeff").on('click', (e) => {
        e.preventDefault()
        //récup user
        let user = $(e.target).data("user-id")
        //récup url traitement
        let url = $(e.target).data('ajax-url')

        //lancement de la req avec les data du form serialize
        $.post(url, $( "#form_coeff_" + user ).serialize(),function( json ) { 

            
            //traitement réponse
            //on récup l'user en cours
            user_id = json.coeff[1].user_id
            // console.log(json.coeff)
            id = user_id.replace('user_','');
            //on init un tab pour mise à jour coeffs admin et total parts restantes.
            let coeff = []
            //on parcours les cases coeff de l'user dans le tableau
            for(i=0; i < json.totalChargeMonth.length; i++){
                totalUser = (json.totalChargeMonth[i].total * json.coeff[json.totalChargeMonth[i].mois].coeff / 100).toFixed(2).replace(".", ",");
                // console.log(totalUser)
                    $("#total_"+json.totalChargeMonth[i].mois+"_"+id).html(totalUser)
            }
            for( i=1; i<=12; i++){
               
                //on met à jour l'affichage avec la nouvelle valeure
                $("#"+user_id+"_coeff_"+i).html(json.coeff[i].coeff)

                //on init un tab pour mise à jour coeffs admin et total parts restantes.
                coeff.push(json.coeff[i].coeff)

                //flash message mise à jour
                
            }
            $("#success").html(json.success)
            $("#success").removeClass('hide')
            $("#success").css('width','25%')
            $("#success").slideDown(500, function () {
                setTimeout(function () {
                    $("#success").slideUp(500)
                    $("#success").addClass('hide')
                    $("#success").html("")
                }, 5000);
            });
           
        },"json" ).done( function(coeff){  
            console.log(coeff)
            for (let i = 0; i < coeff.totalChargeMonth.length; i++) {
                console.log(coeff.totalCoeff[coeff.totalChargeMonth[i]["mois"]-1].total,coeff.totalChargeMonth[i]["mois"])
                $("."+coeff.totalChargeMonth[i]["mois"]).html((coeff.totalChargeMonth[i]["total"]*(100 - coeff.totalCoeff[coeff.totalChargeMonth[i]["mois"]-1].total) / 100).toFixed(2).replace(".", ","))
                
            }
           
                //on met à jour l'affichage des coeffs admin et des parts restantes
                $(".updateAdmin").each(function(){
                    console.log(coeff.totalCoeff[$(this).index()-2].total)
                    $(this).html(100 - coeff.totalCoeff[$(this).index()-2].total)
                })
                $(".updateTotal").each(function(){      
                    $(this).html(100 - coeff.totalCoeff[$(this).index()-1].total)
                })
               
            }
        ).fail(
            function(error){
                //en cas d'erreur on affiche
                $("#alert").removeClass('hide')
                $("#alert").html(error.responseJSON.error)
                $("#alert").css('width','25%')
                $("#alert").slideDown(500, function () {
                    setTimeout(function () {
                        $("#alert").slideUp(500)
                        $("#alert").addClass('hide')
                        $("#alert").html("")
                    }, 5000);
                });
                if(error.responseJSON.coeff != undefined){
                    user_id = error.responseJSON.coeff[1].user_id
                    //on init un tableau avec les nouveaux totaux des coeffs users
                    let coeff = []
                    //on parcours les cases coeff de l'user dans le tableau
                    for( i=1; i<=12; i++){
    
                        //on met à jour l'affichage avec la nouvelle valeure
                        $("#"+user_id+"_coeff_"+i).html(error.responseJSON.coeff[i].coeff)
    
                        //on init un tab pour mise à jour coeffs admin et tiotal parts restantes.
                        coeff.push(error.responseJSON.coeff[i].coeff)
                    }
                    $(".updateAdmin").each(function(){
                        $(this).html(100 - error.responseJSON.totalCoeff[$(this).index()-2].total)
                    })
                    $(".updateTotal").each(function(){      
                        $(this).html(100 - error.responseJSON.totalCoeff[$(this).index()-1].total)
                    })
                }
                
            }
        )
    })
})

