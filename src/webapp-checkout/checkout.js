import dotenv from 'dotenv';
import express from 'express';

import {PurchaseAPI} from "./purchaseApi.js";
import { CartAPI } from './CartApi.js';
import { CurrencyAPI } from './CurrencyApi.js';
import { ShippingAPI } from './ShippingApi.js';
import {ProductAPI} from './ProductApi.js';
import {InfoAPI} from './InfoApi.js';
import cors from "cors";

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.CHEKCOUT_PORT || '8009');


// 전체 구매 절차를 담당하는 app, 


app.get('/checkout', async (req, res) => {  //결제를 진행하는 앱(카트에 담겨있는 물품 일괄 결제)
    var success = true; //실패시 false로 전환(에러뜨면)
    let card_data;
    let cart_list;
    let currency;
    let shipping_info;

    try{
        //await 병렬처리(_P가 붙은것들)
        const card_P = PurchaseAPI.loadCardList();
        const cart_list_P = CartAPI.loadCartList();
        const currency_P = CurrencyAPI.loadCurrencyList()[0];
        
        await ShippingAPI.addShippingAll();
        const shipping_info_P = ShippingAPI.loadshippingInfo();

        card_data = await card_P;
        cart_list =  await cart_list_P;
        currency = await currency_P;
        shipping_info = await shipping_info_P;

    }catch (e){
        success = false;    //실패
        console.log("에러발생함!!");
        console.log(e);
        res.json(e);
    }
    //console.log("Dfsadfdsknvlsdvndkl");

    var today = new Date();
    var card = card_data[0];

    const result = {    //리턴할 결과
        title: "결제 결과",
        success,    //성공여부
        cost: shipping_info.sum_price,  //결제금액
        number: shipping_info.number,   //결제한 물건 수
        used_card: card.title,   //사용한 카드의 이름
        date: today,
        explain: `${card.title}카드를 이용하여 ${shipping_info.sum_price}만큼 지불하여 장바구니 상품들의 결제를 진행하였다.(일시: ${today})`

    };

    //이후에는 이메일보내기 등, 결제와 함께 진행되는 다른 작업들 수행
    await InfoAPI.updateInfo();
    //console.log("됬음!!!!!!!!!!!!");

    //카트와 구매내역 삭제
    CartAPI.removeCartAll();
    ShippingAPI.removeShippingAll();

    res.json(result);


});

app.get('/checkout/:check_id', async (req, res) => {  //결제를 진행하는 앱(product중 id를 즉시 결제)
    var success = true; //실패시 false로 전환(에러뜨면)
    let card_data;
    let product;
    let currency;
    let shipping_info;
    var id = req.params.check_id;

    try{
        //await 병렬처리(_P가 붙은것들)
        const card_P = PurchaseAPI.loadCardList();
        const product_P = ProductAPI.loadData(id);
        const currency_P = CurrencyAPI.loadCurrencyList()[0];
        
        await ShippingAPI.addShipping(id);
        const shipping_info_P = ShippingAPI.loadshippingInfo();

        card_data = await card_P;
        product =  await product_P;
        currency = await currency_P;
        shipping_info = await shipping_info_P;

    }catch (e){
        success = false;    //실패
        console.log("에러발생함!!");
        console.log(e);
        res.json(e);
    }


    var today = new Date();
    var card = card_data[0];

    const result = {    //리턴할 결과
        title: "결제 결과",
        success,    //성공여부
        cost: shipping_info.sum_price,  //결제금액
        number: shipping_info.number,   //결제한 물건 수
        used_card: card.title,   //사용한 카드의 이름
        date: today,
        explain: `${card.title}카드를 이용하여 ${shipping_info.sum_price}만큼 지불하여 단일상품 product ${id}에 대한 결제를 진행하였다.(일시: ${today})`

    };

    //이후에는 이메일보내기 등, 결제와 함께 진행되는 다른 작업들 수행
    
    await InfoAPI.updateInfo();

    //구매내역 삭제
    ShippingAPI.removeShippingAll();

    res.json(result);


});
 
app.listen(port, function () {
    console.log(`Example app listening on port 8009!`);
});