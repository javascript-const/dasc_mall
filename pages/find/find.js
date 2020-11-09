// pages/find/find.js
let {
  requestApi
} = require("../../utils/request.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oH: "",
    headList: ["社区", "店铺街", "视频"],
    CommunityDatas: [],
    getStore: [],
    itemIndex:""
  },
  changeIndex(e){
    console.log(e);
    this.setData({
      itemIndex:e.currentTarget.dataset.id
    })
    
  },
  changeItem(e){
    this.setData({
      itemIndex:e.detail.current
    })
  },
  getCommunity() {
    requestApi(app.globalData.base_url + "/discover/find_list?size=10&page=1").then(res => {
      this.setData({
        CommunityDatas: res.data.data
      })
      console.log(this.data.CommunityDatas);

    })

  },
  getStore() {
    requestApi(app.globalData.base_url + "/goods/goodsvideo", {
      size: 10,
      page: 1,
      sort:"goods_id",
      order: "desc"
    },"post").then(res => {
      
      this.setData({
        getStore:res.data.data
      })
      
console.log(this.data.getStore);

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStore()
    this.getCommunity()
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          oH: result.windowHeight
        })
      },
    })
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