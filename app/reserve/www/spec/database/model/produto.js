/*
    schema
    {
        stock,
        name,
        value,
        price
    }
*/
class Produto extends genericModel{
    constructor() {
        super();
        this.collection = 'products';
    }
}