// pages/goodsList/goodsList.js
let {
  requestApi
} = require("../../utils/request.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cat_id: 1,
    page: 1,
    oH: "",
    goodsListDatas: [],
    navlist: ["综合", "新品", "销量", "价格", "筛选"],
    itemIndex: "",
    sort: "goods_id",
    sortarr: ["goods_id", "last_update", "sales_volume", "shop_price", ""]
  },
  changeitem(e) {
    this.setData({
      itemIndex: e.currentTarget.dataset.id,
      sort: this.data.sortarr[e.currentTarget.dataset.id]
    })
    console.log(this.data.itemIndex);

    console.log(this.data.sort);
    this.getGoodsList(this.data.cat_id, "", "", 1, this.data.sort)
  },
  getGoodsList(cat_id, min, max, page, sort) {
    wx.showLoading({
      title: '加载中',
    })
    requestApi(app.globalData.base_url + "/catalog/goodslist", {
      cat_id: cat_id,
      warehouse_id: 0,
      area_id: 0,
      min: min,
      max: max,
      goods_num: 0,
      size: 10,
      page: page,
      sort: sort,
      order: "desc",
      self: 0,
    }, "post").then(res => {
      wx.hideLoading()
      if (page > 1) {
        this.setData({
          goodsListDatas: this.data.goodsListDatas.concat(res.data.data)
        })
      } else {
        this.setData({
          goodsListDatas: res.data.data,
        })
      }

    })
  },
  loadmore() {
    this.setData({
      page: ++this.data.page
    })
    this.getGoodsList(this.data.cat_id, "", "", this.data.page, this.data.sort)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cat_id: options.cat_id
    })
    this.getGoodsList(this.data.cat_id, "", "", this.data.page, this.data.sort)
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