require('dotenv').config();

var express = require('express')
var app = express()
var port = (process.env.PORT || '8002');
var fs = require('fs');

//purchase에서 반환하는 값들
//id: 카드 고유id, title: 카드의 title, number:카드 번호, date: 카드 만료일
//추가할 수 있는 사항들: 

app.get('/purchase', function (req, res) { //기본 purchase입력시 전체 데이터 반환
    const purchase_info = [{
        id: 1,
        title: `신한카드`,
        number: `${id*142857%10000000}`,
        date:`2028-${id%12}-${id%30}`
    },
        {
            id: 2,
            title: `농협카드`,
            number: `${id*142857%10000000}`,
            date:`2028-${id%12}-${id%30}`
        }
    ];
    res.json(pays);
});

app.get('/purchase/:purchase_id', function (req, res) {
    const purchase_info = {
        id: req.params.purchase_id,
        title: `${id}번째 신용카드`,
        number: `${id*142857%10000000}`,
        date:`2028-${id%12}-${id%30}`
    };
    res.json(pay);
});


app.listen(port, function () {
    console.log(`Example app listening on port 8002!`);
});
