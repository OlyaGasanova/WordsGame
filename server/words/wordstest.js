/**
 * Created by user on 11.12.2017.
 */

let express = require('express');
let mongo = require('../mongo');
let config = require('../config');

function  connect(fn) {
    mongo.connect(config.mongo).then(fn(done()));
}

function test(option, req) {


    if (option == 0) {
        var result = parseInt(req.body.first) + parseInt(req.body.second);
        return result;
    }
    if (option ==1){
        let collection = mongo.db.collection('wordChain');
        let dictionary = mongo.db.collection('wordDict');

        dictionary.findOne({"word": req.body.word}, (err, result) => {
            if (!result) {
                return "Word not found in dictionary";
            }
            collection.findOne({"word": req.body.word}, (err, result) => {
                if (result) {
                    return "Word already in chain";
                }
                collection.insertOne(req.body).then((result) => {

                })
            })
        });
    }

    if (option==2){
        let collection = mongo.db.collection('wordChain');
        collection.find({}, {_id: false}).toArray(function(err, docs) {
            return docs;
        });
    }
}
 module.exports = {test, connect};