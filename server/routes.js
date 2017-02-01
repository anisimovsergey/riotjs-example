var express = require('express');
var router = express.Router();

var todos = [
    { title: 'Avoid excessive caffeine', done: true },
    { title: 'Hidden item',  hidden: true },
    { title: 'Be less provocative'  },
    { title: 'Be nice to people' }
  ];

router.route('/todos')
    .get(function(req, res) {
        res.json(todos);
    })
    .post(function(req, res) {
        todos.push(req.body);
        router.wsServer.broadcast(JSON.stringify(req.body));
        res.send('POST request to the homepage');
    });

module.exports = router;
