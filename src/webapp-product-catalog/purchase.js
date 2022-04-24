require('dotenv').config();

var express = require('express')
var app = express()
var port = (process.env.PORT || '8002');
var fs = require('fs');

app.get('/pays', function (req, res) {
    const pays = [{
        id: 1,
        title: 'pay test1'
    },
        {
            id: 2,
            title: 'pay test2'
        }
    ];
    res.json(pays);
});

app.get('/pays/:pay_id', function (req, res) {
    const pay = {
        id: req.params.pay_id,
        title: 'pay test'
    };
    res.json(pay);
});


app.listen(port, function () {
    console.log(`Example app listening on port 8002!`);
});