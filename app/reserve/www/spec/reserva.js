$(window).ready(function(){
    new Autocomplete({ field: $("#reserva #cliente"), url:'' , formInclude: ''});
    new MultiFieldV2({ area: $("#reserva #produtos") })
    new Autocomplete({ field: $("#reserva [name='products[name][]']"), url:'' , formInclude: ''});
})
// Produtos
// *fazer uma carga inicial e alterar essa carga caso sofram alterações
// *clientes também
// Adicionar e remover * assim como nos contatos
// Colocar campo de valor acordado por unidade, para que nos assados possa servir como valor de peso