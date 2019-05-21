var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deskIndex: 1,
    currentIndex: 1,
    tapsearchValue:"",
    searchValue:"",
    missionlist:[],
    missionlistsou:[],
    modalhidden:true,
    noticeclass: "",
    noticeddl:'',
    noticetitle:'',
    noticecontent:''
    /*args:[
     { taskname:”任务名，string”,
       complete:”是否已完成bool,true-已完成”,
       ddl:”截止时间string”,
       course:”所属的课程名称string”,
       id:”任务的id”
     }
    */

  },
  //获取搜索字符
  getsv(e){
    let that = this
    that.setData({
      tapsearchValue: e.detail.value
    })
    console.log(this.data.tapsearchValue)
  },
  //点击搜索
  sou(){
    let that= this
    let keyword= that.data.tapsearchValue

    that.setData({
      searchValue:that.data.tapsearchValue
    })
    console.log(that.data.searchValue)
    
    if(that.data.searchValue.length==0){
       that.setData({
          missionlistsou:that.data.missionlist
       })
    }else{
      that.setData({missionlistsou:[]})
      for (var i=0;i<that.data.missionlist.length;i++)
          if (that.data.missionlist[i].taskname.indexOf(keyword)!=-1
          ||that.data.missionlist[i].ddl.indexOf(keyword)!=-1
          ||that.data.missionlist[i].course.indexOf(keyword)!=-1
          )
          that.data.missionlistsou.push(that.data.missionlist[i])
      that.setData({
         missionlistsou:that.data.missionlistsou
      })
      console.log(that.data.missionlistsou)

      }
    
  },

  //显示公告详情
  makenotice(e) {
    let that = this
    let ind = e.currentTarget.dataset.id
    console.log(ind);
    for (var i=0;i<that.data.missionlist.length;i++)
      if (that.data.missionlist[i].id===ind){
        that.data.noticetitle=that.data.missionlist[i].taskname
        that.data.noticeddl=that.data.missionlist[i].ddl
        that.data.noticeclass=that.data.missionlist[i].course
        that.data.noticecontent=that.data.missionlist[i].content
      }
       
    
    that.setData({
      noticetitle: that.data.noticetitle,
      noticeddl:  that.data.noticeddl,
      noticeclass:  that.data.noticeclass,
      noticecontent:that.data.noticecontent
    })
    that.setData({
      modalhidden: false
    })
  },
  //隐藏modal
  hidemodal() {
    let that = this
    that.setData({
      modalhidden: true
    })
  },

  //获取任务列表
  getmissionlist(){
     //临时
     let that=this
     that.setData({
       missionlist:[{taskname:"a",
        complete:true,
        ddl:"1-1",
        course:"十分范围法",
        id:"dsds",
        content:"ddd"
        },
        {taskname:"bbb",
        complete:true,
        ddl:"1-1",
        course:"十围法",
        id:"dsdss"
        },
        {taskname:"cccc",
        complete:false,
        ddl:"1-1",
        course:"十范围法",
        id:"dsd"
        }
        ]
     })
     //
     wx.request({
       url: app.globalData.urlhttps,
       data: {
         type: "gettasklist",
         usersname: app.globalData.usersname,
         key: app.globalData.keyfromservice,   
       },
       success:function(res){
        
         if (res.data.retmsg=="ok"){
            that.setData({
                 missionlist:res.data.args
            })
         }else{
           wx.showToast({
             title: '服务器忙请稍后再试',
             icon: 'none',
             duration: 3000
           })
         }
       },
       fail:function(res){
         wx.showToast({
           title: '网络异常请检查网络连接！',
           icon: 'none',
           duration: 3000
         })
       }
     })

  },

  //页面切换
  activeNav(e) {
    this.setData({
      deskIndex: e.target.dataset.index,
      currentIndex: e.target.dataset.index
    })
  },
  pageschange(e) {
    this.setData({
      deskIndex: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getmissionlist()
     this.sou()
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
    this.getmissionlist()
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