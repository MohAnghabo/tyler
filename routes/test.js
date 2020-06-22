let express = require('express');
let router = express.Router();

const userSchema = require('../db/users');

/* GET home page. */
router.get('/', function (req, res, next) {
    // Get the documents collection
    userSchema.findOne({"status": "available"}, (err, user) => {
        if (err) return res.send(err);
        if (!user) return res.render('msg', {msg: "Sorry, All available seats are taken"});
        res.redirect(`/test/${user.username}/${user.password}`);
    });
});

router.get('/:username/:password', (req, res) => {
    userSchema.findOne({"username": req.params.username}, (err, doc) => {
        if (err) return res.send(err);
        if (doc.status === "visited") return res.render('msg', {msg: "Sorry, but you can perform the test only once."});
        if (!doc) return res.send("No user, please try again");
        doc.status = 'visited';
        doc.save((err, doc) => {
            if (err) return res.send(err);
            res.render('msg', {msg: "Thank you for performing the test, we will get back to you soon"});
        });
    });
});

router.get('/generate', (req, res) => {
    let users = [];
    for (let i = 0; i <= 9; i++) {
        users.push({
            username: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        });
    }

    userSchema.insertMany(users, (err, doc) => {
        if (err) return res.send(err);
        return res.send(doc);
    });
});

module.exports = router;