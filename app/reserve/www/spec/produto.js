function salvar(data) {
    var produtoModel = new Produto();
    console.log(data);
    //produtoModel.deleteOne(data);
}
$(window).ready(function(){
    new Mask($('#valor'), 'money');
})