Script.include('spec/lib/configurador.js');
class DataTable {
    constructor(config) {
        this.config = {
            fields : []
            ,
            data : null
            ,
            dataTable: $("#data-table")
            ,
            model: ''
        }
        new Configurador(config, this.config);
        this.getFields();
        this.build();
    }

    getFields() {
        const childs = this.config.dataTable.children();
        for (let idcChild = 0; idcChild < childs.length; idcChild++) {
            const child = $(childs[idcChild]);
            var name = child.prop('tagName').toLowerCase();
            if (name == 'exp') {
                this.config.fields.push({ name:child.attr('val'), description: child.html(), isExp: true })
                continue;
            }
            name = camelize(name);
            this.config.fields.push({ name:name, description: child.html(), isExp: false })
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
        this.table = $("<table>",{ class:"table table-striped" });
        this.buildHeader();
        this.getData();
    }

    getData() {
        var model = new models[this.config.model]();
        // var def = $.Deferred();
        var dataTbleRef = this;
        model.find(null, function(data) {
            console.log(data);
            dataTbleRef.config.data = data;
            dataTbleRef.buildRows();
        })
        // return def.promise();
    }

    buildHeader() {
        var header = $("<thead>");
        for(var idcFields = 0; idcFields < this.config.fields.length; idcFields ++) {
            header.append($("<td>",{ html: this.config.fields[idcFields].description}));
        }
        this.table.append(header);
    }

    buildRows() {
        // console.log(this.config.data);
        // return;
        //formatar informação
        var tbody = $("<tbody>");
        for(var idcData = 0; idcData < this.config.data.length; idcData++) {
            var row = $("<tr>");
            for (var idcFields = 0; idcFields < this.config.fields.length; idcFields ++) {
                var data = "";
                if (this.config.fields[idcFields].isExp) {
                    var startColName = this.config.fields[idcFields].name.indexOf('.');
                    var colName = this.config.fields[idcFields].name.substring(0, startColName);
                    var exp = this.config.fields[idcFields].name.substring(startColName + 1);
                    var info = this.config.data[idcData][colName];
                    if (info == undefined) {
                        info = this.config.data[idcData][colName + '[]'];
                    }
                    data = info[exp];
                } else {
                    data = this.config.data[idcData][this.config.fields[idcFields].name];
                    console.log(this.config.fields[idcFields]);
                }
                tbody.append($("<td>",{ html: data}));
            }
            tbody.append(row);
        }
        this.table.append(tbody);
        this.config.dataTable.html(this.table);
    }
}
//datatable = new DataTable();