import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import {ProductAPI} from "./productApi.js"
import cors from "cors";
import path from 'path';

const __dirname = path.resolve();

const datafile = './data/cart-list.json';

dotenv.config();

var app = express()
app.use(cors());
app.options('*', cors());

var port = (process.env.PORT || '8008');


// 장바구니와 관련된 app으로 product를 호출하여 사용한다, checkout, frontend에서 호출하며, 



app.get('/cart', function (req, res) { //현재 cart_list 반환, 비어있는 경우 "empty" 반환
    if(Math.random() < 0.5){  
        return res.status(500).json({text: '에러를 발생시키는 팟입니다'});  
    }  

    let cart_list = (fs.readFileSync(datafile, 'utf-8'));
    if(cart_list != "" && cart_list != undefined){ //빈파일("")이 아닐때만, 빈파일이면 JSON으로 변환이 안됨.
        console.log("빈파일 아님!!!!");
        cart_list = JSON.parse(cart_list);
        console.log("저장된 cart-list:(아래)");
        console.log(cart_list);
        res.json(cart_list);
    }
    else{   //빈 배열일때
        console.log("cart-list가 비어있음");
        res.json([]);
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

app.get('/cart_add', async (req, res) => {  //cart에 물품 추가
    if(Math.random() < 0.5){  
        return res.status(500).json({text: '에러를 발생시키는 팟입니다'});  
    }  

    const add_product = await ProductAPI.loadListData();  //product중 cart_id와 같은 id를 가진 product값을 받아옴(cart_list에 추가해 줄 데이터)
    //console.log(`cartlist에 저장할 데이터: ${add_product}`);
    //const add = JSON.stringify(add_product);

    let cart_list = Array();
    let pre_list = fs.readFileSync(datafile, 'utf-8');
    if(pre_list !="" && pre_list != undefined){ //빈파일이 아닐때만(첫 입력이 아닌 경우)
        cart_list =(JSON.parse(fs.readFileSync(datafile, 'utf-8'))); //파일에 저장되있던 기존 리스트(string형태의 json값들)를 자바스크립트 json객체로 변환
    }
    
    for(var i in add_product){
        cart_list.push(add_product[i]);
        
    }
    console.log("카트리스트 추가됬는지 확인(아래)")
    console.log(cart_list);

    var success = false;
    fs.writeFile(datafile, JSON.stringify(cart_list), 'utf-8', (err)=>{
        if(!err){
            success = true; //성공을 true로 바꿈
            console.log('카트리스트 추가 성공');
        }
        else{
            console.log('카트리스트 추가 실패');
            console.log(err);
        }
        
        const result = {
            success,
            title: '카트 물품 추가',
            added_time: new Date(),
            explain: 'products전체 카트에 추가'
        };
        res.json(result);
        
    });

});

app.get('/cart_add/:cart_id', async (req, res) => {  //cart에 물품 추가
    if(Math.random() < 0.5){  
        return res.status(500).json({text: '에러를 발생시키는 팟입니다'});  
    }  
    
    let id = req.params.cart_id;
    const add_product = await ProductAPI.loadData(id);  //product중 cart_id와 같은 id를 가진 product값을 받아옴(cart_list에 추가해 줄 데이터)
    console.log(`cartlist에 저장할 데이터: ${add_product}`);
    //const add = JSON.stringify(add_product);

    let cart_list = Array();
    let pre_list = fs.readFileSync(datafile, 'utf-8');
    if(pre_list !="" && pre_list != undefined){ //빈파일이 아닐때만(첫 입력이 아닌 경우)
        cart_list =(JSON.parse(fs.readFileSync(datafile, 'utf-8'))); //파일에 저장되있던 기존 리스트(string형태의 json값들)를 자바스크립트 json객체로 변환
    }
    
    cart_list.push(add_product);
    var success = false;
    fs.writeFile(datafile, JSON.stringify(cart_list), 'utf-8', (err)=>{
        if(!err){
            success = true; //성공을 true로 바꿈
            console.log('카트리스트 추가 성공');
        }
        else{
            console.log('카트리스트 추가 실패');
            console.log(err);
        }
        
        const result = {
            success,
            title: '카트 물품 추가',
            added_id: id,
            added_time: new Date(),
            explain: `${id}에 해당하는 product를 장바구니에 추가`
        };
        res.json(result);
        
    });

});

app.get('/cart_remove', async (req, res) => {  //cart_list 모두 삭제(초기화)
    if(Math.random() < 0.5){  
        return res.status(500).json({text: '에러를 발생시키는 팟입니다'});  
    }  
    let success = false;
    fs.writeFile(datafile, "", 'utf-8', (err)=>{

        if(!err){
            success = true; //성공을 true로 바꿈
            console.log('카트리스트 초기화 성공');
        }
        else{
            console.log('카트리스트 초기화 실패');
            console.log(err);
        }

        const result = {
            success,
            title: '카트 물품 삭제',
            removed_time: new Date(),
            explain: '카트 물품 전체 초기화'
        }
        //res.send('cart_list 초기화성공');
        res.json(result);
    });

});

app.get('/cart_remove/:remove_id', async (req, res) => {  //cart_list중에 해당id 삭제
    if(Math.random() < 0.5){  
        return res.status(500).json({text: '에러를 발생시키는 팟입니다'});  
    }  

    let cart_list = Array();
    const id = req.params.remove_id;
    cart_list = (JSON.parse(fs.readFileSync(datafile, 'utf-8')));
    
    
    for(var i in cart_list){ //삭제를 위해 cart_list에서 for를 통해 id탐색
        console.log(cart_list[i].id);
        if(cart_list[i].id == id){ //만약 삭제하고자 하는 id와 같은 id가 발견되면,
            
            cart_list.splice(i,1); //i번째 객체 삭제
            fs.writeFile(datafile, JSON.stringify(cart_list), 'utf-8', (err)=>{
                let success = false; //후에 성공시 true로 바뀜
                if(!err){
                    console.log('cartlist 에서 물품삭제성공!');
                    success = true;
                }
                else{
                    console.log('cartlist 에서 물품삭제실패!');
                }

                const result = {
                    success,
                    title: '카트 물품 삭제',
                    removed_id: id,
                    removed_time: new Date(),
                    explain: '특정 카트 물품만을 리스트에서 삭제'
                }
                //res.send('cart_list 물품삭제 성공!');
                res.json(result);
                
            });
           
            //return;  //한번에 하나만 삭제할것이므로 삭제후에는 loop탈출
        }

    }
    //for문을 빠져나온것은 해당하는 물품이 없기 때문
    res.json({
        success: false,
        title: '카트에 해당 물품이 없음',
        removed_id: id,
        removed_time: new Date()
    })
    



});

app.listen(port, function () {
    console.log(`Example app listening on port 8008!`);
});