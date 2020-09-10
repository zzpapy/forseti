function putDeleteButton($form) {
    let $deleteButton = $('<div class="row" id="button_remove_users"><button type="button" class="btn btn-danger mb-10 ml-15 col-sm-1">Supprimer</button></div>')
    $form.append($deleteButton)
    $deleteButton.on('click', function () {
        $form.remove()
    })
}

$(document).ready(function () {
    $collectionForms = $('#users');
    $collectionForms.find('.userForm').each(function () {
        putDeleteButton($(this));
    })

    let $addButton = $("#addButton")
    let $buttonContainer = $("#button_add_users")

    $addButton.on("click", (event) => {
        event.preventDefault()
        let $newUserForm = $("#users").data("prototype")
        let counter = $("#users").children().length
        $newUserForm = $($newUserForm.replace(/_name_/g, counter))
        putDeleteButton($newUserForm)
        $("#users").append(
            $($("#users").data("widget-tags")).html($newUserForm)
        )

        $("#users").append($buttonContainer)
    })
})

