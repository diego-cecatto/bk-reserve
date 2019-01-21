class Autocomplete {
    constructor(config) {
        this.config = {
            field: null,
            alias:''
        };
        this.data = [{id:'1' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'},{id:'2' , value:'teste1'}];
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
                    new ExternalForm({ id: refAutocomplete.config.alias });
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
            $.ajax( {
                url: this.config.url,
                async: false,
                success: function(data){
                    refAutoComplete.data = data;
                }
            } )
        }
        for (var idcData = 0; idcData < this.data.length; idcData++) {
            var res = this.data[idcData];
            var idcQuery = res.value.indexOf(query);
            if (idcQuery == -1) {
                continue;
            }
            this.options.append(
                $('<div>').append(
                    res.value.replace(new RegExp(query,'g'),'<span class=\'highlight\'>' + query + '</span>')
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
        this.fnAdd(id, value);
        this.fnAfterAdd(id, value);
    }
}