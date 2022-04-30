import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import template from './lib/template.js.js';
import {PurchaseAPI} from "./purchaseApi.js.js";
import cors from "cors";

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8001');


// Frontend -> Search -> Purchase


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