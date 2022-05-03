import express from 'express';
import fs from 'fs';
import template from './lib/template.js';
import {PurchaseAPI} from "./purchaseApi.js";
import {ProductAPI} from "./productApi.js";
import cors from "cors";


var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8001');


// 물품 검색과 관련된 api, db가 있어야 의미가 있을거 같기는 하다.

app.get('/search', async (req, res) => { 
    const result = await ProductAPI.loadListData();
    //console.log(`타입확인: ${typeof result}`);
    var productList = new Array();  //후에 json형태로 변환할 array생성(product에서 받아온 json 값들(array의 형태일것)을 다룸
    console.log(result[0]);
    for(var i of result){
        productList.push({ //어레이에 객체 추가
            id: i.id,
            title: i.title,
            price: i.price,
            info: `${i.brand}에서 생산한 ${i.title}로 할인률은 ${(1-i.discount)*100}입니다. ${i.info}`,
            explain: `product app으로부터 가져온 정보`
        })
    }
    res.json(productList);
    //return res.status(500).json({ text: '에러를 발생시키는 팟입니다' });
});
 
app.get('/search_test', function(req,res){  //테스트용.
    console.log(process.env.PORT);
    console.log('sdfasf');
    res.json({say:"hello"});
});


/*app.get('/search/:search_id', async (req,res) => {
    var id = req.params.search_id;
    console.log(id);
    const result = await ProductAPI.loadData(id);  //search_id를 통해 들어온 id에 해당하는 product data를 받아옴.
    console.log(result);
    const search = {
        id: result.id,
        title: `${result.title}`,
        price: result.price,
        info: `${result.brand}에서 생산한 ${result.title}이며, 할인률은 ${(1-result.discount)*100}입니다. ${result.info}`,
        explain: `product id: ${result.id}에 해당하는 상품정보, product app에서 가져옴`
    };
    res.json(search);
});*/

app.get('/search/:search_id', async (req,res) => {
    var id = req.params.search_id;
    console.log(id);
    const result = await ProductAPI.loadData(id);  //search_id를 통해 들어온 id에 해당하는 product data를 받아옴.
    console.log(result);
    const search = {
        id: result.id,
        title: `${result.title}`,
        price: result.price,
        info: `${result.brand}에서 생산한 ${result.title}이며, 할인률은 ${(1-result.discount)*100}입니다. ${result.info}`,
        explain: `product id: ${result.id}에 해당하는 상품정보, product app에서 가져옴`
    };
    res.json(search);
});

app.listen(port, function () {
    console.log(`Example app listening on port 8001!`);
});