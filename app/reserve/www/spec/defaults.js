var Script = {
    _loadedScripts: [],
    include: function(script) {
        // include script only once
        if (this._loadedScripts.indexOf(script) != -1) {
            console.log('already exist');
            return false;
        }
        // request file synchronous
        xhttp = new XMLHttpRequest();
        console.log(script);
        xhttp.open("GET",script,false);
        xhttp.send();
        var code = xhttp.responseText;
        // if (Prototype.Browser.IE) {
        //     window.execScript(code);
        // } else if (Prototype.Browser.WebKit) {
        //     $$("head").first().insert(Object.extend(
        //         new Element("script", {
        //             type: "text/javascript"
        //         }), {
        //             text: code
        //         }
        //     ));
        // } else {
        //     window.eval(code);
        // }
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.innerHTML = code;
        document.getElementsByTagName('html')[0]
                .appendChild(script);
        this._loadedScripts.push(script);
    }
};
class Page{
    constructor(){
        this.definePage();
        this.bundlesCSS();
        this.bundleJS();
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
    //load a default scripts into page
    //load a default css into page
    bundleJS(){
        var extras = [];
        extras["form"] = [
            'spec/database/stitch.js',
            'spec/database/conector.js',
            'spec/database/model/generic.js',
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
        var defaults = [
                        'spec/lib/jquery-3.3.1.min.js',
                         'cordova.js',
                         'spec/lib/bootstrap/js/bootstrap.min.js'
                    ];
        if(extras[this.page] !== undefined) {
            defaults = defaults.concat(extras[this.page]);
        }
        for(var idc = 0 ; idc < defaults.length; idc ++) {
            Script.include(defaults[idc]);
        }
    }
    bundlesCSS(){
        var extras = [];
        var defaults = ['spec/lib/bootstrap/css/bootstrap-reboot.min.css',
                        'spec/lib/bootstrap/css/bootstrap.min.css',
                        'spec/lib/bootstrap/css/bootstrap-grid.min.css',
                        'spec/lib/font-awesome/css/all.min.css'];
        if(extras[this.page] !== undefined) {
            defaults = defaults.concat(extras[this.page]);
        }
        for(var idc = 0 ; idc < defaults.length; idc ++) {
            var link = document.createElement('link');
            link.setAttribute('href', defaults[idc]);
            link.setAttribute('type','text/css');
            link.setAttribute('rel','stylesheet');
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    }
}
new Page();
function direct(page) {
    window.location.href = page;
}