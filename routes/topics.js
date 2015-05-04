var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics

var Topic = sequelize.define('Topic', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  description: Sequelize.TEXT
});

// GET /topics
router.get('/', function (req, res, next) {
    // Hae kaikki aihealueet tässä (Vinkki: findAll)
    // res.send(200);

    Topic.findAll().then(function (topics) {
        console.log(topics);
        res.send(topics);
    });

});

// GET /topics/:id
router.get('/:id', function (req, res, next) {
    // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
    res.send(200);
    var topicId = req.params.id;
  //  Topic.findOne(topicId).then(function (topic) {
 //       res.send(topic);
 //   });
});

// POST /topics
router.post('/', function (req, res, next) {
    // Lisää tämä aihealue
    var topicToAdd = req.body;
    // Palauta vastauksena lisätty aihealue
    res.send(200);
});

// POST /topics/:id/message
router.post('/:id/message', function (req, res, next) {
    // Lisää tällä id:llä varustettuun aihealueeseen...
    var topicId = req.params.id;
    // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
    var messageToAdd = req.body;
    // Palauta vastauksena lisätty viesti
    res.send(200);
});

module.exports = router;
