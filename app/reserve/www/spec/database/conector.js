// https://docs.mongodb.com/stitch/getting-started/integrate-authentication-providers/
// https://docs.mongodb.com/stitch/getting-started/integrate-authentication-providers/
const {
    Stitch,
    RemoteMongoClient,
    UserPasswordCredential,
    UserApiKeyCredential
} = stitch;
var db = null;
class DBConect{
constructor() {
    this.ready = false;
    this.queue = [];
    this.db = null;
    this.config = {
        APIKEY :'',
        email: 'diego.cecatto@hotmail.com',
        password: 'Forever_!1',
        APIKEY :'fMd8fhxcFqIZV6664DpI6gEKoDGphExOWAXXWObrD5DNhbJLgwQq08cOg0lXGTY6'
    }
    const dbConector = this;
    this.client = Stitch.initializeDefaultAppClient('reserve-rsfqy');
    this.login().then(() => {
        // Initialize a MongoDB Service Client
        dbConector.db = this.client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
                                    .db("reserve");
        dbConector.ready = true;
        console.log('ready');
        this.processQueue();
    });
}
login() {
    const credential = new UserApiKeyCredential(this.config.APIKEY)
    //const credential = UserPasswordCredential(this.config.email, this.config.password);
    return this.client.auth.loginWithCredential(credential);
    return this.client.auth.loginWithCredential(new stitch.AnonymousCredential())
}
addQueue(action, collection, params, callback) {
    this.queue.push( { 'collection': collection, 'action': action, 'params': params, 'callback': callback} );
}
processQueue() {
    for(var idcQueue = 0 ; idcQueue < this.queue.length ; idcQueue++) {
        var pendence = this.queue[idcQueue];
        this.execQueue(pendence.action, pendence.collection, pendence.params, pendence.callback);
    }
}
//execute method can be appropriated
exec(action, collection, params, callback) {
    if(this.ready) {
        this.execQueue(action, collection, params, callback);
        return;
    }
    this.addQueue(action, collection, params, callback);
}
execQueue(action, collection, params, callback) {
    var collection = this.db.collection(collection);
    // eval('collection.'+action+'() \
    //                 .toArray() \
    //                 .then((ret) => { \
    //      console.log(ret); \
    //  })'); 
    var prommisse = collection[action].call(collection, params);
    if(callback == undefined || callback == null) {
        return;
    }
    if(action === 'find') {
        prommisse = prommisse.toArray();
    }
    prommisse.then((ret) => { 
        callback(ret);
    }); 
}
// insertOne(data, model) {
//     if(this.ready) {
//         this.db.collection(model.collection).insertOne(data);
//         return;
//     }
//     this.addQueue(model.collection, insertOne, data);
// }
}