function salvar(data) {
    // var produtoModel = new Produto();
    console.log(data);
    //produtoModel.deleteOne(data);
}

$(window).ready(function(){
    $('#cliente .multi-field').each(function(idc,field){
            var multi = new MultiField({field : $(field), mask: 'celphone', defaultValue: '(54) '});
    })
})