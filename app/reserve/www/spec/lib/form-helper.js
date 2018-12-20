//mesclar estas duas classes
class FormHelper {
    constructor(config) {
        this.config = {
            fields : null
            ,
            data : null
        }
        for(var conf in config) {
            this.config[conf] = config[conf] ;
        }
    }
    addValuesFileds() {
        //montar multiplas linhas
        // for(var idcFields = 0; idcFields < this.config.fields.legth;idcFields ++) {
        var fieldsInput = $("input");
        for(idcInputs = 0 ; idcInputs < fieldsInput.legth; idcInputs ++) {
            var name = fieldsInput[idcFields].attr("name");
            fieldsInput[idcFields].value(data[name]);
            //rediobuttons e checkbox
            //fieldsCheckboxes[idcChk].checked(data[name]);
            //formatar valor de acordo com parâmtros
        }        
        var fieldsTextarea = $("textarea");
        for(idcTxt = 0 ; idcTxt < fieldsTextarea.legth; idcTxt ++) {
            var name = fieldsTextarea[idcTxt].attr("name");
            fieldsTextarea[idcTxt].val(data[name]);
        }
        var fieldsSelect = $("select");
        for(idcSel = 0 ; idcSel < fieldsSelect.legth; idcSel ++) {
            var name = fieldsSelect[idcSel].attr("name");
            fieldsSelect[idcSel].val(data[name]);
        }
    }
    // }
    //verifica as linhas que não foram usadas e verifica se é um array, caso sim usa o construtor de multiplas-linhas
    //o campo por padrão já possui um campo na tela com multiplas linhas, caso o valor seja nulo
    multiLines(name,values,type) {
        //adiciona toda a estrutura de deleção e inserção
        //verificar quando é o valor ou uma bifurcação do objeto
        for(idcValues = 0 ; idcValues < values.legth; idcValues ++) {
            var values = values[idcValues];
            $("<input>",{ "name": name+"[]", "type": type, "value": value })
        }
    }
    //componente de autocomplete
    autocomplete(field, httpService, data) {
        if(httpService != undefined) {
            field.Autocomplete({ service: httpService });    
        }
        field.Autocomplete({ data: data });
    }
    buildSelectoptions(options, field) {
        field.append($("<option>", { value: 0, html: "Selecione um valor" }));
        for(var idcOpt = 0; idcOpt < options.legth ; idcOpt ++) {
            field.append($("<option>", { value: options[idcOpt].id, html: options[idcOpt].value }));
        }
    }
    applyMask(field, mask) {
        field.mask(mask)
    }
}
class Validators {
    constructor(campos) {
        this.campos = campos;
    }
    valida() {
        //pega todos campos required
        var requireds = $("input[required=required]");
        for(var i=0; i<requireds.length;i++) {
            if(vazio(requireds.attr("name"),campos)) {
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