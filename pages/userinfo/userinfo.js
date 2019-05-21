// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      usersname:"",
      usersgrad:""
  },
  //获取昵称年龄
  renew(){
    let that=this
    let lin = wx.getStorage({key:'nickname'})
    let lin2 = wx.getStorage({key:'usersgrad'})
    if (lin == undefined) lin = "未设定"
    if (lin2 == undefined) lin2 = "未设定"

    that.setData({
      usersname: lin,
      usersgrad: lin2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.renew()
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
   this.renew()
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
   this.renew()
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