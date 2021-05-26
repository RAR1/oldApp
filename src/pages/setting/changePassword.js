import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon, List, InputItem, Button, Toast } from 'antd-mobile'
import { updatePassword } from '@/api/setting'

const Item = List.Item;
class ChangePassword extends Component {
  constructor(...args) {
    super(...args);
  }

  submit() {
    updatePassword({oldPassword: this.refs.oldPass.state.value, newPassword: this.refs.newPass.state.value, token: localStorage.token}).then(res => {
      console.log(res);
      if(res.data.error == 0) {
        Toast.success(res.data.msg);
      } else {
        Toast.fail(res.data.msg);
      }
    })
  }

  render() {
    return(
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onClick={() => {this.props.history.push("/setting")}}
        >修改密码</NavBar>
        <List style={{marginTop: '1rem'}}>
          <InputItem placeholder="请输入当前登录密码" type="password" ref="oldPass">
            请输入当前登录密码
          </InputItem>
        </List>
        <List style={{marginTop: '1rem'}}>
          <InputItem placeholder="确认新密码" type="password" ref="newPass">
            确认新密码
          </InputItem>
        </List>
        <p style={{padding: '.5rem'}}>必须是6个以上的英文字母、数字或符号(除空格)</p>
        <Button type="warning" style={{marginTop: "2rem"}} onClick={this.submit.bind(this)}>确认修改</Button>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
