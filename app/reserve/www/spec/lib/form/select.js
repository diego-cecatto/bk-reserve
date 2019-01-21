class Select {
    constructor(conf) {
        this.conf = {
            input: null, 
            model: '',
            id:'id',
            value: 'name'
        }
        this.loadDependences();
        new Configurador(conf, this.conf,['input']);
        this.conf.model = this.conf.input.attr('name');
        this.build();
    }
    loadDependences(){
        Script.include('spec/lib/configurador.js');
    }
    build() {
        //var model = eval('new '+ this.conf.model +'()');
        var model = new models[this.conf.model]();
        var selectRef = this;
        model.find(null, function(results) {
            g = results;
            for (let idcRes = 0; idcRes < results.length; idcRes++) {
                const result = results[idcRes];
                selectRef.conf.input.append(
                    $('<option>', { value: result._id.toString(), text: result[selectRef.conf.value] })
                )
            }
        });
        // var results = model.findAll();
        
    }
}