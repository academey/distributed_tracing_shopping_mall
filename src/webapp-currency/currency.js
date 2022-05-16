import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8005');


// 각 나라의 화폐로 표현하기 위한 환율, 화폐정보 등을 반환하기 위한 app
//id: 화폐의 고유 id (USD는 1, KRW는 2 등등...)
//title: 화폐 이름 (ex> USD), unit: 화폐 단위(ex> US$), nation: 화폐발행한 국가(정부)
//rate: 환율(변환할 화폐/USD)  ex> KRW에 대한 rate는 KRW/USD = 1200
// 모든 가격은 기본적으로 USD를 기준으로하고, 원하는 화폐의 rate만 곱해줘서 변환해 사용 가능


 
app.get('/currency', function (req, res) { //모든 화폐 데이터 반환
    const currency = [{
        id: 1,
        title: 'USD',
        unit: 'US$',
        nation: 'USA',
        rate: 1
    },
        {
            id: 2,
            title: 'KRW',
            unit: 'WON',
            nation: 'Korea',
            rate: 1200
        }
    ];
    res.json(currency);
});

app.get('/currency/:currency_id', function (req, res) {
    let id = req.params.search_id;
    const currency = {
        id,
        title: `${id}번째 화폐`,
        unit: `unit of ${id}th`,
        nation: `${id}의 나라`,
        rate: `${id%100/100}`
    };
    res.json(currency);
});


app.listen(port, function () {
    console.log(`Example app listening on port 8005!`);
});