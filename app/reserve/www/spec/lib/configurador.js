class Configurador {
    constructor(configuracoes, padroes, requireds) {
        for(var conf in padroes) {
            if(configuracoes[conf] == undefined) {
                if(requireds.indexOf(conf) != -1) {
                    console.log('parâmetro ' + conf + ' não encontrado');
                }
                continue;
            }

            if(Array.isArray(padroes[conf]) && padroes[conf].length > 0 ) {
                padroes[conf].concat(configuracoes[conf]);
                continue;
            }
            
            if(typeof padroes[conf] == 'object' && padroes[conf] != null) {
                padroes[conf] = Object.assign({}, padroes[conf], configuracoes[conf])
                continue;
            }
            padroes[conf] = configuracoes[conf];
        }
    }
}