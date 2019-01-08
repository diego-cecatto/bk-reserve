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

//desenvolver métodos de setar as informações e pegar e também o modal para chamar os formulários rápidos
//tipos de relacionamentos
    //multi-fields
    //reference
    //single
//função enter não existe mobile
//em que momentos irá auto-adicionar os campos??
    //pode ser pelo js da página
//poder adicionar botões extras como o botão ligar
//pensar em como irá adicionar uma referência de contato nas reservas, ou de produtos
    //pode ser um formulário/modal
class ExternalForm {
    constructor () {
        $.ajax({
            url: this.config.urlModal,
            success : function(modal){
                $.ajax({
                    url: this.config.url,
                    success : function(html) {
                        var form = $(hmtl).find('form');
                        //remove os botões default do form ????
                        modal.find("#salvar").on('click', function() {
                            //redireciona para salvar o formulário
                        })
                        modal.replace('{{id}}', this.config.id)
                            .replace('{{body}}', form)
                            .replace('{{title}}', this.config.title)
                        window.html.append(modal)
                        $(this.config.id).modal();
                    }
                })
            }
        })
    }
}
class MultiField {
    constructor(config){
        this.config = {
            externButtons : [],
            id : '',
            field: null
        };
        for(var conf in this.config){
            if(config[conf] == undefined) {
                continue;
            }
            this.config[conf] = config[conf];
        }
        this.config.id = this.config.field.attr('id')
                                            .toString()
                                            .replace(/]|'/g, '')
                                            .replace( /\[/g, '-');
                                            
        this.build();
    }
    build() {
        var multifieldRef = this;
        var container = $('<div>', { id: 'multi-' + this.config.id }).append(
                            $("<div>" , {id:'data-' + this.config.id})
                        );
        var btnAdd = $('<i>',{class:'fas fa-plus'}).on('click',function(){
            multifieldRef.add();
        });
        //for this button or for data ??
        var externaButtons = [];
        for (let idcExtBtns = 0; idcExtBtns < this.config.externButtons.length; idcExtBtns++) {
            const btn = this.config.externButtons[idcExtBtns];
            externaButtons.push(
                $('<i>', {class: btn.id}).on('click', function(){
                    btn.fn();
                })
            );
        }
        this.config.field.parent().append(
             container
        );
        this.config.field.appendTo(container);
        if( multifieldRef.config.fnValidation != undefined ) {
            this.config.field.on('blur change keyup', function() {
                if($(this).val() == "") {
                    return;
                }
                if (multifieldRef.valid()) {
                    btnAdd.click();
                }
            })
        } else {
            this.config.field.on('keyup', function(event) {
                if( event.key.code == 13 ) {
                    btnAdd.click();
                }
            });
            this.config.field.on('blur', function(event) {
                btnAdd.click();
            });
        }
        if(this.config.mask !== undefined) {
            this.config.field.mask(this.config.mask);
        }
        container.append(
             $("<div>",{class:'icons'}).append(
                 WarningField.build(),
                 btnAdd,
                 externaButtons
           )
        );
    }
    add() {
        if(! this.valid()) {
            return false;
        }
        var multifieldRef = this;
        var input = $('<input>', { value: this.config.field.val() })
        .on('change blur', function(){
            console.log('chenge: valida o campo para ver se o usuário não preencheu indevidaemnte');
            if($(this).val() == "") {
                $(this).parent().parent().remove();
            }
        })
        .on('keyup',function() {
            multifieldRef.valid($(this));
            console.log('valida o campo para ver se o usuário não preencheu indevidaemnte');
        });
        if(this.config.mask !== undefined) {
            input.mask(this.config.mask);
        }
        $('#data-' + this.config.id).append(
            $('<div>').append(
                input,
                $("<div>",{class:'icons'}).append(
                    WarningField.build(),
                    $('<i>',{class:'fas fa-trash'}).on('click',function() {
                        $(this).parent().parent().remove();
                    })
                )
            )
        );
        this.config.field.val('');
    }
    valid(field){
        WarningField.addAlert(field);
        if (this.config.fnValidation == undefined ) {
            return true;
        }
        var isValid =  this.config.fnValidation(field.val());
        if(isValid) {
            return true;
        }
        WarningField.remove(field);
        return false;
    }
}
class Autocomplete {
    constructor(config) {
        this.config = {};
        for(let conf in config) {
            this.config[conf] = config[conf];
        }
        this.config.id = this.config.id.toString()
                                       .replace( '[', '-')
                                       .replace(/]|'/g, '');
        this.build();
    }
    build() {
        this.options = $("<div>", { id: 'options-' + this.config.id });
        this.config.field.after(
            this.options
        );
        var autocomplete = this;
        this.config.field.bind('blur keyup change',function(){
            autocomplete.search($(this).val());
        })
    }
    search(query) {
        this.options.html('');
        var refAutoComplete = this;
        if(this.data == null) {
            if( this.config.url == undefined ) {
                return;
            }    
            $.ajax({
                url: this.config.url,
                async: false,
                success: function(data){
                    refAutoComplete.data = data;
                }
            })
        }
        for (let idcData = 0; idcData < this.data.length; idcData++) {
            const res = this.data[idcData];
            var idcQuery = res.value.indexOf(query);
            if (idcQuery == -1) {
                continue;
            }
            this.options.append(
                $('<div>').append(
                    res.value.replace(query/g,'<span class="highlight">' + query + '</span>')
                ).on('click' , function() {
                    refAutoComplete.add(res.id, res.value);
                })
            );
        }
        this.showOptions();
    }
    add(id, value) {
        this.fnAdd(id, value);
        this.fnAfterAdd(id, value);
    }
}
class WarningField {
    static icon(field) {
        field.next('.icons').find('.fa-alert');
    }
    static add() {
        this.icon(field).addClass('fa-alert');
    }
    static remove(field) {
        this.icon(field).removeClass('fa-alert');
    }
    static build() {
        return $('<i>',{ class:'fas fa-alert' });
    }
}
//como misturar os dois??
    //parametrizar a função para isso ?

$(document).ready(function(){
    // $(".autocomplete").each(function(i,field){
    //     var logic = new Autocomplete({ field: $(field), id: field.id });
    // });
    $('.multi-field').each(function(idc,field){
        var multi = new MultiField({field : $(field)});
    })
})

