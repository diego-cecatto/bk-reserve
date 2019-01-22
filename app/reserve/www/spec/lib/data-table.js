class DataTable {
    constructor(config) {
        this.config = {
            fields : []
            ,
            data : null
            ,
            destiny: document.getElementById("data-table-area")
            ,
            model: ''
        }
        new Configurador(config, this.config);
        this.getFields();
        this.build();
    }
    getFields() {
        const childs = this.config.datatable.children;
        for (let idcChild = 0; idcChild < childs.length; idcChild++) {
            const child = childs[idcChild];
            if(child.name == 'exp') {
                fields.push({name:child.value, description: child.html, isExp: true})
                continue;
            }
            fields.push({name:child.name, description: child.html, isExp: false})
        }
    }
    sum(exp) {
        var tot = 0;
        for (let idcData = 0; idcData < this.config.data.length; idcData++) {
            const val = parseInt(this.config.data[idcData][exp]);
            if(val === NaN) {
                return 0;
            }
            tot += val; 
        }
    }
    build() {
        this.table = $("<table>",{class:"table table-striped"});
        this.buildHeader();
        var dataTbleRef = this;
        this.getData.done(function(){
            dataTbleRef.buildRow();
            dataTbleRef.config.destiny.html(this.table);
        })
    }
    getData(){
        var model = new models[this.config.model]();
        var def = $.Defered();
        var dtaTbleRef = this;
        model.find(null, function(data){
            dtaTbleRef.data = data;
            def.resolve();
        })
        return def.promisse();
    }
    buildHeader() {
        var header = $("<thead>");
        for(var idcFields = 0; idcFields < this.config.fields.length;idcFields ++) {
            header.append($("<td>",{ html: this.config.fields[idcFields].description}));
        }
        this.table.append(header);
    }
    buildRow() {
        //formatar informação
        var tbody = $("<tbody>");
        for(var idcData = 0; idcData < this.config.data.length;idcData++) {
            var row = $("<row>");
            for(var idcFields = 0; idcFields < this.config.fields.length;idcFields ++) {
                var data = "";
                //???????????????????
                if(this.config.fields[idcFields].isExp) {
                    this.config.data[idcData][this.config.fields[idcFields].name];
                } else {
                    data = this.config.data[idcData][this.config.fields[idcFields].name];
                }
                tbody.append($("<td>",{ html: data}));
            }
            tbody.append(row);
        }
        this.table.append(tbody);
    }
}
//datatable = new DataTable();