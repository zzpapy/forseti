$(document).on('ready',function () {
    $('#user_admin_picture').on('change',function (e) {

        if ($('#user_admin_picture').val()) {
            var reader = new FileReader()

            reader.onload = function (e) {
                $('#current_admin_picture').attr('src', e.target.result)
            }

            reader.readAsDataURL($('#user_admin_picture')[0].files[0])
        }
    });
})
