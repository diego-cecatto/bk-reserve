var Script = {
    _loadedScripts: [],
    include: function(script) {
        if (this._loadedScripts.indexOf(script) != -1) {
            console.log('already exist');
            return false;
        }
        xhttp = new XMLHttpRequest();
        xhttp.open("GET",script,false);
        xhttp.send();
        var code = xhttp.responseText;
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.innerHTML = code;
        document.body.appendChild(script);
        this._loadedScripts.push(script);
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
        extras["form"] = [
            'spec/database/stitch.js',
            'spec/database/conector.js',
            'spec/database/model/generic.js',
            'spec/lib/jquery.mask.min.js',
            'spec/lib/form-helper.js',
        ];
        extras["produtos"] = ['spec/lib/data-table.js'];
        extras["produto"] = extras["form"].concat([
                            'spec/database/model/produto.js',
                            'spec/produto.js'
                            ]);
        extras["cliente"] = extras["form"].concat([
                            'spec/database/model/clients.js',
                            'spec/cliente.js'
                            ]);
        extras['index'] = ['js/index.js'] 
        extras['reserva'] = extras["form"].concat(['spec/reserva.js'])
        var defaults = [
                        'spec/lib/jquery-3.3.1.min.js',
                         'cordova.js',
                         'spec/lib/bootstrap/js/bootstrap.min.js'
                    ];
        if(extras[page] !== undefined) {
            defaults = defaults.concat(extras[page]);
        }
        for(var idc = 0 ; idc < defaults.length; idc ++) {
            Script.include(defaults[idc]);
        }
    }
    bundlesCSS(page){
        var extras = [];
        extras['cliente'] = ['css/form.css'];
        extras['reserva'] = ['css/form.css'];
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
}
var page = new Page();
function direct(page) {
    window.location.href = page;
}