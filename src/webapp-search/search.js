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

var port = (process.env.PORT || '8001');
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

// app.get('/search', function (request, response) {  //메인 페이지
//     fs.readdir('./data', function (error, filelist) {
//         var title = '물품 검색';
//         var description = '구매할 물품을 검색하시오';
//         var list = template.p_list(filelist);
//         var html = template.HTML(title, list,
//             `<h2>${title}</h2>${description}<p>${list}</p>`,
//             ``
//         );
//         response.send(html);
//     });
// });

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

app.get('/search', function (req, res) {
    const search_items = [{
        id: 1,
        title: 'search item test1'
    },
        {
            id: 2,
            title: 'search item test2'
        }
    ];
    res.json(search_items);
});

app.get('/search/:search_id', function (req, res) {
    const search = {
        id: req.params.search_id,
        title: 'search item test'
    };
    res.json(search);
});


app.listen(port, function () {
    console.log(`Example app listening on port 8001!`);
});