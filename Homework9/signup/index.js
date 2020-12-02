var http = require('http');    //载入http包
var urlTool = require('url');  //载入utl包
var querystring = require('querystring'); //载入querystring包
var jade = require('jade');   //载入jade包
var fs = require('fs');       //载入fs包
const validator = require('./validator');  //引入validator

var allUsers = {}; //用来存放所有的用户

http.createServer(function(req, res){   //创建http服务器，req表示http request,可读流，res表示response，可写流
    switch(req.url) {                   //根据url的不同来发送不同的文件
        case '/validator.js':
            sendFile(res, 'validator.js', 'text/javascript');
            break;
        case '/signup.js':
            sendFile(res, 'signup.js', 'text/javascript');
            break;
        case '/style.css':
            sendFile(res, 'style.css', 'text/css');
            break;
        case '/style2.css':
            sendFile(res, 'style2.css', 'text/css');
            break;
        case '/jquery.js':
            sendFile(res, 'jquery.js', 'text/javascript');
            break;
        default:
            if (req.method == 'POST') { //如果请求方法是提交表单，那么就注册用户
                registUser(req, res);
            }
            else {
                sendHtml(req, res);     //否则就发送网页
            }
    }
}).listen(8000); //在localhost:8000监听

console.log("Signup server is listening at 8000");

function sendFile(res, filepath, dataType) {
    res.writeHead(200, {                //设置响应头，200是http状态码，200表示正常
        "Content-Type": dataType        //"Content-Type"是状态描述，dataType是数据类型
    }); 
    res.end(fs.readFileSync(filepath)); //完成发送请求，同步读取文件之后，将主体发送到服务器
}

function registUser(req, res) {
    req.on('data', function(data){    //req.on用于接收客户端数据
        try {
            var user = parseUser(data.toString());
            checkUser(user);                                              //检查用户的合法性
            allUsers[user.username] = user;                               //将用户存入用户列表
            res.writeHead(301, {                                          //301状态码，表示用户的数据，已经永久转移到别的地方
                Location: '?username=' + user.username                    //转移后的位置为原来地址加上?username=加上用户名
            });
            res.end();                                                    //完成发送请求，不发送主体
        } catch (error) {
            showSignup(res, user, error.message);                         //如果出错了，那么留在注册界面，并展示错误信息
        }
    });
}

function checkUser(user) {
    var errorMessages = []                                               //由于可能有多个错误信息，故需要将错误信息存放在一个数组
    for(var key in user) {
        if (!validator.isFieldValid(key, user[key])) errorMessages.push(validator.form[key].errorMessage);  //如果出错，那么就存放错误信息即可
        if (!validator.isAttrValueUnique(allUsers, user, key)) errorMessages.push(                          //如果是数据不唯一的错误，那么就要自己手写错误信息
            key + " is not unique: " + user[key]
        );
    }
    if (errorMessages.length != 0) throw new Error(errorMessages.join('<br />'));                           //如果数组非空，说明有错误，那么久抛出错误
}

function parseUser(message) {
    params = message.match(/username=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);                                //通过正则表达式来捕获数据
    //接下来来赋值user，注意email要用decodeURIComponent才能使@正常使用
    var user = {username: params[1], sid: params[2], phone: params[3], email: decodeURIComponent(params[4])};
    return user;
}

function sendHtml(req, res) {
    var username = parseUsername(req);                 //首先获取用户名
    if (!username) {                                   //如果用户名捕获不到，那么就留在注册界面
        showSignup(res, {username: username}, null);   //这里没有报错，不用传递错误参数
    } else {
        showDetail(res, allUsers[username]);           //发送detai网页
    }
}

function parseUsername(req) {
    return querystring.parse(urlTool.parse(req.url).query).username;
}

function showSignup(res, user, error) {
    showHtml(res, 'signup.jade', {user: user, error: error});
}

function showDetail(res, user) {
    showHtml(res, 'detail.jade', user);
}

function showHtml(res, path, data) {                  //抽象showHtml函数，path表示jade文件的路径，data表示要传的参数
    res.writeHead(200, 
        {"Content-Type": "text/html"}
    );
    res.end(jade.renderFile(path, data));
}