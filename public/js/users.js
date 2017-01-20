$(document).ready(function() {

    $(document.body).on('click', '.assign_dept', function(e){
        e.preventDefault();
        $id = $(this).attr('rel');
        $name =  $("#user-name-"+$id).text();
        $('#user_id').val($id);
        $('#f-user-name').text($name);
        $('#assignDeptModal').modal('show');
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

    $(document.body).on('click', '.change_status', function(e){
        e.preventDefault();
        $id = $(this).attr('rel');
        $title =  $("#title-"+$id).text();
        $('#issue_id').val($id);
        $('#f-issue-title').text($title);
        $('#changeStatusModal').modal('show');
    });

    // Assign User Dept via modal
    $(document.body).on('submit', '#changeStatusForm', function(e){
        e.preventDefault();
        var data = $('#changeStatusForm').serialize();
        $('#changeStatusFormButton').prop("disabled", true);
        var id2 = $('#issue_id').val();
        $.ajax({
            type: 'POST',
            data: data,
            url: '/issue/change-status',
            success: function(data,textStatus){
                window.location.replace("/issue/department");
            },
            error: function(xhr,textStatus,error){
                // alert(textStatus + ' ' + xhr);
                // console.log(error)
                window.location.replace("/issue/department");
            }
        });
    });

} );

