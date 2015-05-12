var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
router.get('/', function (req, res, next) {
    // Hae kaikki aihealueet tässä (Vinkki: findAll)
    Models.Topic.findAll().then(function (topics) {
       res.send(topics);
    });

});

// GET /topics/:id
router.get('/:id', function (req, res, next) {
    // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
    var topicId = req.params.id;
    Models.Topic.findOne({
        where: { id: topicId },
        include: {
            model: Models.Message,
            include: {
              model: Model.User
            }
        }

    }).then(function (topic) {
        res.send(topic);
    });
});

// POST /topics
router.post('/', authentication, function (req, res, next) {
    // Lisää tämä aihealue

    var topicToAdd = req.body;
    Models.Topic.create({
        name: topicToAdd.name,
        description: topicToAdd.description
    }).then(function(topic) {
      console.log(topic.name + ' on lisätty tietokantaan onnistuneesti!');
      // Palauta vastauksena lisätty aihealue
      res.send(topic);
  });
});

// POST /topics/:id/message
router.post('/:id/message', authentication, function (req, res, next) {
    // Lisää tällä id:llä varustettuun aihealueeseen...
    var topicId = req.params.id;
    var messageToAdd = req.body;
    messageToAdd.TopicId = topicId;
    messageToAdd.UserId = req.session.userId;
    Models.Message.create(messageToAdd).then(function(message) {
        res.send(message);
    })

});

module.exports = router;
