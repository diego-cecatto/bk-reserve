Script.include('spec/lib/form/external-form.js');
class MultiField {
    constructor(config){
        this.config = {
            area : null,
            input: null,
            default: ''
        }
        for (var conf in this.config){
            if (config[conf] == undefined) {
                continue;
            }
            this.config[conf] = config[conf];
        }
        if (!this.config.area && this.config.input) {
            this.config.area = this.config.input;
        }
        this.build();
    }
    build() {
        //usar a classe de construção de ícones para os multicampos
        //talvez o próprio campo faça a validação dos campos para averiguar se será adicionado o próximo campo ou não
        //como funcionará os ids destes campos, icarão vazios
        var multifieldRef = this;
        this.dataContainer = $('<div>', { class: 'data-multifield' }).insertBefore(
            this.config.area    
        )
        this.warningValidation = new WarningField();
        // ,
        //     $('<i>', { class:'fas fa-check' }).on('click', function(){
        //         multifieldRef.add();
        //     }),
        //     $("<div>",{ class: 'icons' }).append(
        //         this.warningValidation.build()
        //    )
        // console.log(this.getInputs())
        this.getInputs().on('keyup', function(event) {
            console.log('validar para adicionar item')
            if( event.keyCode == 13 ) {
                multifieldRef.add();
            }
        }).on('blur', function() {
            multifieldRef.add();
        });
    }
    getInputs() {
        if (this.config.input) {
            return this.config.input;
        }
        return this.config.area.find('input');
    }
    add() {
        if ( !this.valid() ) {
            return false;
        }
        var multifieldRef = this;
        //var inputs = this.getInputs();
        var dataItem = $('<div>', {class:'data-item'});
        var clone = this.config.area.clone();
        this.dataContainer.append(
            dataItem.append(
                clone
            )
        );
        clone.find('input').attr('readonly', true);
        clone.find('.icons').html('');
        // .on('change blur', function(){
        //     for (var idcInputs = 0; idcInputs < inputs.length; idcInputs++) {
        //         var input = inputs[idcInputs];
        //         if($(input).val() != "") {
        //             return;    
        //         }    
        //     }
        //     dataItem.remove();
        // })
        // .on('keyup',function() {
        //     for (var idcInputs = 0; idcInputs < inputs.length; idcInputs++) {
        //         var input = inputs[idcInputs];
        //         console.log('continua a validação original ???');
        //     }
        // });
        new Icon({ area : dataItem
                    , icon: $('<i>',{ class:'fas fa-trash' })
                            .on('click',function() {
                                dataItem.remove();
                            })
                        });
        this.getInputs().val(this.config.default);
    }
    valid(field) {
        var inputs = this.getInputs();
        for ( var idcInput = 0 ; idcInput < inputs.length; idcInput++) {
            if($(inputs[idcInput]).val() == '') {
                return false;
            }
        }
        return true;
        // this.warningValidation.remove();
        // if(this.config.field.val() == this.config.defaultValue || this.config.field.val() == '') {
        //     return false;
        // }
        // if (this.config.fnValidation == undefined ) {
        //     return true;
        // }
        // var isValid = this.config.fnValidation(field.val());
        // if(isValid) {
        //     return true;
        // }
        // this.warningValidation.add();
        // return false;
    }
}