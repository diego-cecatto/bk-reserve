class Autocomplete {
    constructor(config) {
        this.config = {
            field: null,
            model: '',
            name: 'name'
        };
        //this.data = [{id:'1' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'}];
        for(let conf in this.config) {
            if(config[conf] == undefined) {
                continue;
            }
            this.config[conf] = config[conf];
        }
        if(this.config.field == undefined) {
            console.log('não foi possível encontrar o campo');
            return;
        }

        this.config.id = this.config.field.attr('name').toString()
                                                        .replace(/\[/g, '')
                                                        .replace(/]|'/g, '');
        this.config.model = this.config.id;
        this.build();
    }
    build() {
        var autocompleteArea = $('<div>', { class: 'autocomplete' });
        autocompleteArea.insertAfter(this.config.field);
        this.options = $("<div>", { id: 'options-' + this.config.id, class:'autocomplete-options' });
        var refAutocomplete = this;
        autocompleteArea.append(
            this.config.field,
            this.options,
            $('<div>', { class:'icons' }).append(
                $('<i>', { class: 'fas fa-plus' }).on('click', function(){
                    new ExternalForm({ id: refAutocomplete.config.model });
                }),
                $('<i>', { class: 'fas fa-warning' })
            )
        );
        this.config.field.on('keyup', function(event){
            if(refAutocomplete.analyseKeys != undefined) {
                if(refAutocomplete.analyseKeys(event)) {
                    return;
                }
            }
            refAutocomplete.search($(this).val());
        })
        .on('change', function() {
            refAutocomplete.closeOptions()
        })
        .attr('autocomplete','off')
        this.getData();
    }
    getData() {
        if(this.gettingData) {
            return;
        }
        if( this.config.model == undefined || this.config.model == '' ) {
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
        if(query.length == 0) {
            return;
        }
        if(this.data == null ) {
            //this.getData(query);
            return;
        }
        this.showOptions(query);
        //this.showOptions();
    }
    showOptions(query){
        for (var idcData = 0; idcData < this.data.length; idcData++) {
            var res = this.data[idcData];
            var ocurrences = res[this.config.name].match(new RegExp(query,'g'));
            if (ocurrences == null) {
                continue;
            }
            this.options.append(
                $('<div>').append(
                    res[this.config.name].replace(new RegExp(query,'g'),'<span class=\'highlight\'>' + query + '</span>')
                ).on('click' , function() {
                    this.add(res._id.toString(), res[this.config.name]);
                })
            );
        }
        if(this.options.length > 0 ) {
            this.vinculeKeys();
        }
    }
    vinculeKeys() {
        this.analyseKeys = function(event) {
            var selectedItem = this.options.find('.selected');
            var ret = false;
            var next = undefined;
            if(event.keyCode == 13) {
                event.preventDefault();
                selectedItem.click();
            }
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
            if(next !== undefined) {
                selectedItem.removeClass('selected')
                next.addClass('selected');
            }
            return ret;
        }
    }
    closeOptions(){
        this.options.html('');
        this.desvinculeKeys();
    }
    desvinculeKeys () {
        this.analyseKeys = undefined;
    }
    add(id, value) {
        console.log(id,value);
        closeOptions();
        // this.fnAdd(id, value);
        // this.fnAfterAdd(id, value);
    }
}