// function salvar(data) {
//     var model = new Produto();
//     model.salvar($('#produto').serialize());
// }
$(window).ready(function(){
    new Mask($('#produto [name=price]'), 'money');
    new Form({ form: $("#produto"), model: 'produto', 
    casts: {stock : 'integer', price: 'float'}
});
})