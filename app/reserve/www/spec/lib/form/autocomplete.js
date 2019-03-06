class Autocomplete {
    constructor(config) {
        this.config = {
            field: null,
            model: '',
            name: 'name'
        };
        //this.data = [{id:'1' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'}];
        for (let conf in this.config) {
            if (config[conf] == undefined) {
                continue;
            }
            this.config[conf] = config[conf];
        }
        if (this.config.field == undefined || this.config.field.length == 0) {
            console.log('não foi possível encontrar o campo');
            return;
        }
        this.config.id = this.config.field.attr('name').toString()
                                                        .replace(/\[/g, '')
                                                        .replace(/]|'/g, '');
        if (this.config.model == undefined || this.config.model =='') {
            this.config.model = this.config.id;
        }
        this.build();
    }
    build() {
        var classe = this;
        var autocompleteArea = $('<div>', { class: 'autocomplete' });
        autocompleteArea.insertAfter(this.config.field);
        this.options = $("<div>", { id: 'options-' + this.config.id, class:'autocomplete-options' });
        var refAutocomplete = this;
        //{ name: 'name-' + this.config.id }
        this.acomplete = $('<input>')
        autocompleteArea.append(
            this.config.field.attr('type', 'hidden'),
            this.acomplete.addClass(this.config.field.attr('class')),
            this.options,
            $('<div>', { class:'icons' }).append(
                $('<i>', { class: 'fas fa-plus' }).on('click', function() {
                    new ExternalForm({ 
                                        id: refAutocomplete.config.model,
                                        afterSave: function(data) {
                                            classe.acomplete.val(data.name);
                                            classe.config.field.val(data.id.toString());
                                        }});
                }),
                $('<i>', { class: 'fas fa-warning' })
            )
        );
        this.acomplete.on('keyup', function(event) {
            if (refAutocomplete.analyseKeys != undefined && refAutocomplete.analyseKeys(event)) {
                return;
            }
            refAutocomplete.search($(this).val());
        })
        // .on('change', function() {
        //     refAutocomplete.closeOptions()
        // })
        .attr('autocomplete','off')
        this.getData();
    }
    getData() {
        if (this.gettingData) {
            return;
        }
        if ( this.config.model == undefined || this.config.model == '' ) {
            console.log('Sem nenhum model definido');
            return;
        }    
        this.gettingData = true;
        var refAutoComplete = this;
        var model = new models[this.config.model]();
        model.find(null, function(data){
            refAutoComplete.data = data;
            //refAutoComplete.showOptions(query);
        });
    }
    search(query) {
        this.options.html('');
        this.desvinculeKeys();
        if (query.length == 0) {
            return;
        }
        if (this.data == null ) {
            //this.getData(query);
            return;
        }
        this.showOptions(query);
        //this.showOptions();
    }
    showOptions(query){
        var classe = this;
        for (var idcData = 0; idcData < this.data.length; idcData++) {
            var res = this.data[idcData];
            var ocurrences = res[this.config.name].match(new RegExp(query,'g'));
            if (ocurrences == null) {
                continue;
            }
            var currOption = $('<div>', { 'data-id':res._id.toString(),  'data-name':res[classe.config.name] }).append(
                                    res[this.config.name].replace(new RegExp(query,'g'), '<span class=\'highlight\'>' + query + '</span>')
                                ).on('click', function() {
                                    // console.log(res);
                                    classe.add($(this).attr('data-id'),$(this).attr('data-name'));
                                })
            this.options.append(
                currOption
            );
        }
        if (this.options.length > 0 ) {
            this.vinculeKeys();
        }
    }
    vinculeKeys() {
        this.analyseKeys = function(event) {
            var selectedItem = this.options.find('.selected');
            var ret = false;
            var next = undefined;
            if (event.keyCode == 13) {
                console.log();
                //event.preventDefault();
                this.options.find('.selected').click();    
                return true;
            }
            if (event.keyCode == 40) {
                if (selectedItem.length == 0) {
                    next = this.options.children().first();
                } else {
                    next = $(selectedItem).next();
                    if (next.length == 0) {
                        next = this.options.children().first();;
                    }
                }
                ret = true;
            }
            if (event.keyCode == 38) {
                if (selectedItem.length == 0) {
                    next = this.options.children().last();
                } else {
                    next = $(selectedItem).prev();
                    if (next.length == 0) {
                        next = this.options.children().last();
                    }
                }
                ret = true;
            }
            if (next !== undefined) {
                selectedItem.removeClass('selected')
                next.addClass('selected');
            }
            return ret;
        }
    }
    closeOptions() {
        this.desvinculeKeys();
        this.options.html('');
    }
    desvinculeKeys () {
        this.analyseKeys = undefined;
    }
    add(id, value) {
        console.log(id,value);
        this.config.field.val(id);
        this.acomplete.val(value);
        // this.fnAdd(id, value);
        // this.fnAfterAdd(id, value);
        this.closeOptions();
    }
}