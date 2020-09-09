function putDeleteButton($form) {
    let $deleteButton = $('<button type="button">Supprimer</button>')
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

    $addButton.on("click", (event) => {
        event.preventDefault()
        let $newUserForm = $("#users").data("prototype")
        let counter = $("#users").children().length
        $newUserForm = $($newUserForm.replace(/_name_/g, counter))
        putDeleteButton($newUserForm)
        $("#users").append(
            $($("#users").data("widget-tags")).html($newUserForm)
        )

        $("#users").append($addButton)
    })
})

