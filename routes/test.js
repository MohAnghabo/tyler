let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, _next) {
    // Get the documents collection
    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://heroku_4nlf1k9s:thg164rul3pplcla7of7utdbjk@ds035428.mlab.com:35428/heroku_4nlf1k9s";

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbo = db.db("heroku_4nlf1k9s");
        dbo.collection("users").findOne(
            {"status": "available"},
            (err, result) => {
                if (err) throw err;
                if (result) {
                    res.redirect(`/test/${result.username}/${result.password}`);
                } else {
                    res.send('Sorry, all places are taken');
                }
                db.close();
            });
    });
});

router.get('/:username?/:password?', (req, res) => {
    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://MohAnghabo:MohAnghabo1234@ds035428.mlab.com:35428/heroku_4nlf1k9s";

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err, db) {
        if (err) throw err;
        let dbo = db.db("heroku_4nlf1k9s");
        let my_query = {username: req.params.username};
        let new_values = {$set: {status: "visited"}};
        dbo.collection("users").updateOne(my_query, new_values, function (err, result) {
            let res_message;
            if (err) {
                res_message = {
                    status: "error",
                    msg: err
                }
            } else {
                res_message = {
                    msg: "1 document updated",
                    result: result
                };
            }
            res.send(res_message)
            db.close();
        });
    });
});

router.post("/generate", (req, res) => {

});

module.exports = router;