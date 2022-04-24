import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import template from './lib/template.js.js.js';
import {PurchaseAPI} from "./purchaseApi.js.js";
import cors from "cors";

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8001');


// Frontend -> Search -> Purchase
// Search -> "떡볶이"라고 입력을 받으면
// Product -> "떡볶이"라는 아이템 있는지 찾아봄. 그리고 상세정보를 주고
// Purchase -> 떡볶이 아이템이 수량이 몇개인지 혹은 가격이 얼마인지.


// Frontend -> "떡볶이" 입력했을 때 search 에다가만 요청함.
// Search -> Product / Purchase 를 따로 요청함.
// Search -> 둘의 결괏값을 받아서 이쁘게 포장해서 내려줌.

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