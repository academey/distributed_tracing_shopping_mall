import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import template from './lib/template.js';
import {PurchaseAPI} from "./purchaseApi.js";

dotenv.config();

var app = express()
var port = (process.env.PORT || '3000');
//app.set('port', port);

//app.get('/', (req, res) => res.send('Hello world'))를 아래와 같이 변환

app.get('/', function (request, response) {  //메인 페이지
    fs.readdir('./data', function (error, filelist) {
        var title = '물품 검색';
        var description = '구매할 물품을 검색하시오';
        var list = template.p_list(filelist);
        var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/search">물품 검색(클릭)</a>`
        );
        response.send(html);
    });
});

app.get('/search', function (request, response) {  //메인 페이지
    fs.readdir('./data', function (error, filelist) {
        var title = '물품 검색';
        var description = '구매할 물품을 검색하시오';
        var list = template.p_list(filelist);
        var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}<p>${list}</p>`,
            ``
        );
        response.send(html);
    });
});

app.get('/product_Info/:P_name', function (req, res) {
    var title = '물품 정보';
    var description = `구매 버튼을 누르면, 구매할 물품${req.params.P_name}에 대한 정보를 넘기며 구매 요청을 보내게 됨`;
    var list = '';
    var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}`,
        `
      <a href= ${process.env.URL_purchase}>결제로 이동(클릭)</a>
      <a href="/">메인으로(클릭)</a>`   //이 파트에서 원래 구매를 누르면 구매하는 웹 앱으로 정보를 전달해야함(pod간 데이터 전송)
    );

    res.send(html);
});

app.get('/purchase', function (req, res) {
    var title = '물품 구매하는 사이트로 이동해야함';
    var description = `현제 페이지를 다른 pod(구매용)과 연결해야함`;
    //var list = template.list(filelist);
    var list = '';
    var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}`,
        `
    <a href="/">메인으로(클릭)</a>`
    );

    res.send(html);
});

app.get('/purchase_list', async (req, res) => {
    try {
        let payList = await PurchaseAPI.loadListData();
        res.json(payList.map(pay => {
            return `Pay 의 Title 은 ${pay.title} 입니다 `
        }));
    } catch (e) {
        res.json({"error": e.toString()});
    }
});

app.listen(port, function () {
    console.log(`Example app listening on port 3000!`);
});