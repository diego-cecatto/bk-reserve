$(window).ready(function() {
    var inputTelefone = $('form#cliente [name=\'contacts[]\'');
    var telefone = new MultiField({input : inputTelefone, default: '(54) '});
    new Mask(inputTelefone, 'celphone');
    cliente = new Form({ 
                        form: $("form#cliente"), 
                        model: 'cliente'
                        });
})