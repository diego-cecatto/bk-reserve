$(window).ready(function(){
    new Autocomplete({ field: $("#reserva #cliente"), url:'' , formInclude: ''});
    new MultiFieldV2({ area: $("#reserva #cliente").parent() })
    new Autocomplete({ field: $("#reserva #produto"), url:'' , formInclude: ''});
})