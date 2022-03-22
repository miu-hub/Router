// 引入express框架
const express = require('express');
// 创建服务
const server = express();

// 引入业务路由和信息路由
const { routerInfo } = require('./Router/routerInfo');
const { routerpage } = require('./Router/routerpage');
// 使用路由
server.use(routerInfo());
server.use(routerpage());

// 设置响应头
server.all('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// 监听端口
server.listen(3300, err => {
    if (err) {
        throw new Error('服务启动失败');
    }
    console.log('服务启动成功！');
});