$(document).ready(function() {
    //detction event click
    $(".valid_coeff").on('click', (e) => {
        e.preventDefault()
        //récup user
        let user = $(e.target).data("user-id")
        //récup url traitement
        let url = $(e.target).data('ajax-url')

        //lancement de la req avec les data du form serializé
        let req = $.post(url, $( "#form_coeff_" + user ).serialize(),function( json ) { 

            
            //traitement réponse
            //on récup l'user en cours
            user_id = json.coeff[1].user_id
            //on init un tableau avec les nouveaux totaux des coeffs users
            let coeff = []
            //on parcours les cases coeff de l'user dans le tableau
            for( i=1; i<=12; i++){

                //on met à jour l'affichage avec la nouvelle valeure
                $("#"+user_id+"_coeff_"+i).html(json.coeff[i].coeff)

                //on init un tab pour mise à jour coeffs admin et tiotal parts restantes.
                coeff.push(json.coeff[i].coeff)

                //flash message mise à jour
                $("#success").removeClass('hide')
                $("#success").removeClass('hide')
                $("#success").html(json.success)
                $("#success").removeClass('hide')
                $("#success").css('z-index','1')
                $("#success").css('position','fixed')
                $("#success").css('width','25%')
                $("#success").css('top','60vh')
                $("#success").css('left','50vw')
                $("#success").slideDown(500, function () {
                    setTimeout(function () {
                        $("#success").slideUp(500)
                        $("#success").addClass('hide')
                        $("#success").html("")
                    }, 5000);
                });
            }
           
        },"json" ).done( function(coeff){  
            
                //on met à jour l'affichage des coeffs admin et des parts restantes
                $(".updateAdmin").each(function(){
                    $(this).html(100 - coeff.totalCoeff[$(this).index()-2].total)
                })
                $(".updateTotal").each(function(){      
                    $(this).html(100 - coeff.totalCoeff[$(this).index()-1].total)
                })
               
            }
        ).fail(
            function(error){

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
                console.log(error.responseJSON.totalCoeff)
                $(".updateAdmin").each(function(){
                    $(this).html(100 - error.responseJSON.totalCoeff[$(this).index()-2].total)
                })
                $(".updateTotal").each(function(){      
                    $(this).html(100 - error.responseJSON.totalCoeff[$(this).index()-1].total)
                })
                //en cas d'erreur on affiche
                $("#alert").removeClass('hide')
                $("#alert").html(error.responseJSON.error)
                $("#alert").removeClass('hide')
                $("#alert").css('z-index','1')
                $("#alert").css('position','fixed')
                $("#alert").css('width','25%')
                $("#alert").css('top','60vh')
                $("#alert").css('left','50vw')
                $("#alert").slideDown(500, function () {
                    setTimeout(function () {
                        $("#alert").slideUp(500)
                        $("#alert").addClass('hide')
                        $("#alert").html("")
                    }, 5000);
                });
            }
        )
    })
})