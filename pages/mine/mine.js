// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask:true,
  },
  toLogin(){
    this.setData({
      showMask:false
    })
  },
  closeMask(){
    this.setData({
      showMask:true
    })
  },
  getUserInfoFn(e){  //获取用户信息
    console.log(111);
    
    console.log(e.detail.userInfo);
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success:(res)=>{
        console.log(res.authSetting["scope.userInfo"]);
        if(res.authSetting["scope.userInfo"]){
          wx.getUserInfo({
            lang: "zh_CN",
            success:(res)=>{
              var userInfo=res.userInfo
              var nickName=userInfo.nickName
              var avatarUrl=userInfo.avatarUrl
              var gander=userInfo.gender
              var province=userInfo.province
              var city=userInfo.city
              var country=userInfo.country
              wx.login({
                timeout: 5000,
                success:(res)=>{
                  console.log(res.code);
                  
                } 
              })
            }
          })
        }
      }
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