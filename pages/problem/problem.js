var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      myproblem:{},
      id:'',
      notshowcode:true
  },
  showcode(){
     this.setData({
        notshowcode:false
     })
  },
   //获取题目
   getproblem(){
     let that = this
     wx.request({
       url: app.globalData.urloj,
       data: {
         type: "getprobleminfo",
         usersname: app.globalData.usersname,
         key: app.globalData.keyfromservice,
         id:this.data.id
       },
       success(res) {
         
         if (res.data.retmsg == "ok") {
           console.log("题目信息get")
           that.setData({
             //题目信息
             myproblem: res.data
           })
           console.log(that.data.myproblem)
         } else {
           console.log("服务器错误" + res.retmsg)
         }
       },
       fail(res) {
         console.log(res)
       }
     })
   },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
       console.log(options.id)
       that.setData({
         id:options.id
       })
      
      //获取题目描述
    that.getproblem()
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