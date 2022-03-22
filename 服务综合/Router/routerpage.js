const { Router } = require('express');

const routerpage = Router();

const { fs, path, express } = require('../module/module');

// 开放静态文件
routerpage.use(express.static(path.join(__dirname, '../Public/css')));
routerpage.use(express.static(path.join(__dirname, '../Public/js')));

// 获取首页的路由
routerpage.get('/', (req, res) => {
    myReadFile(path.resolve(__dirname, '../Public/html/index.html'))
        .then(data => res.send(data)).catch((err) => console.log(err));
});

// 获取登录页面的路由
routerpage.get('/login', (req, res) => {
    myReadFile(path.resolve(__dirname, '../Public/html/login.html'))
        .then(data => res.send(data)).catch(err => console.log(err));
});

// 获取demo页面的路由
routerpage.get('/demo', (req, res) => {
    myReadFile(path.resolve(__dirname, '../Public/html/demo.html'))
        .then(data => res.send(data)).catch((err) => console.log(err));
});

// 找不到资源处理的中间件
routerpage.use((request, response, next) => {
    myReadFile(path.resolve(__dirname, '../Public/html/error.html'))
        .then(data => response.send(data)).catch((err) => console.log(err));
});


// 处理异步读取文件
function myReadFile(path) {
    let p = new Promise((resolve, reject) => {

        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.toString());
        });
    });
    return p;
}


module.exports.routerpage = function () { return routerpage }