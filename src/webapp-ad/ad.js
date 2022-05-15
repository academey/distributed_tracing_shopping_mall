import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8003');


// 기본 ad path에서는 모든 광고 데이터를 반환
//id: 광고의 고유번호, title: 광고 제목, text:광고 내용, client: 광고주
//추가할 수 있는 사항: 광고 종류(광고하는 상품의 종류), 광고 방식

 
app.get('/ad', function (req, res) {
    const ad_info = [{
        id: 1,
        title: `운동화광고`,
        text: `아디다스 신상품 무려 40% 할인`,
        clinet: `아디다스`
    },
        {
            id: 2,
            title: `넥슨게임광고`,
            text: `신규 게임 사전등록 이벤트`,
            clinet: `넥슨`
        }
    ];
    res.json(ad_info);
});

app.get('/ad/:ad_id', function (req, res) {
    let id = req.params.ad_id;
    const ad_info = {
        id,
        title: `${id}번째 광고`,
        text: `${id}번째 광고 내용입니다.`,
        clinet: `${id}번째 광고주`
    };
    res.json(ad_info);
});


app.listen(port, function () {
    console.log(`Example app listening on port 8003!`);
});