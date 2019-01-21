Script.include('spec/lib/jquery.mask.min.js');
class Mask {
    constructor(input, mask) {
        if(input == undefined) {
            console.log('Input não encontrado para aplicar a máscara');
            return;
        }
        if ( mask == 'celphone') {
            var SPMaskBehavior = function (val) {
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
              },
              spOptions = {
                onKeyPress: function(val, e, field, options) {
                    field.mask(SPMaskBehavior.apply({}, arguments), options);
                  }
              };
            input.mask(SPMaskBehavior, spOptions)
            return;
        }
        if(mask == 'money') {
            input.mask('#.##0,00', {reverse: true});
            return;
        }
        if(mask == 'hour') {
            input.mask('00:00', {reverse: true});
            return;
        }
        console.log('máscara não encontrada');
    }
}