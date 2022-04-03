module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>Test - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">구매(검색) 어플(테스트)</a></h1>
      
      ${body}
      </br>
      ${control}
    </body>
    </html>
    `;
  },
  p_list:function(filelist){ //물품 리스트
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/product_Info/${filelist[i]}">${i+1}번 물품: ${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
