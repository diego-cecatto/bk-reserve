/*
    schema:
    {
        name
    }
*/
Script.include(['spec/database/stitch.js',
                'spec/database/conector.js',
                'spec/database/model/generic.js'])
class Status extends genericModel{
    constructor(){
        super();
        this.collection = 'status';
    }
}