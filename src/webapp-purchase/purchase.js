require('dotenv').config();

var express = require('express')
var app = express()
var port = (process.env.PORT || '8002');
var fs = require('fs');
var template = require('./lib/template.js');

//app.get('/', (req, res) => res.send('Hello world'))를 아래와 같이 변환

app.get('/', function (request, response) {  //메인 페이지
    fs.readdir('./data', function (error, filelist) {
        var title = '물품 구매';
        var description = '구매할 물품들에 대한 정보';
        var list = template.p_list(filelist);
        var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/pay">결제 진행(클릭)</a>
      <a href= ${process.env.URL_search}>검색으로 돌아가기(클릭)</a>`
        );
        response.send(html);
    });
});





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