/*
    schema
    {
        stock,
        name,
        price,
    }
*/
Script.include(['spec/database/stitch.js',
                'spec/database/conector.js',
                'spec/database/model/generic.js'])
class Produto extends genericModel{
    constructor() {
        super();
        this.collection = 'products';
    }
}