$(window).ready(function(){
    new Autocomplete({ field: $("#reserva #cliente"), url:'' , formInclude: ''});
    new Autocomplete({ field: $("#reserva #produto"), url:'' , formInclude: ''});
})