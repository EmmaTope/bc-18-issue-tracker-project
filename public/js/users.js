$(document).ready(function() {
    $('#users_table').DataTable();
    $('#depts_table').DataTable();

    $(document.body).on('click', '.assign_dept', function(e){
        e.preventDefault();
        $id = $(this).attr('rel');
        $name =  $("#user-name-"+$id).text();
        $('#user_id').val($id);
        $('#f-user-name').text($name);
        $('#assignDeptForm').modal('show');
    });


} );

