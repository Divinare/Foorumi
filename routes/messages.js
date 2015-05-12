var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /messages

// GET /messages/:id
router.get('/:id', function (req, res, next) {
    // Hae viesti tällä id:llä ja siihen liittyvät vastaukset tässä (Vinkki: findOne ja sopiva include)
    var messageId = req.params.id;
    Models.Message.findOne({
        where: { id: messageId },
        include: {
            model: Models.Reply,
            include: {
               model: Model.User
            }
        }
    }).then(function(message) {
        res.send(message);
    });
});

// POST /messages/:id/reply
router.post('/:id/reply', authentication, function (req, res, next){

  var messageId = req.params.id;
  var replyToAdd = req.body;
  replyToAdd.UserId = req.session.userId;
  replyToAdd.MessageId = messageId;
  Models.Reply.create(replyToAdd).then(function(reply) {
      res.send(reply);
  })
});

module.exports = router;
