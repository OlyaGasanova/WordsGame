process.env.NODE_ENV = 'test';

//let mongoose = require("mongoose");
//let word = require('../server/models/book');

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('Words', function () {

    /*
     * Тест для /GET
     */
    describe('/GET words', () => {
        it('it should GET all the words', (done) => {
            chai.request("localhost:8081")
                .get('/api/words')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.not.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST word', () => {
        it('it should not post a word "укмапкеи"', (done) => {
            chai.request("localhost:8081")
                .post('/api/words?name=оля&word=укмапкеи')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/POST word', () => {
        it('it should return 25"', (done) => {
            chai.request("localhost:8081")
                .post('/api/words/sum')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({first: 13, second :12})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.eql(25);
                    done();
                });
        });
    });

});