function putDeleteButton($form) {
    let $deleteButton = $('<div class="row" id="button_remove_users"><button type="button" class="btn btn-danger mb-10 ml-15 col-sm-1">Supprimer</button></div>')
    $form.append($deleteButton)
    $deleteButton.on('click', function () {
        $form.remove()
    })
}



$(document).ready(function () {

    // user collection
    $collectionForms = $('#users');
    $collectionForms.find('.userForm').each(function () {
        putDeleteButton($(this));
    })

   
    let $addButton = $("#addButton")
    let $buttonContainer = $("#button_add_users")

    $addButton.on("click", (event) => {
        event.preventDefault()
        let $newUserForm = $("#users").data("prototype")
        let counter = $("#users").children('.formscm-user').length
        $newUserForm = $($newUserForm.replace(/_name_/g, counter))
        putDeleteButton($newUserForm)
        $("#users").append(
            $($("#users").data("widget-tags")).html($newUserForm)
        )

        $("#users").append($buttonContainer)
    })

    // coefficient specifique collection

    function putDeleteButtonCoeff($form) {
        let $deleteButton = $('<div class="row" id="button_remove_coeff"><button type="button" class="btn btn-danger mt-10 ml-15 col-sm-1 col-lg-6 col-md-8">Supprimer</button></div>')
        $form.append($deleteButton)
        $deleteButton.on('click', function () {
            console.log($form.parents('.coeff-form'))
            $form.parents('.coeff-form').remove()
            $form.remove()
        })
    }
    $collectionFormsCoeff = $('#coeff');
    $collectionFormsCoeff.find('.coeff-form').each(function () {
        putDeleteButtonCoeff($(this));
    })

    let $addButtonCoeff = $("#addButtonCoeffSpe")
    let $buttonContainerCoeff = $("#button_add_coeff")
    $addButtonCoeff.on("click", (event) => {
        event.preventDefault()
        
        let counter = $("#coeff").children('.coeff-form').length
        
        let $newCoeffForm = $("#coeff").data("prototype").replace("fieldset", "div")
        
        $newCoeffForm = $($newCoeffForm.replace(/_name_/g, counter))
        putDeleteButtonCoeff($newCoeffForm)
        $("#coeff").append(
            $($("#coeff").data("widget-tags")).html($newCoeffForm)
        )
        $(".test").append($buttonContainerCoeff)
    })
  
})


