var express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `*`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var routes1d1 = require('./api/routes/1d-1.routes');
routes1d1(app);
var routes1d2 = require('./api/routes/1d-2.routes');
routes1d2(app);
var routes2d1 = require('./api/routes/2d-1.routes');
routes2d1(app);
var routes2d2 = require('./api/routes/2d-2.routes');
routes2d2(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);