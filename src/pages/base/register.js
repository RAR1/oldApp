import React, { Component } from 'react'
import { List, InputItem, Button, Toast, WhiteSpace } from 'antd-mobile'
import { userReigster } from '@/api/user'
import '@/styles/login.less'

class Register extends Component {
  constructor(...args) {
    super(...args);
  }

  signIn() {
    userReigster({nickname: this.refs.nickname.state.value, account: this.refs.account.state.value, password: this.refs.password.state.value}).then(res => {
      console.log(res);
      if(res.data.error == 0) {
        Toast.success("注册成功!");
      }
    })
  }

  goLogin() {
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="register">
        <div className="bg">
          <p>测试系统注册</p>
        </div>
        <div className="form">
          <WhiteSpace/>
          <InputItem placeholder="请输入昵称" ref="nickname">昵称:</InputItem>
          <WhiteSpace size="lg" />
          <InputItem placeholder="请输入账号" ref="account">账号:</InputItem>
          <WhiteSpace size="lg" />
          <InputItem type="password" placeholder="请输入密码" ref="password">密码:</InputItem>
          <WhiteSpace size="lg" />
          <Button type="primary" onClick={this.signIn.bind(this)}>注册</Button>
          <WhiteSpace size="lg" />
          <Button onClick={this.goLogin.bind(this)}>去登录</Button>
        </div>
      </div>
    )
  }
}

export default Register;
