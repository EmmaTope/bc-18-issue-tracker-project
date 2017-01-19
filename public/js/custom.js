jQuery(document).ready(function () {

    $('#flash_message').delay(8000).slideUp(850);

});

function setTabActive(link){
    $('.link').each(function(){
        $(this).removeClass('active');
    });
    $(link).parent().addClass('active');

}