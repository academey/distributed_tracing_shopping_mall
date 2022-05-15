import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import {CartAPI} from "./CartApi.js";
import cors from "cors";
import { ProductAPI } from './ProductApi.js';

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.SHIPPING_PORT || '8006');

const datafile = 'src\webapp-shipping\data\shipping-list.json';

// shipping: 주문 내역 및 배송관리
//success, title, add_id, add_time 등을 반환
//추가 가능성: 만약 다른 app을 만들어서 거기서 배송을 한지 안한지 컨트롤 할 수 있다면, 그것을 구현?


app.get('/shipping', function (req, res) { //현재 shipping_list 반환, 비어있는 경우 [] 반환

    fs.readFile(datafile, 'utf-8', function(err, shipping_list) {
        console.log(shipping_list);
        if(shipping_list != "" && shipping_list != undefined){ //빈파일("empty")이 아닐때만, 빈파일이면 JSON으로 변환이 안됨.
            shipping_list = JSON.parse(shipping_list);
            console.log("저장된 shipping_list:(아래)");
            console.log(shipping_list);
            res.json(shipping_list);
        }
        else{   //빈 배열일때
            console.log("shipping_list가 비어있음");
            res.json([]);
        }
    
    });

});

app.get('/shipping_test', async (req, res) => {
    const add_list = await CartAPI.loadCartList();
    const product = await ProductAPI.loadData(1);

    console.log(datafile);
    //console.log(Number(product.price)+3);
    for(var x in add_list){
        console.log(x);
    }
    res.json(add_list);
})

app.get('/shipping_info', async(req, res)=> {

    let shipping_list = (fs.readFileSync(datafile, 'utf-8'));
    if(shipping_list != "" && shipping_list != undefined){ //빈파일("empty")이 아닐때
        shipping_list = JSON.parse(shipping_list);
        console.log("저장된 shipping_list:(아래)");
        console.log(shipping_list);
        console.log("데이터 추출");
        var i = 0;
        var sum_price = 0;
        for(var x of shipping_list){
            i++;
            var product = await ProductAPI.loadData(x.id);
            sum_price += Number(product.price);

        }
        const result = {
            number : i, //주문한 물품 숫자.
            sum_price,
            explain: "주문내역에 담긴 물품들에 대한 총괄 정보"
        }
        res.json(result);
    }
    else{   //빈 배열일때
        console.log("shipping_list가 비어있음");
        res.json({
            number: 0,
            sum_price: 0,
            explain: "현재 주문내역에 담긴 물품이 없습니다."
        });
    }
});


app.get('/shipping_add', async (req, res) => {// 그냥 add를 하면 카트리스트 전부를 가져오도록 하자.
    const add_list = await CartAPI.loadCartList();
    var shippingList = new Array();
    for(var i of add_list){
        shippingList.push({ //어레이에 객체 추가
        id: i.id,
        title: `${i.id}번째 물품 주문`,
        price: Number(Number(i.price)*(1-i.discount)).toFixed(3),
        info: `${i.id}번째 물품의 주문내역입니다. 여기서의 price는 할인률이 적용되어있습니다.`,
        explain: `cart app으로부터 가져온 정보`
        });
    }

    fs.writeFile(`src\webapp-shipping\data\shipping-list.json`, JSON.stringify(shippingList), 'utf-8', (err)=>{
        var success = false;
        if(!err){
            success = true; //성공을 true로 바꿈
            console.log('주문내역 추가 성공');
        }
        else{
            console.log('주문내역 추가 실패');
            console.log(err);
        }

        const result = {
            success,
            title: '모든 카트상품 주문내역 추가',
            added_time: new Date(),
            explain: "cart app으로부터 가져온 정보들"
        };

        res.json(result);
        
    });
});



app.get('/shipping_add/:shipping_id', async (req, res) => {  //특정 물품을 단품 구매 할때(cart를 거치지 않을때 사용될 예정)
    let id = req.params.shipping_id;
    const add_product = await ProductAPI.loadData(id);  //product중 shipping_id와 같은 id를 가진 product값을 받아옴(shipping_list에 추가해 줄 데이터)
    console.log(`shippinglist에 저장할 데이터: ${add_product}`);
    //const add = JSON.stringify(add_product);
   
    let shipping_list = Array();
    let pre_list = fs.readFileSync(datafile, 'utf-8');
    if(pre_list !="" && pre_list != undefined){ //빈파일이 아닐때만(첫 입력이 아닌 경우)
        shipping_list =(JSON.parse(fs.readFileSync(datafile, 'utf-8'))); //파일에 저장되있던 기존 리스트(string형태의 json값들)를 자바스크립트 json객체로 변환
    }
    
    var i = add_product;
    shipping_list.push({
        id: i.id,
        title: `${i.id}번째 물품 주문`,
        price: i.price*(1-i.discount),
        info: `${i.id}번째 물품의 주문내역입니다. 여기서의 price는 할인률이 적용되어있습니다.`,
        explain: `product app으로부터 가져온 정보` 
    });    //물품을 리스트에 추가'

    var success = false;
    fs.writeFile(`src\webapp-shipping\data\shipping-list.json`, JSON.stringify(shipping_list), 'utf-8', (err)=>{
        if(!err){
            success = true; //성공을 true로 바꿈
            console.log('주문내역 추가 성공');
        }
        else{
            console.log('주문내역 추가 실패');
            console.log(err);
        }
        
        const result = {
            success,
            title: '주문내역 추가',
            added_id: id,
            added_time: new Date(),
            explain: "product app으로부터 가져온 정보"
        };
        res.json(result);
        
    });

});


app.get('/shipping_remove', async (req, res) => {  //주문내역 모두 삭제(초기화)
    let success = false;
    fs.writeFile(`src\webapp-shipping\data\shipping-list.json`, "", 'utf-8', (err)=>{

        if(!err){
            success = true; //성공을 true로 바꿈
            console.log('주문내역 초기화 성공');
        }
        else{
            console.log('주문내역 초기화 실패');
            console.log(err);
        }

        const result = {
            success,
            title: '주문내역 삭제(초기화)',
            removed_time: new Date()
        }
        //res.send('cart_list 초기화성공');
        res.json(result);
    });

});


app.get('/shipping_remove/:remove_id', async (req, res) => {  //주문내역 중에 해당id 삭제
    let shipping_list = Array();
    const id = req.params.remove_id;
    shipping_list = (JSON.parse(fs.readFileSync('src\webapp-shipping\data\shipping-list.json', 'utf-8')));
    
    for(var i in shipping_list){ //삭제를 위해 cart_list에서 for를 통해 id탐색
        console.log(shipping_list[i].id);
        if(shipping_list[i].id == id){ //만약 삭제하고자 하는 id와 같은 id가 발견되면,
            
            shipping_list.splice(i,1); //i번째 객체 삭제
            fs.writeFile(`src\webapp-shipping\data\shipping-list.json`, JSON.stringify(shipping_list), 'utf-8', (err)=>{
                let success = false; //후에 성공시 true로 바뀜
                if(!err){
                    console.log('주문내역에서 물품삭제성공!');
                    success = true;
                }
                else{
                    console.log('주문내역에서 물품삭제실패!');
                }

                const result = {
                    success,
                    title: '주문내역 물품 삭제',
                    removed_id: id,
                    removed_time: new Date()
                }

                res.json(result);
                
            });
           

        }

    }
    //for문을 빠져나온것은 해당하는 물품이 없기 때문
    res.json({
        success: false,
        title: '주문내역에 해당 물품이 없음',
        removed_id: id,
        removed_time: new Date()
    })
});


app.listen(port, function () {
    console.log(`Example app listening on port 8006!`);
});