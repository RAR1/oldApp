import React, {Component} from 'react'
import { userLogout } from '@/api/user'
import { List, NavBar, Icon , Button } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
const Item = List.Item;

class Setting extends Component {
  constructor(...args) {
    super(...args);
  }

  logout() {
    userLogout({token: localStorage.token}).then(res => {
      if(res.data.error == 0) {
        this.props.history.push("/login");
      }
    })
  }


  render() {
    return(
      <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.push('/home')}
        >设置</NavBar>
        <List style={{marginTop: '2rem'}}>
          <Item arrow="horizontal" onClick={() => {this.props.history.push("/setting/changePassword")}}>修改密码</Item>
        </List>
        <Button style={{marginTop: '1rem'}} onClick={this.logout.bind(this)}>退出登录</Button>
      </div>
    )
  }
}

export default withRouter(Setting)
