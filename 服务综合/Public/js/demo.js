window.addEventListener('load', () => {

    let getInfoBtns = document.querySelectorAll('button'),
        idInput = document.querySelector('#userId'),
        infoBtn = document.querySelector('#info'),
        ps = document.querySelectorAll('p');

    getInfoBtns[0].addEventListener('click', () => {
        if (idInput.value.trim('') === '') {
            confirm('未输入有效用户id');
            return;
        }
        Request('get', 'http://localhost:3300/getUserInfo/' + idInput.value.trim(''))
            .then(data => {
                data = JSON.parse(data);
                ps[0].innerHTML = `姓名：${data.uname}；\t密码：${data.pwd}`;
            }
            ).catch(err => {
                ps[0].innerHTML = `未查询到用户`;
            });
    });

    getInfoBtns[1].addEventListener('click', () => {
        if (infoBtn.value.trim('') === '') {
            confirm('未输入有效用户id');
            return;
        }
        Request('get', 'http://localhost:3300/getUserInfo?info=' + infoBtn.value.trim('') + '&&id=2333')
            .then(data => {
                data = JSON.parse(data);
                ps[1].innerHTML = `${data.info}；\tid：${data.id}`;
            }
            ).catch(err => {
                ps[1].innerHTML = `未查询到信息`;
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