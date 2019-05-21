// pages/shellSeting/shellSeting.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     redtap:false,
     greentap:false,
     yellowtap:false,
     bluetap:false
  },
  tap(e){
    let that=this
    let coll=e.currentTarget.dataset.id
    that.data.redtap=false
    that.data.bluetap=false
    that.data.greentap=false
    that.data.yellowtap=false
    
    if(coll=='red')  {
       that.data.redtap=true
       app.globalData.style='red'
    }

    if(coll=='blue'){
    that.data.bluetap=true
    app.globalData.style='blue'
    }
    if(coll=='yellow')  {
    
    that.data.yellowtap=true
    app.globalData.style='yellow'
    }
    
    if(coll=='green')  {
    that.data.greentap=true
    app.globalData.style='green'
  }
  
    that.setData({
      redtap:that.data.redtap,
      bluetap:that.data.bluetap,
      yellowtap:that.data.yellowtap,
      greentap:that.data.greentap,
    })
   
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let coll=app.globalData.style
    that.data.redtap=false
    that.data.bluetap=false
    that.data.greentap=false
    that.data.yellowtap=false
    
    if(coll=='red')  {
       that.data.redtap=true
       app.globalData.style='red'
    }

    if(coll=='blue'){
    that.data.bluetap=true
    app.globalData.style='blue'
    }
    if(coll=='yellow')  {
    
    that.data.yellowtap=true
    app.globalData.style='yellow'
    }
    
    if(coll=='green')  {
    that.data.greentap=true
    app.globalData.style='green'
  }
  
    that.setData({
      redtap:that.data.redtap,
      bluetap:that.data.bluetap,
      yellowtap:that.data.yellowtap,
      greentap:that.data.greentap,
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    



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