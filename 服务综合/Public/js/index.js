window.addEventListener('load', () => {
    let btnLogin = document.querySelector('span');


    btnLogin.addEventListener('click', () => {
        // 跳转至登录页
        location.href = 'http://localhost:3300/login';
    });
});