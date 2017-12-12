"use strict";

let express = require('express');
let router = express.Router();
let mongo = require('../mongo');
let fs = require('fs');
var words = [];


router.post("/sum", (req, res) => {
    var result = parseInt(req.body.first) + parseInt(req.body.second);
        res.status(200).json(result);
});


router.get("/", (req, res) => {
    var array = fs.readFileSync('inchain.json','utf-8').toString().split('\r\n');
    var docs=[];
    array.forEach(function(item, i, array) {
        item = JSON.parse(item);
        docs.push(item);
    });
    res.status(200).json(docs);
});


router.post("/", (req, res) => {

    console.log("   ;(((");
    var data = fs.readFileSync("inchain.json", 'utf8');  // function (err, data) {
        //if (err)  console.log("   ;(((");
        console.log(data + req.body.word + data.indexOf(req.body.word));
        if(data.indexOf(req.body.word) >= 0){
            console.log("Already in dictionary");
            res.status(404).json("Word already in chain");
        }


    var data =fs.readFileSync("allwords.txt", 'utf8');//, function (err, data) {
        if(data.indexOf(req.body.word) >= 0){
        }
        else res.status(404).json("Word not found in dictionary");


    fs.appendFileSync('inchain.json', "\r\n"+"{\"word\":\""+req.body.word+"\"}");//req.word);
});



function readLines(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last  = 0;
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(line);
            index = remaining.indexOf('\n', last);
        }

        remaining = remaining.substring(last);
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}


function func(data) {
    words.push(data);
}


module.exports = router;

