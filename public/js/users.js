$(document).ready(function() {

    $(document.body).on('click', '.assign_dept', function(e){
        e.preventDefault();
        $id = $(this).attr('rel');
        $name =  $("#user-name-"+$id).text();
        $('#user_id').val($id);
        $('#f-user-name').text($name);
        $('#assignDeptForm').modal('show');
    });

    // Assign User Dept via modal
    $(document.body).on('submit', '#assignDeptForm', function(e){
        e.preventDefault();
        var data = $('#assignDeptForm').serialize();
        $('#assignDeptFormButton').prop("disabled", true);
        var id2 = $('#user_id').val();
        $.ajax({
            type: 'POST',
            data: data,
            url: '/assign-dept',
            success: function(data,textStatus){
                // alert(data.name);
                // if(data.result){
                //     $('#user_id').val('');
                //     $('#user-dept-'+id2).text(data.name);
                // }
                // $('#assignDeptFormButton').prop("disabled", false);
                // $('#assignDeptForm').modal('hide');
                // $('body').removeClass('modal-open');
                // $('.modal-backdrop').remove();
                window.location.replace("/users");
            },
            error: function(xhr,textStatus,error){
                // alert(textStatus + ' ' + xhr);
                // console.log(error)
                window.location.replace("/users");
            }
        });
    });

} );

