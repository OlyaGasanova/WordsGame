let express = require('express');
let path = require('path');
let mongo = require('./mongo');
let socket = require('./socket');
let config = require('./config');


let bodyParser = require('body-parser');




let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../dist'));

function start() {

    app.listen(8081, 'localhost');
    console.log('Listening on port ' + 8081 + '...');
    let smt  = require('./users_room/users_room');
    smt.init();
}


let apiRouter = express.Router();
app.use('/api', apiRouter);

let wordsRouter = require('./words/words');
apiRouter.use('/words', wordsRouter);

mongo.connect(config.mongo).then(socket.init(app)).then(start).catch((err) => {
    "use strict";
    console.log(err);
});


