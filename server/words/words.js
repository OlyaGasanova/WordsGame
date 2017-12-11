"use strict";

let express = require('express');
let router = express.Router();
let mongo = require('../mongo');


router.post("/sum", (req, res) => {
    var result = parseInt(req.body.first) + parseInt(req.body.second);
        res.status(200).json(result);
});


router.get("/", (req, res) => {
    let collection = mongo.db.collection('wordChain');
    collection.find({}, {_id: false}).toArray(function(err, docs) {
        res.status(200).json(docs);
    });
});


router.post("/", (req, res) => {
    let collection = mongo.db.collection('wordChain');
    let dictionary = mongo.db.collection('wordDict');

    dictionary.findOne({"word": req.body.word}, (err, result) => {
        if (!result) {
            res.status(404).json("Word not found in dictionary");
            return;
        }
        collection.findOne({"word": req.body.word}, (err, result) => {
            if (result) {
                res.status(404).json("Word already in chain");
                return;
            }
            collection.insertOne(req.body).then((result) => {
                //require('../users_room/users_room').addWord(req.body);
                res.status(200).json(result);
            })
        })
    });
});
module.exports = router;

