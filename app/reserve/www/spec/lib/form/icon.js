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