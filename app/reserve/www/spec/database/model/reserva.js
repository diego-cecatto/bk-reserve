/*
    schema:
    {
        client
        deliveryDAte
        deliveredDate
        details
        productResrve:[
            qty
            finalValue
            description
            product
        ]
        row
        status
    }
*/
Script.include(['spec/database/conector.js',
                'spec/database/stitch.js',
                'spec/database/model/generic.js'])
class Status extends genericModel{
    constructor(){
        super();
        this.collection = 'status';
    }
}