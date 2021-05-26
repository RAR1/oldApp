import React, {Component} from 'react';
import "@/styles/my.less"
import {withRouter} from 'react-router-dom'


class my extends Component {
  constructor(...args) {
    super(...args);
    this.x = 0;
    this.y = 0;
    this.disX = 0;
    this.disY = 0;
  }

  startScroll(ev) {
    this.refs.parent.style.transition = 'none';
    this.disY = ev.targetTouches[0].clientY - this.y;
  }

  goScroll(ev) {
    this.y = ev.targetTouches[0].clientY - this.disY;
    if(this.y > 0) {
      if(this.y > 200) {
        this.refs.down_font.innerHTML = "请松手"
      }else{
        this.refs.down_font.innerHTML = "下拉刷新"
      }
      this.refs.parent.style.transform = `translateY(${this.y/3}px)`;
    }else {
      if(this.refs.parent.offsetHeight - this.refs.myInfo.clientHeight < 0) {
        this.y = 0;
      }else if(-this.y >= this.refs.parent.offsetHeight - this.refs.myInfo.clientHeight) {
        this.y =  -(this.refs.parent.offsetHeight - this.refs.myInfo.clientHeight)
      }
      this.refs.parent.style.transform = `translateY(${this.y}px)`;
    }


    if(this.y < -30) {
      this.refs.pulldown.style.opacity = -this.y/100;
      this.refs.pulldown.style.display = 'block'
    } else {
      this.refs.pulldown.style.opacity = 0;
      this.refs.pulldown.style.display = 'none'
    }
  }

  endScroll(ev) {
    if(this.y > 0) {
      setTimeout(()=>{
        this.y = 0;
        this.refs.parent.style.transition = `all 1s ease`;
        this.refs.parent.style.transform = `translateY(0)`;
      }, 1000)
    }
    if(this.y > 200) {
      this.refs.down_font.innerHTML = "加载中...";
    }
  }

  goSet() {
    this.props.history.push("/setting");
  }

  render() {
    return (
      <div className="myInfo" ref="myInfo" onTouchStart={this.startScroll.bind(this)} onTouchMove={this.goScroll.bind(this)} onTouchEnd={this.endScroll.bind(this)}>
        <header className="pull_down" ref="pulldown">
          {JSON.parse(localStorage.userInfo).nickname}
        </header>
        <div className="down_font" ref="down_font">下拉刷新</div>
        <div className="parent" ref="parent">
          <header className="header">
            <img></img>
            <p>{JSON.parse(localStorage.userInfo).nickname}</p>
            <div className="set" onClick={this.goSet.bind(this)}>设置</div>
          </header>
          <ul className="content">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
        </div>
      </div>
    )
  }
}


export default withRouter(my);
