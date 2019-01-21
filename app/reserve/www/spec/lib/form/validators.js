class Validators {
    constructor(campos) {
        this.campos = campos;
    }
    valida() {
        //pega todos campos required
        var requireds = $("input[required=required]");
        for(var i=0; i < requireds.length; i++) {
            if(vazio(requireds.attr("name"), campos)) {
                return false;
            }
        }
        return true;
    }
    vazio(campo) {
        return (this.campos[campo] !== undefined && this.campos[campo] != " ");
    }
    //validações de decimal
    //validações de data
    //validações de array com todos os valores
}