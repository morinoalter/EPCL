var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usersname:'',
    psw:'',
    psw2:'',
    tag:'',
    tagcnt:'0',
    userid_focus:false,
    passwd_focus:false,
    passwd2_focus:false,
    tagbag:[
      {name:"C++",beentap:false},
      {name:"Java",beentap:false},
      {name:"Python",beentap:false},
      {name:"前端",beentap:false},
      {name:"后端",beentap:false},
      {name:"Javascript",beentap:false},
      {name:"机器学习",beentap:false}
    ],
    tagtoindex:[
      {"C++":0},
      {"Java":1},
      {"Python":2},
      {"Javascript":3},
      {"前端":4},
      {"后端":5},
      {"机器学习":6}
    ]
  },
  //获取输入框内容
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
  getpsw2(e) {
    let that = this
    that.setData({
      psw2: e.detail.value
    })
  },
  //点击tag的事件
  taptag(e){
    let that=this
    console.log(that.data.tagbag[e.currentTarget.dataset.id].name)
    //不能选了
    if (!that.data.tagbag[e.currentTarget.dataset.id].beentap && that.data.tagcnt==3){
      wx.showToast({
        title: 'TAG最多可选三项',
        icon: 'none',
        duration: 3000
      })   //是取消
    }else{
       if(that.data.tagbag[e.currentTarget.dataset.id].beentap){
        that.data.tagbag[e.currentTarget.dataset.id].beentap =false;
        that.data.tagcnt--;  //添加tag
       } else{ 
        that.data.tagbag[e.currentTarget.dataset.id].beentap=true;
        that.data.tagcnt++;
       }  

    }
  
    that.setData({
      tagbag:that.data.tagbag,
      tagcnt:that.data.tagcnt
    })
  },



 

  //注册按钮--实际request
  rig(){
    let that=this
    
    if(that.data.usersname=='' || that.data.psw=='' || that.data.psw2==''||that.data.tagcnt==0){
      wx.showToast({
        title: '请确认信息填写完整！',
        icon: 'none',
        duration: 3000
      })
    }else{
    if (!(that.data.psw===that.data.psw2)){
      wx.showToast({
        title: '两次密码不同！',
        icon: 'none',
        duration: 3000
      })

    }else{

    //生成tag字符串
    var st=[]
    for(var i=0;i<7;i++)
     if (that.data.tagbag[i].beentap)st.push(that.data.tagbag[i].name)
    
    that.setData({tag:st})
    console.log(that.data.tag)

    wx.request({
      url: app.globalData.urlhttps,
      data:{
        type:"register",
        usersname:that.data.usersname,
        password:that.data.psw,
        tag:that.data.tag
      },
      success:function(res){
         if (res.data=="ok"){
            wx.showToast({
              title: '注册成功',
              icon:'none',
              duration:3000
            })
            wx.reLaunch({
              url: '../login/login',
            })
         }else{
            wx.showToast({
              title: '服务器忙请稍后再试',
              icon:'none',
              duration:3000
            })
         }
      },
      fail:function(res){
        wx.showToast({
          title: '网络异常!请检查网络连接',
          icon: 'none',
          duration: 3000
        })
      }
    })
    }
    }

  },
  
  //实现选取的输入项边缘发光
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id =='passwd2'){
        this.setData({
          'passwd2_focus':true
        })
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
      }else if (e.target.id == 'passwd2') {
        this.setData({
          'passwd2_focus': false
        });
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