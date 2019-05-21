// pages/classinfo/classinfo.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      classinfo:[],
      options:{}
  },

  //
  getcaurselist(){
      let that = this

      //临时
      console.log("getlist")
      that.setData({
        classinfo:[{classname: "课程名1",
        teacher:"老师1",
        misnumber:"0",
        classid:"0"
       },
       { classname: "课程名2",
         teacher: "老师2",
         misnumber: "2",
         classid: "1"
       }]

      })
      //临时
      
      wx.request({
        url: app.globalData.urlhttps,
        data: {
          type: "getcourselist",
          usersname: app.globalData.usersname,
          key:       app.globalData.keyfromservice
        },
        //成功收到回复
        success: function (res) {
          
          //判断成功与否
          if (res.data.retmsg == "ok") {
            that.setData({
              classinfo:res.data.args
            })
          } else {
            wx.showToast({
              title: '服务器忙请稍后再试',
              icon: 'none',
              duration: 3000
            })
          }
        },
        //request失败直接输出问题
        fail: function (res) {
          wx.showToast({
            title: '网络异常！',
            icon: 'none',
            duration: 3000
          })
        }
      })
    
  } ,
  //进入课程详情
   toclasspage(e){
        let that=this
        console.log(e.currentTarget.dataset.name)
        wx.navigateTo({
          url: '../classpage/classpage?id=' + e.currentTarget.dataset.link+'&name='+e.currentTarget.dataset.name
        })


   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
     console.log("load")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("imready")
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("imshow")
    let that=this
    that.getcaurselist()
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