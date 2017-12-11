process.env.NODE_ENV = 'test';

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../server/words/wordstest')
chai.use(chaiHttp);


describe('Words', function() {

    describe('calculate me!', function() {
        it('it should return 25', function () {
            var req={body:{
                first:12,
                second:13
            }};
            server.test(0,req).should.be.eql(25);

        });
    });


    describe('GET words',  function() {
        it('it should GET all the words',  function () {
            var req={body:{}};
            server.test(2,req).should.be.a('array');
            server.test(2,req).length.should.not.be.eql(0);

        });
    });


    describe('POST word',  function() {
        it('it should not post a word "укмапкеи"', function () {
            var req={body:{name:'оля',word:'укмапкеи'}};
            server.test(1,req).should.be.eql("Word not found in dictionary")
        });
    });


    describe('POST word',  function() {
        it('it should not post a word "ржавчина"', function (){
            var req={body:{name:'оля',word:'ржавчина'}};
            server.test(1,req).should.be.eql("Word already in chain")
        });
    });

});


