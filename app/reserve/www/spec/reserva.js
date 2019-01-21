$(window).ready(function(){
    new Autocomplete({ field: $("#reserva #cliente"), url:'' , formInclude: ''});
    new MultiField({ area: $("#reserva #produtos") })
    new Autocomplete({ field: $("#reserva [name='products[]']"), alias:'produto' , formInclude: ''});  
    new Select({input: $("#reserva [name='status']")});
    new Mask($('#reserva [name=hour]'),'hour');
    $('#reserva .datepicker').datepicker();
    new Form({ form: $("#reserva"), model: 'reserva'});
});