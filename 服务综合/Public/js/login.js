window.addEventListener('load', () => {

    let summit = document.querySelector('button'),
        uname = document.querySelector('#uname'),
        pwd = document.querySelector('#pwd');

    summit.addEventListener('click', () => {

        if (uname.value.trim('') === '' || pwd.value.trim('') === '') {
            confirm('账号或者密码为空！');
            return;
        }

        Request('post', 'http://localhost:3300/login', { uname: uname.value.trim(''), pwd: pwd.value.trim('') })
            .then(data => {
                if (data === 'ok!') {
                    window.location.href = 'http://localhost:3300/demo';
                }
            }).catch(err => {
                confirm('账号或密码输入错误' + err);
            });
    });

    function Request(requestMethod, requestPath, props = undefined) {
        // 创建ajax请求实例
        const xml = new XMLHttpRequest();
        // 初始化请求
        xml.open(requestMethod, requestPath, true);
        // 设置请求数据的类型
        xml.setRequestHeader('Content-Type', 'application/json;charset=utf8');
        // 设置请求超时
        xml.timeout = 3000;

        return new Promise((resolve, reject) => {

            // 设置请求超时处理函数
            xml.addEventListener('timeout', () => {
                confirm('请求超时');
            });
            // 设置请求失败处理程序
            xml.addEventListener('error', () => {
                confirm('请求失败');
            });

            xml.addEventListener('readystatechange', () => {
                // 请求已经准备好了（已发送）
                if (xml.readyState === 4) {
                    // 响应完全接收
                    if (xml.status >= 200 && xml.status < 300 || xml.status === 304) {
                        resolve(xml.responseText);
                    } else {
                        reject(xml.status);
                    }
                }
            });
            xml.send(JSON.stringify(props));
        });
    }
});