/*
    schema: {
        "_id": {
        "bsonType": "objectId"
        },
        "client": {
            "type": "object"
        },
        "status": {
            "type": "object"
        },
        "details": {
            "type": "string"
        },
        "hourDelivery": {
            "type": "string"
        },
        "deliveryDate": {
            "bsonType": "date"
        },
        "deliveredDate": {
            "bsonType": "date"
        },
        "productsReserves": {
            "type": "array"
        },
        "row": {
            "type": "integer"
        }
    }
*/
Script.include([
                'spec/database/stitch.js',
                'spec/database/conector.js',
                'spec/database/model/generic.js'
]);
class Reserva extends genericModel{
    constructor(){
        super();
        this.collection = 'reserves';
    }
}