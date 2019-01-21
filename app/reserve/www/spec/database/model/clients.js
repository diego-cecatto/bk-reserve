/*
    schema
    name:string
    phoneNumber:[]
*/
Script.include(['spec/database/stitch.js',
                'spec/database/conector.js',
                'spec/database/model/generic.js'])
class Clients extends genericModel{
    constructor(){
        super();
        this.collection = 'clients';
    }
}