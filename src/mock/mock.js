import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {account, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let ok = false;
        setTimeout(() => {
          if (account === "admin" && password === "admin"){
              ok = true;
              console.log("校验账号密码成功");
          }
          if (ok) {
            resolve([200, { code: 200, msg: '请求成功'}]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });


  }
};