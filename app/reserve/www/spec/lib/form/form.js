//exibir a data-table e o form na mesma tela, evita ficar carregando vários scripts
Script.include('spec/lib/configurador.js');
class Form {
    constructor(config) {
        this.config = {
            form : null,
            model: '',
            casts: null
        }
        new Configurador(config, this.config, ['form']);
        this.setActions();
    }
    setData() {
        var id = Page.parameter('id');
        if(id == undefined || id == 0) {
            return;
        }
        var model = new models[this.config.model]();
        var formRef = this;
        model.findOne({_id:id}, function(data) {
            for(var field in data) {
                //verifica o tipo
                //verifica se encontrou o campo
                //verifica se é do id
                formRef.config.form.find('[name='+field+']').val(data[field]);
            }
        })
    }
    toJSONString() {
        var form = this.config.form;
        var obj = {};
        var elements = form.find( "input, select, textarea" );
        for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;
            var casts = this.config.casts;
            if(casts !=undefined && casts[name] != undefined) {
                if(casts[name] == 'float') {
                    value = parseFloat(value.replace(',','.'));
                } else if(casts[name] == 'integer') {
                    value = parseInt(value);
                }
            }
            if( name ) {
                obj[ name ] = value;
            }
        }
        return obj;
    }
    setActions() {
        var form = this.config.form;
        var formRef = this;
        form.on( "submit", function( e ) {
            e.preventDefault();
            var json = formRef.toJSONString();
            console.log(json);
            var model = new models[formRef.config.model]();
            model.insertOne(json, function(){
                formRef.config.form.find('#cancel').click();
            });
        });
        form.find('#cancel').on( "click", function( e ) {
            e.preventDefault();
            window.location.href = formRef.config.model + 's.html';
        });
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