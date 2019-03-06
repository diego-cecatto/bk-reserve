// function salvar(data) {
//     var model = new Produto();
//     model.salvar($('#produto').serialize());
// }
$(window).ready(function(){
    new Mask($('form#produto [name=price]'), 'money');
    produto = new Form({ 
                        form: $("form#produto"), 
                        model: 'produto', 
                        casts: { 
                                stock : 'integer', 
                                price: 'float' 
                        }
                    });
})