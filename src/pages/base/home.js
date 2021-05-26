import React, { Component } from "react"
import { findDOMNode } from 'react-dom'
import { SearchBar, Carousel, WingBlank, WhiteSpace, Button,  PullToRefresh } from "antd-mobile"
import { homeImg } from "@/api/home"
import "@/styles/home.less"

class Home extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      imgList: [],
      imgHeight: 176,
      height: document.documentElement.clientHeight,
      talkData: [1,2,3,4,5,6,7,8,9,10]
    }
  }


  getHomeList() {
    homeImg({token: localStorage.token}).then(res => {
      console.log(res);
      if(res.data.error == 0) {
        this.setState({
          imgList: res.data.data
        })
      }
    })
  }

  componentDidMount() {
    this.getHomeList();
    console.log(this.ptr)
    const hei = this.state.height - findDOMNode(this.ptr).offsetTop;
    console.log(this.state.height, findDOMNode(this.ptr).offsetTop)
    setTimeout(() => this.setState({
      height: hei,
    }), 0);
  }


  render() {
    return (
      <div className="home">
        <div className="header">
          <SearchBar placeholder="搜索" maxLength={8} />
        </div>
        <WhiteSpace size="xs" />
        <div>
          <WingBlank>
          <Carousel
            autoplay={false}
            infinite
            autoplay={true}
          >
            {this.state.imgList.map(val => (
              <a
                key={val.id}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={val.img_url}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
          </WingBlank>
        </div>
        <div className="content">
          <p className="content-header">精品Talking</p>
          <PullToRefresh
            direction="down"
            ref={ref => this.ptr = ref}
            onRefresh={() => {
              console.log("下拉刷新")
            }}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
          >
            <ul>
              {this.state.talkData.map(item => {
                return (
                  <li key={item}>
                    <img src={require("@/assets/login_bg.jpg")} />
                    <div className="info">
                      <p>这个是标题</p>
                      <p>志云 | 互联网</p>
                      <p>263人回答</p>
                      <p>2019-12-10</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </PullToRefresh>
        </div>
      </div>
    )
  }
}

export default Home;
