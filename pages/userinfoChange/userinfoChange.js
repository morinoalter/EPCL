var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['大一', '大二', '大三', '大四'],
    objectArray: [
      {
        id: 0,
        name: '大一'
      },
      {
        id: 1,
        name: '大二'
      },
      {
        id: 2,
        name: '大三'
      },
      {
        id: 3,
        name: '大四'
      }
    ],
    index: 0,

    tag:"",
    tagcnt:'0',

    nickname:"",
    psw:"",
    usersgrade:"",

    tagbag:[
      {name:"C++",beentap:false},
      {name:"Java",beentap:false},
      {name:"Python",beentap:false},
      {name:"前端",beentap:false},
      {name:"后端",beentap:false},
      {name:"Javascript",beentap:false},
      {name:"机器学习",beentap:false}
    ],
  },
  //获取年级
  bindPickerChange: function (e) {
    let that=this
    console.log('picker发送选择改变，携带值为', that.data.array[e.detail.value])
    this.setData({
      index: e.detail.value,
      usersgrade:that.data.array[e.detail.value]
    })
  },

  //获取输入框内容
  getnickname(e) {
    let that = this
    that.setData({
     nickname: e.detail.value
    })
  },
  getpsw(e) {
    let that = this
    that.setData({
      psw: e.detail.value
    })
  },

  //获取tag
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

  //点击更新按钮
  modi(){
     let that=this
     //生成tag字符串
    var st=[]
    for(var i=0;i<7;i++)
     if (that.data.tagbag[i].beentap)st.push(that.data.tagbag[i].name)
    
    that.setData({tag:st})
    console.log(that.data.tag)

     console.log(that.data.nickname+" "+that.data.usersgrade+" "+that.data.tag+" "+that.data.psw)
    if(that.data.nickname.length==0||
       that.data.psw.length==0||
       that.data.tagcnt==0){
        wx.showToast({
          title: '请填写完整信息！',
          icon:'none',
          duration:3000
        })
       }
     else{ wx.request({
       url: app.globalData.urlhttps,
       data:{
         type:"modifyinfo",
         usersname: app.globalData.usersname,
         key: app.globalData.keyfromservice,
         name: that.data.nickname,
         grade: that.data.usersgrade,
         tag: that.data.tag,
         password: that.data.psw   
       },
       success(res){
         
          if (res.data=='ok'){
             wx.showToast({
               title: '修改成功！',
               icon:'none',
               duration:3000
             })
             app.globleData.nickname=that.data.nickname
             app.globleData.usersgrade=that.data.usersgrade
             wx.setStorage({
               key: 'nickname',
               data: that.data.nickname,
             })
            wx.setStorage({
              key: 'usersgrad',
              data: that.data.usersgrade,
            })

          }else{
            wx.showToast({
              title: '服务器忙请稍后再试',
              icon: 'none',
              duration: 3000
            })
          }
       },
       fail(res){
         wx.showToast({
           title: '网络故障',
           icon: 'none',
           duration: 3000
         })
       }

       
     })
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