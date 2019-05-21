// pages/news/news.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     deskIndex: 0,
     currentIndex: 0,
      newslist:[],
      newscnt:[0,0,0,0,0,0,0,0],
      tagtoindex:
        {"C++":"c1",
         "Java":"c2",
         "Python":"c3",
         "Javascript":"c4",
         "前端":"c5",
         "后端":"c6",
         "机器学习":"c7"}
      
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
  //获取咨询列表
  getnews(){
    let that = this
    that.setData({
      newslist:[{
        name:"baidu",
        time:"一月一日",
        link:"https://www.baidu.com/",
        tag:"C++"
      }, 
      {
        name: "cnblogs",
        time: "一月一日",
        link: "https://www.cnblogs.com/dashucoding/p/9970296.html",
        tag: "前端"
        },
        {
          name: "cnblogs",
          time: "一月一日",
          link: "https://www.cnblogs.com/dashucoding/p/9970296.html",
          tag: "Java"
          },
          {
            name: "cnblogs",
            time: "一月一日",
            link: "https://www.cnblogs.com/dashucoding/p/9970296.html",
            tag: "Python"
            },
            {
              name: "cnblogs",
              time: "一月一日",
              link: "https://www.cnblogs.com/dashucoding/p/9970296.html",
              tag: "后端"
              },
              {
                name: "cnblogs",
                time: "一月一日",
                link: "https://www.cnblogs.com/dashucoding/p/9970296.html",
                tag: "机器学习"
                },
                {
                  name: "cnblogs",
                  time: "一月一日",
                  link: "https://www.cnblogs.com/dashucoding/p/9970296.html",
                  tag: "Javascript"
                  },
      ]
    })
    console.log("culi")
    that.getcnt()

     wx.request({
       url: app.globalData.urlhttps,
       data:{
           type:"getnews",
           usersname: app.globalData.usersname,
           key: app.globalData.keyfromservice
       },
       //成功收到回复
       success:function(res){
         
          //判断成功与否
          if(res.data.retmsg=="ok"){
             that.setData({
                 newslist:res.data.args
             })
             that.getcnt()
          }else{
            wx.showToast({
              title: '服务器忙请稍后再试',
              icon: 'none',
              duration: 3000
            })
          }
       },
       //request失败直接输出问题
       fail:function(res){
         wx.showToast({
           title: '网络异常！',
           icon: 'none',
           duration: 3000
         })
       }
     })
  }
  ,
  //计算各种新闻数目
  getcnt(){
    let that=this
    that.data.newscnt=[0,0,0,0,0,0,0,0]
    that.data.newscnt[0]=that.data.newslist.length
    for (var i=0;i<that.data.newslist.length;i++){
      switch (that.data.newslist[i].tag){
          case "C++":
             that.data.newscnt[1]++;
             that.data.newslist[i].toindex=that.data.tagtoindex["C++"]
             break;
          case "Java":
             that.data.newscnt[2]++;
             that.data.newslist[i].toindex=that.data.tagtoindex["Java"]
             break;
          case "Python":
             that.data.newscnt[3]++;
             that.data.newslist[i].toindex=that.data.tagtoindex["Python"]
             break;
          case "Javascript":
             that.data.newscnt[4]++;
             that.data.newslist[i].toindex=that.data.tagtoindex["Javascript"]
             break;
          case "前端":
             that.data.newscnt[5]++;
             that.data.newslist[i].toindex=that.data.tagtoindex["前端"]
             break;
          case "后端":
             that.data.newscnt[6]++;
             that.data.newslist[i].toindex=that.data.tagtoindex["后端"]
             break;
          case "机器学习":
             that.data.newscnt[7]++;
             that.data.newslist[i].toindex=that.data.tagtoindex["机器学习"]
             break;
      }
    }

    console.log(that.data.newscnt)
    console.log(that.data.newslist)
    that.setData({
          newscnt:that.data.newscnt,
          newslist:that.data.newslist
    })  
  },
  //点击转向咨询详情页面
  tonewspage(e){
       wx.navigateTo({
         url: '../newspage/newspage?link=' + e.currentTarget.dataset.link
       })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //启动时获取新闻信息
    this.getnews()
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
    this.getnews()
    console.log("我刷新了");
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