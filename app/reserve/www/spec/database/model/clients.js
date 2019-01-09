/*
    schema
    name:string
    phoneNumber:[]
*/
class Clients extends genericModel{
    constructor(){
        super();
        this.collection = 'clients';
    }
}