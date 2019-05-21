// pages/mainpage/mainpage.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasband:'',
    mission_now:'暂无任务',
    ddl:'xx-xx',

    classmate_msg:[
      /*username:""
        time:""
        dosometing:""*/
    ],
    rollhight:0,
    windowHeight:0,
    
  },
  /**获取同学动态列表**/
   getClassmatemsgList(){
     let that = this 
         wx.request({
           url: app.globalData.urlhttps,
           data:{
             type:"link",
             usersname:app.globalData.usersname,
             key: app.globalData.keyfromservice
           },
           success:function(res){
             
                //判断接收到的信息 resmsg是ok,err还是bad
              if (res.data.retmsg=="ok"){
                that.setData({
                  classmate_msg:res.data.arg
                })
              }else{
                //有问题，出toast
                wx.showToast({
                  title: '服务器忙请稍后再试',
                  icon: 'none',
                  duration: 3000
                })

              }
           },
           fail:function(res){
             //请求失败
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
  bindfirst(){
     wx.showToast({
       title: '请绑定账号后再使用相关功能',
       icon: 'none',
       duration: 2000,
     })
  },

  
  //获取显示的最近任务
  getmisson(){
    let that = this

    wx.request({
      url: app.globalData.urlhttps,
      data: {
        type: "taskinfo",
        usersname: app.globalData.usersname,
        key: app.globalData.keyfromservice,
      },
      success: function (res) {
        
        if (res.data.retmsg == "ok") {
          that.setData({
             mission_now: res.data.taskmsg,
             ddl:res.data.ddl
          })
        } else {
          wx.showToast({
            title: '服务器忙请稍后再试',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络异常请检查网络连接！',
          icon: 'none',
          duration: 3000
        })
      }

    })

  },
  //更新band信息
  renewbind(){
    this.setData({
      hasband:app.globalData.hasband
    })
  },
  onLoad: function (options) {
  
    //这一段用来计算scall-view窗口的高度
    let that = this
    let query = wx.createSelectorQuery().in(this)
    query.select('.mission').boundingClientRect()
    query.select('.topage').boundingClientRect()
    query.select('.dong').boundingClientRect()
    query.exec((res) => {
      let h = res[0].height
      let hh = res[1].height
      let hhh = res[2].height
      let windowHeight = wx.getSystemInfoSync().windowHeight
      let rollhight = windowHeight - hhh - hh - h-10;
      that.setData({
        rollhight: rollhight,
      })
    })

     //获取绑定信息
  
      wx.getStorage({
        key: 'hasband',
        success: function(res) {
           that.setData({
              hasband:res.data
           })
        },
        fail:function(res){
           that.setData({
             hasband:false
           })
        }
      })

  

    //如果已经绑定过就获取动态信息
    if(that.data.hasband) that.getClassmatemsgList()
    if(that.data.hasband) that.getmisson()

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
    //重新显示时更新页面状态
    this.renewbind()
    if (this.data.hasband) this.getClassmatemsgList()
    if (this.data.hasband) this.getmisson()
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
    //下拉刷新
    if (this.data.hasband) this.getClassmatemsgList()
    if (this.data.hasband) this.getmisson()
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