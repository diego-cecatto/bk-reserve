$(window).ready(function(){
    clientAC = new Autocomplete({ 
                        field: $("#reserva #client"), 
                        alias:'cliente',
                        model:'cliente'
                    });
    new MultiField({ area: $("#reserva #produtos") })
    productsAC = new Autocomplete({ 
                                    field: $("#reserva [name='productsReserves[id][]']"), 
                                    alias:'produto' ,
                                    model: 'produto'
                                });  
    new Select({input: $("#reserva [name='status']")});
    new Mask($('#reserva [name=hour]'),'hour');
    $('#reserva .datepicker').datepicker();
    new Form({ form: $("#reserva"), model: 'reserva'});
});