/**
 * Created by user on 11.12.2017.
 */

let express = require('express');
let mongo = require('../mongo');
let config = require('../config');
let fs = require('fs');

var words = [];

function test(option, req) {

    if (option == 0) {
        var result = parseInt(req.body.first) + parseInt(req.body.second);
        return result;
    }
    if (option ==1){

       var data = fs.readFileSync("inchain.json", 'utf8');
            if(data.indexOf(req.body.word) >= 0){
                var message = "Word already in chain";
                return message;
            }


        var data =  fs.readFileSync("allwords.txt", 'utf8');
            if(data.indexOf(req.body.word) >= 0){
            }

            else {
                var message ="Word not found in dictionary";
                return message;}

    }

    if (option==2){
        var array = fs.readFileSync('inchain.json','utf-8').toString().split('\r\n');
        var docs=[];
        array.forEach(function(item, i, array) {
            item = JSON.parse(item);
            docs.push(item);
        });
        return docs;
    }
}

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




 module.exports = {test};