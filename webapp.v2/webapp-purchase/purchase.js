require('dotenv').config();

var express = require('express')
var app = express()
var port = (process.env.PORT || '8000');
var fs = require('fs');
var template = require('./lib/template.js');

//app.get('/', (req, res) => res.send('Hello world'))를 아래와 같이 변환

app.get('/', function(request, response) {  //메인 페이지
  fs.readdir('./data', function(error, filelist){
    var title = '물품 구매';
    var description = '구매할 물품들에 대한 정보';
    var list = template.p_list(filelist);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/pay">결제 진행(클릭)</a>
      <a href= ${process.env.URL_search}>검색으로 돌아가기(클릭)</a>`
    );
    response.send(html);
  });
});

app.get('/pay', function(request, response) {  //결제 시작 페이지
    fs.readdir('./data', function(error, filelist){
      var title = '결제 방식 선택';
      var description = '결제 방식을 선택하시오';
      var list = template.p_list(filelist);
      var html = template.HTML(title, list,
        `<h2>${title}</h2>${description}
        <ul>
          <li><a href="/pay/card">신용카드</a></li>
          <li><a href="/pay/paypal">페이팔</a></li>
          <li><a href="/pay/kakaopay">카카오페이</a></li>
        </ul>`,
        ``
      );
      response.send(html);
    });
  });


app.get('/pay/:pay_type', function(req, res) {
    var title = '구매 과정';
    var description = `구매방식 ${req.params.pay_type}에 대한 결제방식을 진행`;
    //var list = template.list(filelist);
    var list = '';
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      '<a href="/">메인으로(클릭)</a>'

      
    );    
    
    res.send(html);
});


app.listen(port, function(){
  console.log(`Example app listening on port 3000!`);
});