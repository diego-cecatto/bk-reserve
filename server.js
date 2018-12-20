var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Status = require('./api/models/statusModel'),
    Contact = require('./api/models/contactModel'),
    People = require('./api/models/clientModel'),
    Product = require('./api/models/productModel'),
    ProductReserve = require('./api/models/productReserveModel'),
    Reserve = require('./api/models/reserveModel'),
    bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bk-reservedb');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/reserveRoutes');
routes(app);
var routes = require('./api/routes/contactRoutes');
routes(app);
var routes = require('./api/routes/productRoutes');
routes(app);
var routes = require('./api/routes/clientRoutes');
routes(app);
app.listen(port);
console.log('RESTful API server started on: ' + port);