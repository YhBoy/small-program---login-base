//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录流程分析
    // 1. 每次进入小程序的时候先从本地存储中 判断有没有token
    const token = wx.getStorageSync('token')
    if( token && token.length > 0 ){
        console.log('用户授权了')
          // 已经有token 了  验证token 是否过期
          this.check_token(token)
    }else{
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log('用户授权了')
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            this.login()

            // wx.getUserInfo({
            //   success: res => {
            //     console.log(res)
            //     // 可以将 res 发送给后台解码出 unionId
            //     this.globalData.userInfo = res.userInfo
            //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            //     // 所以此处加入 callback 以防止这种情况
            //     if (this.userInfoReadyCallback) {
            //       this.userInfoReadyCallback(res)
            //     }
            //   }
            // })
          }else{
            console.log('用户没有授权')
            // 改变 isHide 的值，显示授权页面  
            // that.setData({
            //     isHide: true
            // });
          }
        }
      })
      
    }
    // 获取用户信息
    
  },

  check_token(token){ // 验证token是否过期
        wx.request({
          url: '127.0.0.1',
          method:'get',
          header:{
            token
          },
          success:res=>{
              // 这边根据 后端返回的状态码 判断 token是否过期  // 这里只做示例
              if( res.data.code == 1 ){ // 等于 1 的时候说明token 没有过期
                console.log('token有效')
                    // token 没有过去 重新给  globalData 存入 token 
                    this.globalData.token = token
              }else{
                 // token 过去  需要重新登录
                 this.login()
              }
          },
          fail:err=>{
            console.log(err)
          }   
        })
  },

  login(){
    wx.login({
      success: res => {
        const code = res.code //  得到 code
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: '127.0.0.1', // 后台地址
          method:'get',
          data:{
              code:code
          },
          success:(res)=>{
              const token  = res.data.token
              this.globalData.token = token
              wx.setStorage({
                data: "token",
                key: token,
              })
          }
        })
      }
    })
  },





  globalData: {
    token:'',
    userInfo: null
  }
})