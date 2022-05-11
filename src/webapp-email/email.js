import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import template from './lib/template.js';
import {PurchaseAPI} from "./purchaseApi.js";
import cors from "cors";

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8004');


// 메일을 보내는 기능을 호출하기 위한 app.
//만약 회원제(login system)이 있었다면, user id를 받아서 id에 해당하는 이메일 주소를 활용할 수 있을듯
//반환객체 id: 메일의 고유 id, title: 메일 제목, receiver:메일 수신자
//text: 메일 내용, date: 메일 보낸 날짜와 시간.

/*
 
app.get('/email', function (req, res) {
    const email= [{
        id: 1,
        title: 'search item test1'
    },
        {
            id: 2,
            title: 'search item test2'
        }
    ];
    res.json(email);
});

app.get('/email/:user_email@mail', function (req, res) {
    const email = {
        id: req.params.search_id,
        title: 'search item test'
    };
    res.json(email);
});*/

//post 방식 사용 시도
app.post('/email/', function(req, res){
    //email 보내는 기능... 실제 구현은 못했음... 
    var today = new Date();
    console.log('이메일 보내기 성공!');//email 보내는 기능 대체로 콘솔로그...
    const email = {
        id: req.body.id,
        title: req.body.title,
        receiver: req.body.receiver,
        text: req.body.text,
        date: today

    };
})


app.listen(port, function () {
    console.log(`Example app listening on port 8004!`);
});