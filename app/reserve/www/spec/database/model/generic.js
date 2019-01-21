class genericModel {
    constructor(){
        if(typeof db === 'undefined' || db == null) {
            db = new DBConect();
        }
    }
    insertOne(data, callback) {
        console.log('inserting one');
        this.exec('insertOne', data, callback);
    }
    insertMany(data, callback) {
        console.log('inserting one');
        delete data['_id'];
        this.exec('insertMany', data, callback);
    }
    deleteOne(){
        this.exec('deleteOne', params, callback);
    }
    deleteMany(){
        this.exec('deleteMany', params, callback);
    }
    updateOne(params, callback){
        //use $set to sinalize update columns ??
        this.exec('updateOne', params, callback);
    }
    updateMany(params, callback){
        //use $set to sinalize update columns ??
        this.exec('updateMany', params, callback);
    }
    find(params, callback){
        console.log('finding');
        this.exec('find',params, callback);
    }
    findOne(params, callback){
        console.log('finding one');
        this.exec('findOne', params, callback);
    }
    exec(fn, params, callback){
        db.exec(fn, this.collection, params, callback);
    }
}