process.env.NODE_ENV = 'test';

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
let server = require('../server/words/wordstest')
chai.use(chaiHttp);


describe('Words 2', function() {

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
            var req={body:{word:"укмапкеи", username:"оля"}};
            expect(server.test(1,req)).to.include("Word not found in dictionary");

        });
    });


    describe('POST word',  function() {
        it('it should not post a word "ржавчина"', function (){
            var req={body:{word:"dragon", username:"оля"}};
           expect(server.test(1,req)).to.include('Word already in chain');
        });
    });

});


