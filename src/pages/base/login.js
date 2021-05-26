import React, { Component } from 'react'
import { InputItem, Button, WhiteSpace, Toast } from 'antd-mobile'
import { userLogin } from '@/api/user'

import '@/styles/login.less'

class Login extends Component {
  constructor(...args) {
    super(...args);
  }

  loginFn() {
    userLogin({account: this.refs.account.state.value, password: this.refs.password.state.value}).then(res => {
      console.log(res);
      if(res.data.error == 0) {
        console.log(res.data.data)
        localStorage.token = res.data.data.token;
        localStorage.userInfo = JSON.stringify(res.data.data.user_info);
        this.props.history.push("/home");
      }else {
        Toast.fail(res.data.msg);
      }
    })
  }

  goRegister() {
    this.props.history.push("/register");
  }


  render() {
    return (
      <div className="login">
        <div className="bg">
          <p>测试系统登录</p>
        </div>
        <div className="form">
          <WhiteSpace />
          <InputItem placeholder="请输入用户名" ref="account">用户名</InputItem>
          <WhiteSpace size="lg" />
          <InputItem type="password" placeholder="请输入密码" ref="password">密码</InputItem>
          <WhiteSpace size="lg" />
          <Button type="primary" onClick={this.loginFn.bind(this)}>登录</Button>
          <WhiteSpace size="lg" />
          <Button onClick={this.goRegister.bind(this)}>去注册</Button>
        </div>
      </div>
    )
  }
}

export default Login
