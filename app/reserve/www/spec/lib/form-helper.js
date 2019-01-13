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
    multiLines(name, values, type) {
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
    constructor (configurations) {
        this.config = configurations;
        this.config.url = this.config.id +'.html';
        this.config.urlModal = 'html/partials/modal.html';
        var externalForm = this;
        //caso ele já exista retorna
        $.ajax({
            url: this.config.urlModal,
            success : function(modal){
                //console.log($(modal))
                //var modal = $(modal);
                $.ajax({
                    url: externalForm.config.url,
                    success : function(formHTML) {
                       // g = formHTML;
                        var form = $(formHTML).find('form').parent().html();
                        var idcTitleStart = formHTML.indexOf('<title>');
                        var idcTitleEnd = formHTML.indexOf('</title>');
                        var title = formHTML.substring(idcTitleStart + '<title>'.length, idcTitleEnd)
                        modal = modal.replace('{{id}}', externalForm.config.id)
                                    .replace('{{body}}', form)
                                    .replace('{{title}}',title)
                        //pode esconder os botões e executa a ação depois através do trigger destes botões
                        //como providenciar as ações naturais do form ?
                        //javascripts ????
                        modal = $(modal);
                        // modal.find("#salvar").on('click', function() {
                        //     //redireciona para salvar o formulário
                        //     return;
                        // }
                        $('body').append(modal)
                        page.bundleDependence(externalForm.config.id)
                        modal.modal();
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
            mask: '',
            field: null, 
            defaultValue : ''
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
        var containerField = $('<div>',{ class: 'data-multifield' });
        var container = $('<div>', { id: 'multi-' + this.config.id }).append(
                            $("<div>" , { id:'data-' + this.config.id , class: 'data-multifield'}),
                            containerField
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
        this.config.field.appendTo(containerField);
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
                if( event.keyCode == 13 ) {
                    btnAdd.trigger('click');
                }
            });
            this.config.field.on('blur', function(event) {
                btnAdd.trigger('click');
            });
        }
        if(this.config.mask !== undefined) {
            new Mask(this.config.field, this.config.mask);
        }
        this.warningValidation = new WarningField();
        containerField.append(
             $("<div>",{ class:'icons' }).append(
                this.warningValidation.build(),
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
        var input = $('<input>', { value: this.config.field.val(), class:'form-control' })
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
            new Mask(input, this.config.mask);
        }
        //this.warningValidation = new WarningField();
        $('#data-' + this.config.id).append(
            $('<div>', {class:'data-item'}).append(
                input,
                $("<div>",{class:'icons'}).append(
                    //this.warningValidation.build(),
                    $('<i>',{class:'fas fa-trash'}).on('click',function() {
                        $(this).parent().parent().remove();
                    })
                )
            )
        );
        this.config.field.val(this.config.defaultValue);
    }
    valid(field){
        this.warningValidation.remove();
        if(this.config.field.val() == this.config.defaultValue || this.config.field.val() == '') {
            return false;
        }
        if (this.config.fnValidation == undefined ) {
            return true;
        }
        var isValid = this.config.fnValidation(field.val());
        if(isValid) {
            return true;
        }
        this.warningValidation.add();
        return false;
    }
}
class Autocomplete {
    constructor(config) {
        this.config = {
            field: null
        };
        this.data = [{id:'1' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'}];
        for(let conf in this.config) {
            if(config[conf] == undefined) {
                continue;
            }
            this.config[conf] = config[conf];
        }
        this.config.id = this.config.field.attr('name').toString()
                                                        .replace( '[', '-')
                                                        .replace(/]|'/g, '');
        this.build();
    }
    build() {
        var autocompleteArea = $('<div>',{class: 'autocomplete'});
        autocompleteArea.insertAfter(this.config.field);
        this.options = $("<div>", { id: 'options-' + this.config.id,class:'autocomplete-options' });
        var refAutocomplete = this;
        autocompleteArea.append(
            this.config.field,
            this.options,
            $('<div>', {class:'icons'}).append(
                $('<i>', {class: 'fas fa-plus'}).on('click',function(){
                    new ExternalForm({id: refAutocomplete.config.id});
                }),
                $('<i>', { class: 'fas fa-warning' })
            )
        );
        this.config.field.bind('keyup', function(event){
            if(refAutocomplete.analyseKeys != undefined) {
                if(refAutocomplete.analyseKeys(event)) {
                    return;
                }
            }
            refAutocomplete.search($(this).val());
        }).attr('autocomplete','off')
    }
    search(query) {
        this.options.html('');
        this.desvinculeKeys();
        if(query.length == 0) {
            return;
        }
        var refAutoComplete = this;
        if(this.data == null ) {
            //pega com base no id
            //instancia a classe de referência dos models
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
        for (var idcData = 0; idcData < this.data.length; idcData++) {
            var res = this.data[idcData];
            var idcQuery = res.value.indexOf(query);
            if (idcQuery == -1) {
                continue;
            }
            this.options.append(
                $('<div>').append(
                    res.value.replace(new RegExp(query,"g"),'<span class="highlight">' + query + '</span>')
                ).on('click' , function() {
                    this.add(res.id, res.value);
                })
            );
        }
        if(this.options.length > 0 ) {
            this.vinculeKeys();
        }
        //this.showOptions();
    }
    vinculeKeys() {
        this.analyseKeys = function(event){
            var selectedItem = this.options.find('.selected');
            var ret = false;
            g = this.options;
            var next = undefined;
            if(event.keyCode == 40) {
                if(selectedItem.length == 0) {
                    next = this.options.children().first();
                } else{
                    next = $(selectedItem).next();
                    if(next.length == 0) {
                        next = this.options.children().first();;
                    }
                }
                ret = true;
            }
            if(event.keyCode == 38) {
                if(selectedItem.length == 0) {
                    next = this.options.children().last();
                } else{
                    next = $(selectedItem).prev();
                    if(next.length == 0) {
                        next = this.options.children().last();
                    }
                }
                ret = true;
            }
            //console.log(next);
            if(next !== undefined) {
                selectedItem.removeClass('selected')
                next.addClass('selected');
            }
            return ret;
        }
    }
    desvinculeKeys () {
        this.analyseKeys = undefined;
    }
    add(id, value) {
        this.fnAdd(id, value);
        this.fnAfterAdd(id, value);
    }
}   
class WarningField {
    constructor(){
        
    }
    add() {
        this.icon.addClass('fa-alert');
    }
    remove(field) {
        this.icon.removeClass('fa-alert');
    }
    build() {
        this.icon = $('<i>',{ class:'fas' });
        return this.icon;
    }
}
//como misturar os dois??
    //parametrizar a função para isso ?

$(document).ready(function(){
    // $(".autocomplete").each(function(i,field){
    //     var logic = new Autocomplete({ field: $(field), id: field.id });
    // });
   
})

class Mask {
    constructor(input, mask) {
        if(input == undefined) {
            console.log('Input não encontrado para aplicar a máscara');
            return;
        }
        if ( mask == 'celphone') {
            var SPMaskBehavior = function (val) {
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
              },
              spOptions = {
                onKeyPress: function(val, e, field, options) {
                    field.mask(SPMaskBehavior.apply({}, arguments), options);
                  }
              };
            input.mask(SPMaskBehavior, spOptions)
            return;
        }
        if(mask == 'money') {
            input.mask('#.##0,00', {reverse: true});
            return;
        }
        console.log('máscara não encontrada');
    }
}var g = null;