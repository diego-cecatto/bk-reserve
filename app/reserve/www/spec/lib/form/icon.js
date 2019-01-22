class Icon {
    constructor(config){
        this.area = config.area;
        //this.input = input;
        this.add(config.icon);
    }
    findSpace(){
        var icones = this.area.find('.icons-multi');
        //g = this.area;
        if(icones.length > 0 ) {
            return icones;
        }

        icones = $('<div>', { class: 'icons-multi'} )
        this.area.append(
            icones
        );
        return icones;
    }
    add(icone) {
        if(typeof(icone) == 'object') {
            this.findSpace().append(icone);
            return;
        }
        this.findSpace().append(
            $('<i>',{ class:'fas ' + icone })
        );
    }
} 
class WarningField {
    constructor(){
        
    }
    add() {
        this.icon.addClass('fa-alert');
    }
    remove(field) {
        this.icon.removeClass('fa-alert');
    }
    build() {
        this.icon = $('<i>',{ class:'fas' });
        return this.icon;
    }
}
//como misturar os dois??
    //parametrizar a função para isso ?

    function warningIcon(configurations) {
        this.icon = null;
        this.config = {
           validacao : function() {
               if(this.acompleteField.val() == 0 || this.acompleteField.val() == '') {
                   return true;
               }
               if(this.idField.val() == 0 || this.idField.val() == '') {
                   return false;
               }
               return true;
           },
           idField: '',
           acompleteField : '',
           message : '',
           timerToClose: 0,
           messageArea: null,
           level: 2
       }
       this.builder(configurations);
    }
    warningIcon.prototype.builder = function(configurations) {
        for (var conf in this.config) {
            if(configurations[conf] == undefined) {
                continue;
            }
            this.config[conf] = configurations[conf];
        }
        //var classe = this;
        // this.config.refAcomplete = function() {
        //      return $($('[name="' + classe.config.fieldAcomplete + '"]')[0]);
        // }
        // this.config.refFieldId = function(){
        //     return $($('[name="'+ classe.config.idField +'"]')[0]);
        // }
    }
    // warningIcon.prototype.criar = function () {
    
    //     // this.icon =  $('<i>');
    //     // this.linkTag =  $('<a>', { class: 'formIcon', title: this.config.message}).append(
    //     //     this.icon     
    //     // );
    //     // return this.linkTag;
    // }
    // warningIcon.prototype.defineAreas = function () {
    //     //define area messages
    //     //define area icon
    // }
    warningIcon.prototype.validar = function (param) {
        var res = this.config.validacao(param);
        if(res === true) {
            this.remover();
            return true;
        }
        if (typeof(res) == 'string') {
            this.config.messageArea = $('<span>', { text: res });
            //this.getMessageArea().html($('<span>', { text: res }));
            this.linkTag.attr('title', res);
        }
        this.adicionar();
        return false;
    }
    warningIcon.prototype.adicionar = function() {
        // if(this.icon != null) {
        //     this.icon.attr('class', 'icon-warning-sign');
        // }
        // console.log('--------------------',this.getMessageArea());
        this.getMessageArea().html(this.config.messageArea).show();
        if (this.config.timerToClose != 0) {
            var classe = this;
             window.setTimeout(function(){
                 classe.remover();
             }, this.config.timerToClose);
        }
    }
    warningIcon.prototype.remover = function () {
        // if(this.icon != null) {
        //     this.icon.attr('class', '');
        // }
        // console.log(this, this.getMessageArea());
        this.getMessageArea().hide();
        // console.log(this);
    }
    warningIcon.prototype.getMessageArea = function () {
        if(this.messageArea != undefined) {
            return this.messageArea;
        }
        var area =  this.config.acompleteField.parent().find('.message-area');
        if(area.length == 0) {
            area = $('<span>', { class : 'wh100 float_right message-area' });
            area.insertAfter(this.config.acompleteField);
        }
        //verifica se existe uma mensagem cadastrada para mostrar ao usuário
        this.messageArea = $('<div>',{ style:'display: none' })
        if(this.config.messageArea !== undefined) {
            this.messageArea.html(this.config.messageArea);
        }
        area.append(this.messageArea);
        return this.messageArea;
    }