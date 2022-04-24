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


// Frontend -> Search -> Purchase
// Search -> "떡볶이"라고 입력을 받으면
// Product -> "떡볶이"라는 아이템 있는지 찾아봄. 그리고 상세정보를 주고
// Purchase -> 떡볶이 아이템이 수량이 몇개인지 혹은 가격이 얼마인지.


// Frontend -> "떡볶이" 입력했을 때 search 에다가만 요청함.
// Search -> Product / Purchase 를 따로 요청함.
// Search -> 둘의 결괏값을 받아서 이쁘게 포장해서 내려줌.

app.get('/currencies', async (req, res) => {
    const currency_items = [{
        id: 1,
        title: 'USD',
        unit: '$',
    },
        {
            id: 2,
            title: 'JPY',
            unit: '¥',
        }
    ];
    res.json(currency_items);
});
 
app.listen(port, function () {
    console.log(`Example app listening on port 8001!`);
});