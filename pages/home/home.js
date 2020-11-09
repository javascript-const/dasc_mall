// pages/home/home.js
const app = getApp()
let {
  requestApi
} = require("../../utils/request.js")
Page({
  data: {
    params: {
      title: "大商创"
    },
    listDatas: [],
    newslist: ["服务店突破2000多家", "我们成为中国最大家电零售B2B2C系统", "三大国际腕表品牌签约", ],
    swiperList: ["/images/banner01.jpg", "/images/banner02.jpg", "/images/banner03.jpg", "/images/banner05.jpg", "/images/banner06.jpg"],
    lists: ["首页", "家用电器", "男装女装", "鞋靴箱包", "手机数码", "电脑办公", "家居家纺", "个人化妆"],
    itemIndex: 0,
    oColor: "",
    goodsList: "",
    navlist: {
      fristnav: "",
      secondnav: "",
      thridnav: ""
    },
    page: 1,
    oH: 0,
    hour: "",
    minute: "",
    second: "",
    timer: "",
    scrollitem: {
      scrollDatas: [],
      length: '',
      scrolltime: [],
      scrollflag: true
    },
    id: 27,
    public: {
      teambuy: [],
      length: 0,
    },
    publicItem: {
      public1: [],
      length1: 0,
    },
    publicItem2: {
      public1: [],
      length1: 0,
    },
    big: {
      bigScrollDatas: [],
      bgcolor: "rgb(204, 183, 161)",
      bigImg: "/images/background03.jpeg"
    },
    big1: {
      bigScrollDatas: [],
      bgcolor: "rgb(44, 77, 105)",
      bigImg: "/images/background04.jpeg"
    },
    store:{
      StoreGoodslist:[],
      goodListlength:""
    }
  },
  fn() {
    this.setData({
      "navlist.fristnav": this.data.goodsList.slice(0, 10),
      "navlist.secondnav": this.data.goodsList.slice(10, 20),
      "navlist.thridnav": this.data.goodsList.slice(20, 30)
    })
  },
  // 潮流科技
  getfristScroll() {
    requestApi(app.globalData.base_url + "/visual/checked", {
      number: 5,
      goods_id: "1221,1220,1223,1222,1219"
    }, "POST").then(res => {
      this.setData({
        "publicItem.public1": res.data.data,
        "publicItem.length1": res.data.data.length,
      })

    })
  },
  // 美妆个护
  getsecondScroll() {
    requestApi(app.globalData.base_url + "/visual/checked", {
      number: 6,
      goods_id: " 1200,1198,1197,1195,1201,1199"
    }, "POST").then(res => {
      this.setData({
        "publicItem2.public1": res.data.data,
        "publicItem2.length1": res.data.data.length,
      })

    })
  },
  // 品质服装
  getthirdScroll() {
    requestApi(app.globalData.base_url + "/visual/checked", {
      number: 6,
      goods_id: "1164,1159,1162,1166,1167,1168"
    }, "POST").then(res => {
      this.setData({
        "big.bigScrollDatas": res.data.data,
      })
    })
  },
  // 轻奢小调
  getfourScroll() {
    requestApi(app.globalData.base_url + "/visual/checked", {
      number: 6,
      goods_id: "1218,1217,1215,1214,1212,1213"
    }, "POST").then(res => {
      this.setData({
        "big1.bigScrollDatas": res.data.data,
      })
    })
  },
  // 轮播图下面的数据
  getlistDatas(page) {
    wx.showLoading({
      title: '加载中',
    })
    requestApi(app.globalData.base_url + "/goods/type_list", {
      page: page,
      size: 10,
      type: "is_best"
    }).then(res => {
      wx.hideLoading()
      console.log(res);
      
      this.setData({
        listDatas: this.data.listDatas.concat(res.data.data)
      })
    })
  },
  // 限时秒杀
  getTimegood() {
    requestApi(app.globalData.base_url + "/visual/visual_seckill?id={{this.data.id}}").then(res => {
      this.setData({
        "scrollitem.scrolltime": res.data.data.time_list,
        "scrollitem.scrollDatas": res.data.data.seckill_list,
        "scrollitem.length": res.data.data.seckill_list.length,
      })
    })
  },
  // 团购
  getTeambuy() {
    requestApi(app.globalData.base_url + "/visual/visual_team_goods").then(res => {
      this.setData({
        "public.teambuy": res.data.data,
        "public.length": res.data.data.length
      })
    })
  },
  // 店铺推荐
  getStoregoods(){
    requestApi(app.globalData.base_url + "/visual/store", {
      number: 10,
    }, "POST").then(res => {
      this.setData({
        "store.StoreGoodslist":res.data.data,
        "store.goodListlength":res.data.data.length
      })
    })
  },
  loadmore() {
    this.setData({
      page: ++this.data.page
    })
    this.getlistDatas(this.data.page)
  },
  changeIndex(e) {
    this.setData({
      itemIndex: e.currentTarget.dataset.id
    })
  },
  //  轮播图
  changeSwiper(e) {
    var arr = ["#f34646", "#e43124", "#3c81ff", "#028379", "#4091ff"]
    this.setData({
      oColor: arr[e.detail.current],
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  // 秒杀
  getTime() {
    let date = new Date()
    let nowdate = date.getTime()
    let endDate = new Date("2020-11-30 18:00:00");
    let endTime = endDate.getTime();
    let disTime = endTime - nowdate
    if (disTime > 0) {
      this.setData({
        hour: Math.floor(disTime / 1000 / 60 / 60 % 24),
        minute: Math.floor(disTime / 1000 / 60 % 60),
        second: Math.floor(disTime / 1000 % 60),
      })
    }
  },
  // 初始化函数
  InitFn() {
    this.getStoregoods()
    this.getfourScroll()
    this.getfristScroll()
    this.getsecondScroll()
    this.getthirdScroll()
    this.getTeambuy()
    this.getTimegood()
    this.data.timer = setInterval(this.getTime, 1000);
    this.getTime()
    this.getlistDatas(this.data.page)
    this.setData({
      oH: app.globalData.globalHeight
    })
    wx.request({
      url: 'https://x.dscmall.cn/api/visual/view',
      data: {
        id: 3,
        type: "index",
        device: "h5",
      },
      method: "POST",
      success: (res) => {
        this.setData({
          goodsList: JSON.parse(res.data.data.data)[3].data.list
        })
        this.fn()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.InitFn()
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