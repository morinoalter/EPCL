var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     deskIndex:0,
     accnt:0,
     notshowcode:true,
     currentIndex:0,
     daylyquestion:{},
     questionlist:[],
     ranklist:[]
  },
  //显示我的代码
  showcode(){
    this.setData({
       notshowcode:false
    })
 },

  //页面切换
   activeNav(e){
     this.setData({
       deskIndex:e.target.dataset.index,
       currentIndex:e.target.dataset.index
     })
   },
   pageschange(e){
     this.setData({
       deskIndex: e.detail.current
     })
   },
   //计算AC数
   getaccnt(){
      let that=this
      var cnt=0
      for (var i=0;i<that.data.questionlist.length;i++)
         if(!that.data.questionlist.complete==="not Accepted")cnt++;
      that.setData({accnt:cnt})
    },

  //获取每日一题
  getdaylyquestion(){
    let that=this
     wx.request({
       url: app.globalData.urloj,
       data:{
         type:"daydayproblem",
         username:app.globalData.usersname,
         key:app.globalData.keyfromservice
       },
       success(res){
      
          if (res.data.retmsg=="ok"){
              console.log("每日题get")
             that.setData({
               daylyquestion:res.data
             })
          }else{
             console.log("服务器错误"+res.retmsg)
          }
       },
       fail(res){
            console.log(res)
       }
     })
  },

  //获取题目列表
  getquestionlist(){
    let that=this
    wx.request({
      url: app.globalData.urloj,
      data: {
        type: "getproblemlist",
        username: app.globalData.usersname,
        key: app.globalData.keyfromservice
      },
      success(res) {
        if (res.data.retmsg == "ok") {
          console.log("题目列表get")
          console.log(res)
          that.setData({
            //把题目列表赋值
            questionlist:res.data.args
          })
          that.getaccnt()
          
        } else {
          console.log("服务器错误" + res.retmsg)
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  
  //获取排名
  getuserrank(){
    let that = this
    wx.request({
      url: app.globalData.urloj,
      data: {
        type: "getuserrank",
        username: app.globalData.usersname,
        key: app.globalData.keyfromservice
      },
      success(res) {
     
        if (res.data.retmsg == "ok") {
          console.log("排名列表get")
          that.setData({
            ranklist: res.data.args
          })
         
        } else {
          console.log("服务器错误" + res.retmsg)
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  
  //前往题目详情
  toprogrampage(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../problem/problem?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       let that=this
       that.getdaylyquestion()
       that.getquestionlist()
       that.getuserrank()
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
    this.onLoad()
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