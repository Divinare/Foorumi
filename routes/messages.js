var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /messages

// GET /messages/:id
router.get('/:id', function(req, res, next) {
  // Hae viesti tällä id:llä ja siihen liittyvät vastaukset tässä (Vinkki: findOne ja sopiva include)
  var messageId = req.params.id;
  Models.Messages.findOne({
      where: {id: messageId},
      include: {
        model: reply
      }
  }).then(function(message) {
      console.log(message);
      res.send(message);
  })
});

// POST /messages/:id/reply
router.post('/:id/reply', function(req, res, next){
  // Lisää tällä id:llä varustettuun viestiin...
  var messageId = req.params.id;
  // ...tämä vastaus (Vinkki: lisää ensin replyToAdd-objektiin kenttä MessageId, jonka arvo on messageId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
  var replyToAdd = req.body;
  replyToAdd.MessageId = messageId;
  Models.Message.Create(replyToAdd).then(function(reply) {
      console.log("reply added:");
      console.log(reply);
      res.send(JSON.parse(reply));
  })

  // Palauta vastauksena lisätty vastaus
});

module.exports = router;
