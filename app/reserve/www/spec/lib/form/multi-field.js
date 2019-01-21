class MultiField {
    constructor(config){
        this.config = {
            area : null,
            input: null,
            default: ''
        }
        for(var conf in this.config){
            if(config[conf] == undefined) {
                continue;
            }
            this.config[conf] = config[conf];
        }
        if(!this.config.area && this.config.input) {
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
        if(this.config.input) {
            return this.config.input;
        }
        return this.config.area.find('input');
    }
    add() {
        if( !this.valid() ) {
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
        for( var idcInput = 0 ; idcInput < inputs.length; idcInput++) {
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
class MultiFieldV1 {
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
        var containerField = $('<div>', { class: 'data-multifield' });
        var container = $('<div>', { id: 'multi-' + this.config.id }).append(
                            $("<div>" , { id:'data-' + this.config.id , class: 'data-multifield'}),
                            containerField
                        );
        var btnAdd = $('<i>', { class:'fas fa-plus' }).on('click', function(){
            multifieldRef.add();
        });
        //for this button or for data ??
        var externaButtons = [];
        for (let idcExtBtns = 0; idcExtBtns < this.config.externButtons.length; idcExtBtns++) {
            const btn = this.config.externButtons[idcExtBtns];
            externaButtons.push(
                $('<i>', { class: btn.id }).on('click', function(){
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
        if( !this.valid() ) {
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
