import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import template from './lib/template.js';
import {PurchaseAPI} from "./purchaseApi.js";
import {ProductAPI} from "./productApi.js"
import cors from "cors";

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8008');


// 장바구니와 관련된 app으로 product를 호출하여 사용한다, checkout, frontend에서 호출하며, 


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
 
app.get('/cart', function (req, res) {
    try {
        let cartList = await ProductAPI.loadListData();

        res.json(payList.map(pay => {
            return `Pay 의 Title 은 ${pay.title} 입니다 `
        }));
    } catch (e) {
        res.json({"error": e.toString()});
    }

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

app.get('/cart/:cart_id', function (req, res) {
    const search = {
        id: req.params.search_id,
        title: 'search item test'
    };
    res.json(search);
});


app.listen(port, function () {
    console.log(`Example app listening on port 8008!`);
});