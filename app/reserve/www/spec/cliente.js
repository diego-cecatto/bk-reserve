$(window).ready(function(){
    var inputTelefone = $('#cliente [name=\'contacts[]\'');
    var telefone = new MultiField({input : inputTelefone, default: '(54) '});
    new Mask(inputTelefone, 'celphone');
    new Form({ form: $("#cliente"), model: 'cliente'});
})