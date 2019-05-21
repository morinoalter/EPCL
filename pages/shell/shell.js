//index.js
//获取应用实例
const app = getApp()
var thatptr = null;
var count = 0;

const pge = Page({
  data: {
    scolltop:0,
    style:'',
    socketopen: false,
    inputVaule: '',
    qurl: '',
    hostname: '129.28.139.189',
    port: '5030',
    protocal: 'ws',
    aimhostname: '129.28.139.189',
    aimusername: 'ubuntu',
    aimpassword: 'Qe4VL2bbSXINM',
    aimport: '22',
    endpoint: '',
    viewtext: ''
  },
  getscrolltop(){
    let that=this
    let query = wx.createSelectorQuery().in(that)
    query.select('#texx').boundingClientRect()
    query.exec((res) => {
      let h = res[0].height
    
      that.setData({
        scolltop: h,
      })
      console.log(that.data.scolltop+"**")
    })
  }
  ,
  onLoad() {
     this.setData({
         style:app.globalData.style
     })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    
    thatptr = this;
    new Promise(function (resolve, reject) {
      var endpoint = thatptr.data.protocal + '://' + thatptr.data.hostname + ':' + thatptr.data.port + '/wssh/' + thatptr.data.aimhostname + '/' + thatptr.data.aimusername + '?password=' + thatptr.data.aimpassword + '&port=' + thatptr.data.aimport
      resolve(endpoint)
    }).then(function (res) {
      thatptr.setData({
        endpoint: res
      })
    }).then(function (res) {
      wx.connectSocket({ url: thatptr.data.endpoint })
      wx.onSocketOpen(function (res) {
        thatptr.setData({ socketopen: true })
        console.log('链接成功!')
      })
      wx.onSocketClose(function (res) {
        thatptr.data.socketopen = false;
        console.log('神秘断开! ')
      })
      wx.onSocketMessage(function (res) {
        console.log(res)

        const temp = thatptr.data.viewtext
        let lin=res.data
   
        lin=lin.replace('\u001b]0;ubuntu@VM-0-6-ubuntu: ~\u0007','')
        lin=lin.replace('\u001b]0;ubuntu@VM-0-6-ubuntu: /home\u0007','')
        lin=lin.replace('\u001b[01;34m','')

        while(lin.indexOf('\u001b[01;34m')!=-1)
        lin=lin.replace('\u001b[01;34m','')

        while(lin.indexOf('\u001b[0m')!=-1)
        lin=lin.replace('\u001b[0m','')
        
        while(lin.indexOf('\u001b[01;31m')!=-1)
        lin=lin.replace('\u001b[01;31m','')

        while(lin.indexOf('\u001b[33m')!=-1)
        lin=lin.replace('\u001b[33m','')

        //\u001b]0;
        while(lin.indexOf('\u001b]0;')!=-1)
        lin=lin.replace('\u001b]0;','')
         
        


        thatptr.setData({
          viewtext: temp + lin
        })
        thatptr.getscrolltop()

        

        thatptr.setData({
          inputVaule: ''
        })

      })
      wx.onSocketError(function (res) {
        console.log('失败 ' + res.data)
      })
    })
  },
  commandChange: function (e) {
    this.setData({ inputVaule: e.detail.value })
  },
  sendoutClick: function (event) {
    thatptr = this
    if (thatptr.data.socketopen) {
      console.log('即将发送消息' + thatptr.data.inputVaule)
      wx.sendSocketMessage({
        data: JSON.stringify({ data: thatptr.data.inputVaule + '\n' })
      })
    } else {
      console.log('链接未打开，请检查链接设置')
    }
  },
 onShow(){
  this.setData({
    style:app.globalData.style
   })
 }
})


