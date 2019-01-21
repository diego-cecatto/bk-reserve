Status = null;
Produto = null
Reserva = null;
Clients = null;
var Script = {
    _loadedScripts: [],
    include: function(url) {
        if(Array.isArray(url)){
            for (let idcUrl = 0; idcUrl < url.length; idcUrl++) {
                this.include(url[idcUrl])
            }
            return;
        }
        if (this._loadedScripts.indexOf(url) != -1) {
            console.log('already exist');
            return false;
        }
        xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();
        var code = xhttp.responseText;
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.innerHTML = code;
        document.body.appendChild(script);
        this._loadedScripts.push(url);
    }
};
var CSS = {
        _loadedCSS: [],
        include: function(link) {
            if (this._loadedCSS.indexOf(link) != -1) {
                console.log('already exist');
                return false;
            }
            xhttp = new XMLHttpRequest();
            console.log(link);
            xhttp.open("GET", link, false);
            xhttp.send();
            var code = xhttp.responseText;
            
            var style = document.createElement('style');
            style.innerHTML = code;
            // link.setAttribute('href', css);
            // link.setAttribute('type','text/css');
            // link.setAttribute('rel','stylesheet');
            document.getElementsByTagName('head')[0].appendChild(style);
        }
}
class Page{
    constructor(){
        this.definePage();
        this.bundlesCSS(this.page);
        this.bundleJS(this.page);
        this.buildMenu();
    }
    definePage(){
        this.page = window.location.pathname.replace('/','')
                                            .replace('.html','')
        if(this.page == '') {
            this.page = 'index';
        }
    }
    buildMenu() {
        $.get("html/partials/menu.html").done(function(data){
            $('body').prepend(data)
        })
        //into links 
        //url select menu active
    }
    bundleDependence(page){
        this.bundlesCSS(page);
        this.bundleJS(page);
    }
    //load a default scripts into page
    //load a default css into page
    bundleJS(page){
        var extras = [];
        var defaults = [
            'spec/lib/jquery-3.3.1.min.js',
            'cordova.js',
            'spec/lib/bootstrap/js/bootstrap.min.js'
        ];
        extras["produtos"] = ['spec/lib/data-table.js'];
        extras["produto"] = [
                            'spec/lib/form/form.js',
                            'spec/lib/form/mask.js',
                            'spec/database/model/produto.js',
                            'spec/produto.js'
                            ];
        extras["cliente"] = [
                            'spec/lib/form/form.js',
                            'spec/lib/form/mask.js',
                            'spec/lib/form/multi-field.js',
                            'spec/lib/form/icon.js',
                            'spec/database/model/clients.js',
                            'spec/cliente.js'
                            ];
        extras['index'] = ['js/index.js'] 
        extras['reserva'] = [
                                'spec/lib/form/form.js',
                                'spec/lib/date-picker/js/bootstrap-datepicker.js',
                                'spec/database/model/status.js',
                                'spec/lib/form/autocomplete.js',
                                'spec/lib/form/mask.js',
                                'spec/lib/form/icon.js',
                                'spec/lib/form/multi-field.js',
                                'spec/lib/form/select.js',
                                'spec/reserva.js'
                            ];
        if(extras[page] !== undefined) {
            defaults = defaults.concat(extras[page]);
        }
        Script.include(defaults);
    }
    bundlesCSS(page){
        var extras = [];
        extras['cliente'] = ['css/form.css'];
        extras['reserva'] = ['css/form.css',
                            'spec/lib/date-picker/css/bootstrap-datepicker3.css',
                            'spec/lib/date-picker/css/bootstrap-datepicker3.standalone.css'];
        var defaults = ['spec/lib/bootstrap/css/bootstrap-reboot.min.css',
                        'spec/lib/bootstrap/css/bootstrap.min.css',
                        'spec/lib/bootstrap/css/bootstrap-grid.min.css',
                        'spec/lib/font-awesome/css/all.css'];
        if(extras[page] !== undefined) {
            defaults = defaults.concat(extras[page]);
        }
        for(var idc = 0 ; idc < defaults.length; idc ++) {
        CSS.include(defaults[idc]);
        }
    }
    parameter(parameterName) {
        var result = null,
            tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }
}
var page = new Page();
var models = {
    status : Status,
    produto : Produto,
    reserva : Reserva,
    cliente: Clients
}
var g;
$(document).ready(function(){
    $(document).keypress(
        function(event){
          if (event.which == '13') {
            event.preventDefault();
          }
    });
})
function direct(page) {
    window.location.href = page;
}