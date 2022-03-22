
// 创建处理信息路由
const { Router } = require('express');

const routerInfo = Router();

const { express } = require('../module/module');

// 使用解析参数的中间件
routerInfo.use(express.urlencoded({ extends: false }));
// 解析json的中间件
routerInfo.use(express.json());


// 获取用户信息的路由  query参数
routerInfo.get('/getUserInfo', (req, res) => {
    res.send(JSON.stringify(req.query));
});

// 获取用户信息的路由  params参数
routerInfo.get('/getUserInfo/:id', (req, res) => {
    if (req.params.id == '10012') {
        res.send(JSON.stringify({ uname: 'sum', pwd: 12345 }));
    } else {
        res.send(400, '用户id有误');
    }
});

// 登录校验路由   body参数
routerInfo.post('/login', (req, res) => {

    if (req.body.uname === 'sum' && req.body.pwd === '12345') {
        res.send(200, 'ok!');
    } else {
        res.send(400, 'error');
    }
});

// 暴露路由
module.exports.routerInfo = function () { return routerInfo }