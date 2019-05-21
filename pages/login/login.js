var app=getApp()

Page({

  data: {
       usersname:"",
       psw:"",
       userid_focus:false,
       passwd_focus:false,
       code:''
  },
  
  //获取当前输入框的焦点
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    } 
    },

  //获取输入的用户名与密码
  getusersname(e){
    let that=this
     that.setData({
        usersname:e.detail.value
     })
  },
  getpsw(e){
     let that=this
     that.setData({
         psw:e.detail.value
     })
  },

  //转去注册界面
   toreg(){
     wx.navigateTo({
       url: '../regist/regist',
     })
   },
   /*
 //点击登陆事件-测试用直接进主页
 
 tolog(){
      let that=this
      app.globalData.usersname = that.data.usersname
      console.log(that.data.usersname+' '+that.data.psw)
      wx.switchTab({
        url:  '../mainpage/mainpage'
      })
      console.log("login")
 },*/

   //发送用户code
   sendcode(){
     let that=this
     console.log("成功获取code")
     //发送code
     wx.request({
       url: app.globalData.urlhttps,
       data: {
         type: "code",
         code: that.data.code,
         username:that.data.usersname,
       },
       //code发送成功后接受key
       success: function (res) {
         if (res.data.retmsg== "ok") {

           //把key存到全局变量keyfromservice中
           app.globalData.keyfromservice = res.data.key
           app.globalData.usersname=that.data.usersname
           
           console.log("成功获取key值" + app.globalData.keyfromservice)
           wx.hideLoading()
           wx.showToast({
             title:"登陆成功!",
             icon:'none',
             duration:3000
           })
           //跳到主页
           wx.switchTab({
             url: '../mainpage/mainpage',
           })

         } else {
           console.log("获取key值请求失败")
           wx.hideLoading()
           wx.showToast({
             title: '服务器忙请稍后再试',
             icon: 'none',
             duration: 3000
           })
         }
       },

       fail: function (res) {
         console.log("request失败 " + res)
         wx.hideLoading()
         wx.showToast({
           title: '网络异常！',
           icon: 'none',
           duration: 3000
         })
       }
     })

   },

  //获取用户code
  getcode(){
    let that=this
    console.log("登陆认证成功")
    //获取微信的code
    wx.login({
      success: function (res) {
         if (res.code) {
           that.setData({
              code:res.code
           })
           that.sendcode()
         } else {
          wx.hideLoading()
          wx.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 3000
          })
         }
      }

    })
  },

  
  //点击登陆事件-带网络连接
  tolog(){
     let that=this
     if (that.data.usersname=='' || that.data.psw=='')
      wx.showToast({
        title: '请确认信息填写完整！',
        icon:'none',
        duration:3000
      })
     else
     {
      wx.showLoading({
        title:"正在登陆请稍后"
      })
     wx.request({
       url: app.globalData.urlhttps,
       data:{
          type:"login",
          username:that.data.usersname,
          password:that.data.psw
       },
       success:function(res){
          //确认用户成功后
           if(res.data=="ok"){
             that.getcode()
            
            
           }else{
             wx.hideLoading()
             wx.showToast({
               title: '服务器忙请稍后再试',
               icon:'none',
               duration:3000
             })

           }
       },
       fail:function(res){
         wx.hideLoading()
         wx.showToast({
           title: '网络问题！请检查网络连接',
           icon:'none',
           duration:3000
         })
       }
     })
    
    }

  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})