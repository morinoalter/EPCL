var app=getApp()


Page({
  name:"333",
  /**
   * 页面的初始数据
   */
  data: {
    deskIndex: 0,
    currentIndex: 0,
    classdescreption:'',
    classid:'',
    notice:[],
    modalhidden:true,
    noticetime:"",
    noticecontent:""
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
  
  //获取课程简介,公告
  getclassdes(){
    let that = this
      that.setData({
        classdescreption:'  软件是一种人类思维的逻辑建造物，其经历了一个从无结构到结构化的发展过程。\n\n1946年诞生的世界上第一台计算机ENIAC由于没有专门的可以保存程序的存储器，只能通过记录有程序和数据的卡片(punch card)或較後期的打孔纸带的方式将机器指令读入计算机中进行计算。那时的程序就是若干条机器指令所组成的一段顺序执行的计算指令。再由于当时的程序的规模与复杂性度的有限，人们对于软件的体系结构并没有较明确的认识。在这个阶段我们可以把它称为软件的无结构化时代。\n\n在20世纪的50年代至60年代早期里，随着汇编语言以及FORTRAN、COBOL等早期的高级语言的出现，人们发现运用goto语句可以设计出除简单的顺序结构之外的分支和循环的程序结构，以及引入子程序可以在软件的若干个程序之间形成主-子程序的调用/被调用结构。但人们发现使用goto语句会使程序出现一个入口却多个出口，特别是在是当软件的规模和复杂度提高到一定程度后，使用过多的goto语句会损害了软件的结构，使得软件的运行变得难以捉摸，软件的调试与维护也变得非常困难。在这个时期，人们对软件的结构是在语句和程序层面上考虑软件的体系结构。也就是从这个时期，软件的结构化时代开始进入了初级阶段。\n\n在进入20世界的70年代后，对于软件的结构人们进行了更多的思考，并提出了概念完整性、结构化程序设计、模块化、信息隐藏和封装等面向结构的软件开发思想与方法，这标志着软件全面地进入了结构化的时代。在面向结构的软件开发时代，软件以语句组成模块，模块的聚集和嵌套形成层层调用的软件体系结构。结构化编程思想的出现，使得人们在设计软件的体系结构时，可以从软件模块的层面上考虑软件的体系结构。\n\n20世纪的80年代，面向对象的思想出现并逐步发展替代了面向结构的软件开发思想，程序的数据结构与逻辑结构封装在一起形成抽象粒度更高的对象概念。对象之间通过继承与组合可以形成更为复杂的逻辑关系，软件的结构也变成了对象与对象之间的逻辑结构。Gof的《设计模式》一书更是系统的总结分析了在面向对象世界中的23种对象之间的逻辑结构。在面向对象的软件开发时代，人们开始从对象的角度考虑设计软件的体系结构。\n\n基于构件(也有人称为组件)的软件开发思想的出现，使得人们对于软件体系结构的设计变得更为的抽象与便利。使用可重用的软件构件，人们可以通过类似于组装的方式将若干个构件装配成一个软件系统。在这种软件开发模式下，软件开发的效率变得更高，人们可以选择使用各种各样的构件按照一定的装配方式得到满足特定需求的软件。构件是一种比对象抽象度更高的概念，基于构件的软件开发方式既是软件技术发展到一定程度的结果，也是人们对于软件的体系结构的认识与研究不断深入的必然产物。\n\n回顾软件从无结构到结构化的这么一个发展历程，正如人类建造历史地发展一样。人类开始使用树枝、树叶及泥等原始的材料建造房屋，对于原始人类讲建筑只是为了满足基本的生存庇护之需要。正如软件发展的初期，软件的设计开发基于机器指令和汇编语句，仅是为了满足某些特定领域如科学研究的计算需要，也因此没有过多结构的设计考虑。结构化和面向对象软件开发时代是以砖、瓦、灰、沙、石、预制梁、柱、屋面板建造建筑物，而以整面墙、整间房、一层楼梯的预制件来组合建造房屋则是进入了面向构件的软件开发时代。从指令、语句、主程序-子程序、模块、对象和构件，人们用于构筑软件这一逻辑建筑物的“材料”在不断的变化，反映了人们对软件的组成结构元素的抽象认识不断提高和软件的开发方法不断进步的过程。\n\n在软件工程领域，软件体系结构已成为软件科学家和软件工程师们研究与实践的一个新领域。对软件的体系结构进行研究，可以更好的帮助人们认识与设计软件的结构以及改进软件开发的方法与过程，并对于提高软件开发的效率与软件的质量也都有着极为重要的作用。'
        ,notice:[{ notice: "公告",
        time:"11:11",
        hasread: false
      },{
        notice: "公告aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        time: "22:11",
        hasread: true
      }, {
        notice: "公告",
        time: "22:11",
        hasread: true,
      }]       
      })
     that.dealnotice()
   
      
     
      wx.request({
        url: app.globalData.urlhttps,
        data:{
          type:'getcourseinfo',
          usersname: app.globalData.usersname,
          key: app.globalData.keyfromservice,
          id:that.data.classid
        },
        success:function(res){
              if(res.data.retmsg=='ok')
              { that.setData({
                classdescreption: res.data.classdescription,
                 notice:res.data.classnotice
               })
              }
              else{
                wx.showToast({
                  title: '服务器忙请稍后再试',
                  icon: 'none',
                  duration: 3000
                })

              }
        },
        fail:function(res){
          wx.showToast({
            title: '网络异常！',
            icon: 'none',
            duration: 3000
          })
        }
      })

  },
  //处理公告
  dealnotice(){
    let that=this
    for (var i=0;i<that.data.notice.length;i++)
    {  if(that.data.notice[i].notice.length<10){
           that.data.notice[i].noticemini=that.data.notice[i].notice
          } else{
            that.data.notice[i].noticemini=that.data.notice[i].notice.slice(0,10)+"…"
          }
    }
    that.setData({
      notice:that.data.notice
    })
   
  },

  //显示公告详情
  makenotice(e){
    let that=this
    let ind = e.currentTarget.dataset.id

     that.setData({
        noticetime:that.data.notice[ind].time,
        noticecontent:that.data.notice[ind].notice
     })
     that.setData({
       modalhidden:false
     })
  },

  //隐藏modal
  hidemodal(){
     let that=this
     that.setData({
        modalhidden:true
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this
     wx.setNavigationBarTitle({
      title: options.name
    })
     that.setData({
          classid:options.id
     })
     that.getclassdes()
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
    var pages =getCurrentPages()
    var prevPage =pages[pages.length - 2];  //上一个页面
    console.log("c lose")
    prevPage.onLoad()
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