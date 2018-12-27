class DataTable {
    constructor(config) {
        this.config = {
            fields : null
            ,
            data : null
            ,
            destiny: "#data-table-area"
        }
        for(var conf in config) {
            this.config[conf] = config[conf] ;
        }
        this.build();
    }
    build() {
        this.table = $("<table>",{class:"table table-striped"});
        this.buildHeader();
        this.buildRow();
        $(this.config.destiny).html(this.table);
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
                tbody.append($("<td>",{ html: this.config.data[idcData][this.config.fields[idcFields].name]}));
            }
            tbody.append(row);
        }
        this.table.append(tbody);
    }
}
datatable = new DataTable({fields:[{name:'name',description:"Nome"},{name:'age',description:"Idade"}],data:[{name:'teste',age:21}]});