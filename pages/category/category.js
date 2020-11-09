let {requestApi} =require("../../utils/request.js");
const app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    oH: "",
    cid: 858,
    Leftdatas: [],
    RightDatas: [],
    itemIndex: 0,
    arr: [],
    imgarr:[],
    bigimg:"https://x.dscmall.cn/storage/data/touch_catads/15630384831872.jpg",
    scrolltop:''
  },
  scrollchange(e){
    console.log(e);
    var index=++this.data.itemIndex
    if (index>6) {
      index=0
    }
    this.setData({
      itemIndex:index,
      cid:this.data.arr[index]
    })
    
    this.getRightitem(this.data.cid)
  },
  getIndex(e) {
    this.setData({
      itemIndex: e.currentTarget.dataset.index,
      cid: this.data.arr[e.currentTarget.dataset.index],
      bigimg:this.data.imgarr[e.currentTarget.dataset.index]
    })
    this.getRightitem(this.data.cid)
  },
  getLeftitem() {
    requestApi(app.globalData.base_url + "/catalog/list").then(res => {
      res.data.data.forEach((value) => {
        this.data.imgarr.push(value.touch_catads)
        this.data.arr.push(value.cat_id)
        
      })
      this.setData({
        Leftdatas: res.data.data
      })
    })
  },
  getRightitem(cid) {
    requestApi(app.globalData.base_url + "/catalog/list/" +cid).then(res => {
      // console.log(res);
      
      this.setData({
        RightDatas: res.data.data,
        scrolltop:0
      })
    })
  },
  loadMore(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLeftitem()
    this.getRightitem(this.data.cid)
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