$(window).ready(function(){
    cliente = new Autocomplete({ 
                        field: $("#reserva #cliente"),
                        url:'' , 
                        formInclude: ''
                    });
    new MultiField({ area: $("#reserva #produtos") })
    produtos = new Autocomplete({ field: $("#reserva [name='products[id][]']"), 
                                        alias:'produto' ,
                                        formInclude: '',
                                        model:  'produto'
                                    });  
    new Select({input: $("#reserva [name='status']")});
    new Mask($('#reserva [name=hour]'),'hour');
    $('#reserva .datepicker').datepicker();
    new Form({ form: $("#reserva"), model: 'reserva'});
});