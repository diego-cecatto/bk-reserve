class DataTable {
    constructor(config) {
        this.config = {
            fields : null
            ,
            data : null
            ,
            destiny: "data-table-area"
        }

        for(var conf in config) {
            this.config[conf] = config[conf] ;
        }
    }
    build() {
        this.table = $("<table>",{class:"table table-striped"});
        this.buildHeader();
        this.buildRow();
    }
    buildHeader() {
        var header = $("<thead>");
        for(var idcFields = 0; idcFields < this.config.fields.legth;idcFields ++) {
            header.append($("td",{ html: this.config.fields[idcFields].description}));
        }
        this.table.append(header);
    }
    buildRow() {
        //formatar informação
        var tbody = $("<tbody>");
        for(var idcData = 0; idcData < config.data.legth;idcData++) {
            var row = $("<row>");
            for(var idcFields = 0; idcFields < this.config.fields.legth;idcFields ++) {
                tbody.append($("td",{ html: this.config.data[idcData][this.config.fields[idcFields].name]}));
            }
            tbody.append(row);
        }
        this.table.append(tbody);
    }
}