import dotenv from 'dotenv';
import express from 'express';
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

const products = [{
    id: 1,
    title: 'iMac',
    price: 24000,  //가격은 항상 USD기준,
    
    info: '개발하기 최고의 환경 아이맥',
    brand: '(주)창설애플',
    image: 'https://img.etnews.com/news/article/2021/10/21/cms_temp_article_21112048635881.png',
    discount: 0.2 //20%할인
},
    {
        id: 2,
        title: '게이밍 노트북',
        price: 1700,  //가격은 항상 USD기준,
        info: '가성비 좋은 게이밍 노트북, i7, rtx 3060 탑재',
        brand: '(주)창설전자',
        image: 'https://dimg.donga.com/wps/NEWS/IMAGE/2019/06/21/96106137.1.jpg',
        discount: 0 //할인 없음
    }
];
app.get('/product', function (req, res) {//기본 path는 모든 product 정보 반환
    
    res.json(products);
});

app.get('/product/:product_id', function (req, res) {
    var id = parseInt(req.params.product_id, 10);
    
    if (isNaN(id) || id <= 0) {
        res.status(400).send('Bad Request!')
    } else if (products.length < id) {
        res.status(404).send('Not Found!')
    } else {
        res.json(products[id - 1]);
    }  
});


app.listen(port, function () {
    console.log(`Example app listening on port 8007!`);
});