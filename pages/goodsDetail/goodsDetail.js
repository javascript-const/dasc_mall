// pages/goodsDetail/goodsDetail.js
let {
  requestApi
} = require("../../utils/request.js")
const app = getApp()
var wxParse = require("../../wxParse/wxParse")
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    goods_id: "",
    goodsDetails: [],
    goodsDetailsContent: {},
    oH: "",
    showMask: false,
    animationdata: "",
    wxParseData: "",
    page: 1,
    getGoodsGuess: [],
    buynum: 1
  },
  closeMask() {
    this.setData({
      showMask: false,
    })
  },
  showMask() {
    var animationObj = wx.createAnimation({
      delay: 0,
      duration: 200,
      timingFunction: "linear"
    })
    animationObj.translateY(280).step()
    this.setData({
      showMask: true,
      animationdata: animationObj.export()
    })

    setTimeout(() => {
      animationObj.translateY(0).step()
      this.setData({
        animationdata: animationObj.export(),
      })
    }, 12)

  },
  getGoodsDetails(goods_id) {
    requestApi(app.globalData.base_url + "/goods/show", {
      goods_id: goods_id,
      warehouse_id: 0,
      area_id: 0,
      is_delete: 0,
      is_on_sale: 1,
      is_alone_sale: 1,
    }, "post").then(res => {
      this.setData({
        goodsDetailsContent: res.data.data,
        goodsDetails: res.data.data.gallery_list,
        wxParseData: res.data.data.goods_desc
      })
      wxParse.wxParse('article', 'html', this.data.wxParseData, this, 5)
    })
  },
  loadmore() {
    this.setData({
      page: ++this.data.page
    })
    this.getGoodsGuess(this.data.page)
  },

  getGoodsGuess(page) {
    wx.showLoading({
      title: '加载中',
    })
    requestApi(app.globalData.base_url + "/goods/goodsguess", {
      page: page,
      size: 10
    }, "post").then(res => {
      wx.hideLoading()
      // console.log(res);
      this.setData({
        getGoodsGuess: this.data.getGoodsGuess.concat(res.data.data)
      })
    })
  },
  changenum(e) {
    if (e.currentTarget.dataset.num == 0) {
      if (this.data.buynum <= 1) {
        this.setData({
          buynum: 1
        })
      } else {
        this.setData({
          buynum: --this.data.buynum
        })
      }
    } else {
      this.setData({
        buynum: ++this.data.buynum
      })
    }
  },
  addCart() {
    var goods = this.data.goodsDetailsContent;
    goods.isSelect = true;
    goods.buynum = this.data.buynum;
    console.log(goods);
    var gid = this.data.goods_id;
    var cartDatas = wx.getStorageSync("carts") || []
    console.log(cartDatas);
    if (cartDatas.length > 0) {
      var index = cartDatas.findIndex((value) => {
        return value.goods_id == gid
        
      })
      console.log(index);
      
      if (index!=-1&&cartDatas[index].goods_id == gid) {
        cartDatas[index].buynum = cartDatas[index].buynum + this.data.buynum
        try {
          wx.setStorageSync('carts', cartDatas)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          this.closeMask()
        } catch (error) {
          console.log(err);
          wx.showToast({
            title: '添加失败',
            icon: 'error',
            duration: 2000
          })
        }
        
        return;
      }
      cartDatas.unshift(goods)

    } else {
      cartDatas.unshift(goods)
      this.closeMask()
    }

    wx.setStorageSync('carts', cartDatas)
    console.log(cartDatas);
    
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsGuess(this.data.page)
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          oH: result.windowHeight
        })
      },
    })
    this.setData({
      goods_id: options.goods_id
    })
    this.getGoodsDetails(this.data.goods_id)
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