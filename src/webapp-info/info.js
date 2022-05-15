import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import template from './lib/template.js';
import {PurchaseAPI} from "./purchaseApi.js";
import {ProductAPI} from "./ProductApi.js"
import {ShippingAPI} from "./ShippingApi.js"
import cors from "cors";
import path from 'path';

const __dirname = path.resolve();
const datafile = __dirname+ `/webapp-info/data/info.json`;

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8010');


// 쇼핑몰 앱 전체의 데이터(매출 등)을 관리하는 앱.



app.get('/info', function (req, res) { //현재 데이터 반환
    console.log(__dirname);
    let info = (fs.readFileSync(datafile, 'utf-8'));
    if(info != "" && info != undefined){ //빈파일("")이 아닐때만, 빈파일이면 JSON으로 변환이 안됨.
        info = JSON.parse(info);
        console.log("저장된 info:(아래)");
        console.log(info);
        res.json(info);
    }
    else{   //빈 배열일때
        console.log("info가 비어있음");
        res.json({
            checkout_num: 0,
            p_number:  0,
            first_time: "not-yet, there was no checkout",   //가장 처음 결제한 시간은 now이다.(처음 기록이므로)
            last_time: "not-yet, there was no checkout",
            sum_price: 0,
            avg_sales: "not-yet, there was no checkout"    //아직 측정 불가능);
         });
    }
});

/* 테스트용
app.get('/cart_test', function(req, res){
    const cart = {
        id : 3,
        title: "dafd"
    };
    res.json(cart);
})*/


app.get('/info_update', async (req, res) => {  //info 추가
    const shipping_info = await ShippingAPI.loadshippingInfo();


    let info = Array();
    let pre_list = fs.readFileSync(datafile, 'utf-8');
    let info_update;
    if(pre_list !="" && pre_list != undefined){ //빈파일이 아닐때만(첫 입력이 아닌 경우)
        info =(JSON.parse(fs.readFileSync(datafile, 'utf-8'))); //파일에 저장되있던 기존 리스트(string형태의 json값들)를 자바스크립트 json객체로 변환
        var now = new Date().getTime(); //현재 시각
        info_update = {
        checkout_num: Number(info.checkout_num + 1),    //결제 횟수 1증가.
        p_number: Number(info.p_number) + Number(shipping_info.number), //지금까지 결제한 물품 수.
        first_time: info.first_time,   //가장 처음 결제한 시간
        last_time: now,
        sum_price: Number(info.sum_price) + Number(shipping_info.sum_price),
        avg_sales: (Number(info.sum_price) + Number(shipping_info.sum_price))/(now - info.first_time)*1000 //밀리세컨드에서 세컨드로 바꿔주기. ($/sec)
        }
    }
    else{   //첫 데이터 저장.

        var now = new Date().getTime(); //현재 시각
        info_update = {
        checkout_num: 1,
        p_number:  Number(shipping_info.number),
        first_time: now,   //가장 처음 결제한 시간은 now이다.(처음 기록이므로)
        last_time: now,
        sum_price: Number(shipping_info.sum_price),
        avg_sales: "not-yet, there was only one checkout"    //아직 측정 불가능
        }
    }

    


    //파일에 info 저장.
    var success = false;
    fs.writeFile(datafile, JSON.stringify(info_update), 'utf-8', (err)=>{
        if(!err){
            success = true; //성공을 true로 바꿈
            console.log('정보 갱신 성공');
        }
        else{
            console.log('정보 갱신 실패');
            console.log(err);
        }
        
        const result = {
            success,
            title: '정보 갱신',
            updated_time: new Date(),
            explain: '쇼핑몰의 정보를 갱신(/info를 통해 확인가능).'
        };
        res.json(result);
        
    });

});

app.get('/info_reset', async (req, res) => {  //정보 초기화
    let success = false;
    fs.writeFile(datafile, "", 'utf-8', (err)=>{

        if(!err){
            success = true; //성공을 true로 바꿈
            console.log('쇼핑몰 정보 초기화 성공');
        }
        else{
            console.log('쇼핑몰 정보 초기화 실패');
            console.log(err);
        }

        const result = {
            success,
            title: '쇼핑몰 정보 초기화',
            reset_time: new Date()
        }
        res.json(result);
    });

});


app.listen(port, function () {
    console.log(`Example app listening on port 8010!`);
});