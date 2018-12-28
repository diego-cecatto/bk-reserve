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
class Status extends genericModel{
    constructor(){
        super();
        this.collection = 'status';
    }
}