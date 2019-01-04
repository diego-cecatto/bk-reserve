//mesclar estas 3 classes
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
        //montar auto-complete
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

(function() {
	function toJSONString( form ) {
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;
			if( name ) {
				obj[ name ] = value;
			}
		}
		return JSON.stringify( obj );
    }
    document.addEventListener( "DOMContentLoaded", function() {
        var form = document.getElementsByTagName( "form" )[0];
        form.addEventListener( "submit", function( e ) {
            e.preventDefault();
            var json = toJSONString( this );
            salvar(json);
        }, false);
        document.getElementById('cancel').addEventListener( "click", function( e ) {
            e.preventDefault();
            window.location.href = this.attr(ref);
        }, false);
    });
})();

//multi-fields
//reference
//single
class MultiField{
    constructor(config){
        //faz o bind no campo principal
        this.config = config;
        this.config.id = this.config.field.attr('id')
                                            .toString()
                                            .replace(/]|'/g, '')
                                            .replace( /\[/g, '-');
                                            
        this.build();
    }
    build() {
        var container = $('<div>', { id: 'multi-' + this.config.id }).append(
                            $("<div>" , {id:'data-' + this.config.id})
                        );
        this.config.field.parent().append(
             container
        );
        this.config.field.appendTo(container);
        //terá um campo alerta, caso a validação estteja errada
        container.append(
             $("<div>",{id:'icon-contents'}).append(
                 $('<i>',{class:'fas fa-alert'}),
            )
        );
            }
    add() {
        if(! this.valid()) {
            return;
        }
        //o telefone pode ser definido quando se insere o telefone com a máscara correta, cria um espelho do campo
        //o telefone pode ser removido quando ele remove todo o campo e sai dele, ou quando clica no botão excluir
        //estes evento de excluir irá estar disponível somente nos campos espelhados
        $('data-'+this.id).append(
            $('<div>').append(
                $('<input>', { value: this.field.value }),
                $("<div>",{id:'icon-contents'}).append(
                    $('<i>',{class:'fas fa-alert'}),
                    $('<i>',{class:'fas fa-trash'})
                )
            )
        );
    }
    remove(id) {
        $(id).remove();
    }
    valid(){
        //se não houver validação o campo está sendo considerado como válido e retornará true somente qundo tirar o foco do campo
        //case not are a validation method
        return (this.config.validation());
    }
}
class Autocomplete{
    constructor(config) {
        console.log('build autocomplete')
        this.config = {};
        for(let conf in config) {
            this.config[conf] = config[conf];
        }
        this.config.id = this.config.id.toString()
                                       .replace( '[', '-')
                                       .replace(/]|'/g, '');
        console.log(this.config);
        this.build();
    }
    build() {
        // console.log(this.config.field.parent());
        // this.config.field.parent().append(
        //     $("<div>", {id: this.config.id})
        // );
        // this.config.field.appendTo(this.config.id);
        this.config.field.parent().append(
            $("<div>", {id: 'options-' + this.config.id})
        );
        var autocomplete = this;
        this.config.field.bind('blur keyup change',function(){
            autocomplete.search($(this).val());
        })
    }
    search(query) {
        console.log(query);
        this.showOptions([{id:1 , value: 'teste'}])
        // var data = {} ;
        // atcplte = this;
        // data[this.config.param] = query ; 
        // $.ajax({
        //     url: this.config.url,
        //     data: data,
        //     success:function(data){
        //         atcplte.showOptions(data);
        //     }
        // })
    }
    add(id, value) {
        console.log('add');
    }
    validate() {

    }
    showOptions(options) {
        var htmlOptions = [];
        var autocomplete = this;
        for (let idcOptions = 0; idcOptions < options.length; idcOptions++) {
            const option = options[idcOptions];
            htmlOptions.push($('<div>', { text: option.value }).on('click',function(){
                autocomplete.add(option.id, option.value)
            }))
        }
        $("#options-" + this.config.id).html(
            htmlOptions
        );
    }
    highlightQuery(value){
        console.log('highlightlting value')
    }
}

$(document).ready(function(){
    // $(".autocomplete").each(function(i,field){
    //     var logic = new Autocomplete({ field: $(field), id: field.id });
    // });
    $('.multi-field').each(function(idc,field){
        var multi = new MultiField({field : $(field)});
    })
})

