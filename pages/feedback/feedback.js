// pages/feedback/feedback.j
var app=getApp()

Page({

  data: {
    usersname: "",
    psw: ""
  },
  //获取输入的统一验证码与密码
  getusersname(e) {
    let that = this
    that.setData({
      usersname: e.detail.value
    })
  },
  getpsw(e) {
    let that = this
    that.setData({
      psw: e.detail.value
    })
  },
  
  //发送统一验证码的绑定信息
  binddata(){
    let that=this
    let username= that.data.usersname
    let bpsw=that.data.psw
    console.log(username+" "+bpsw)
    
    wx.showLoading({
      title:"绑定中"
    })

    wx.request({
      url: 'http://127.0.0.1:8200',
      data: {
        type: "checkuser",
        username:username,
        password:bpsw,
        usersname: app.globalData.usersname,
        key: app.globalData.keyfromservice,
      },
      
      success: function (res) {
        wx.hideLoading()
        let that = this
        if (res.data == "ok") {
          app.globalData.hasband=true
          wx.setStorage({
            key: 'hasband',
            data: true,
          })
          
        } else {
          wx.showToast({
            title: '服务器忙请稍后再试',
            icon:'none',
            duration:3000
          })
        }
      },

      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '网络异常请检查网络连接！',
          icon: 'none',
          duration: 3000
        })

      }


    })
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