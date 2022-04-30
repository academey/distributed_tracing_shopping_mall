import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import template from './lib/template.js';
import {PurchaseAPI} from "./purchaseApi.js";
import {ProductAPI} from "./productApi.js";
import cors from "cors";

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8001');


// 물품 검색과 관련된 api, db가 있어야 의미가 있을거 같기는 하다.

app.get('/search', async (req, res) => {
    return res.status(500).json({ text: '에러를 발생시키는 팟입니다' });
});
 
app.get('/search_test', function(req,res){
    console.log('sdfasf');
    res.json({say:"hello"});
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