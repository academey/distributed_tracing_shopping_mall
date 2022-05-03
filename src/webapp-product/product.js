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

var port = (process.env.PORT || '8007');


// 물건의 세부 정보들을 반환해주기 위한 app
//id: 상품 고유 id, title: 상품 이름, price: 상품 가격(기준은 USD), info:상품 정보
//brand: 상품을 파는 회사, discount:상품할인에 의한 차감 비율(ex> 20%할인은 0.2로 표현)
//추가 구현 가능성: 상품의 종류(가전제품, 식재료 등등...)

 
app.get('/product', function (req, res) {//기본 path는 모든 product 정보 반환
    const product = [{
        id: 1,
        title: '몽키 바나나',
        price: 3,  //가격은 항상 USD기준,
        info: '바나나중에서도 최상급의 맛을 자랑하는 몽키 바나나! 빠른시간에 수입해와서 더 맛있어요',
        brand: '(주)창설후르츠',
        discount: 0.2 //20%할인
    },
        {
            id: 2,
            title: '게이밍 노트북',
            price: 1700,  //가격은 항상 USD기준,
            info: '가성비 좋은 게이밍 노트북, i7, rtx 3060 탑재',
            brand: '(주)창설전자',
            discount: 0 //할인 없음
        }
    ];
    res.json(product);
});

app.get('/product/:product_id', function (req, res) {

    var id = req.params.product_id;
    const product = {
        id,
        title: `${id}번째 물품`,
        price: `${id*10}`,  
        info: `${id}번째 물품에 대한 설명입니다.`,
        brand: `주식회사${id}`,
        discount: 0 //기본은 0
    };
    res.json(product);
});


app.listen(port, function () {
    console.log(`Example app listening on port 8007!`);
});