// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oH:"",
    cartDatas:[],
    isSelectAll:false,
    totalPrice:0
  },
changeicon(e){
  var index=e.currentTarget.dataset.index;
  var cartDatas=this.data.cartDatas
  console.log(cartDatas);
  
  var isSelect=cartDatas[index].isSelect
  cartDatas[index].isSelect=!isSelect
    this.setData({
      cartDatas:cartDatas
    })
  var arr=[]
  for(var i=0;i<cartDatas.length;i++){
    if(cartDatas[i].isSelect){
      arr.push(cartDatas[i])
    }
  }
  if(arr.length==cartDatas.length){
    this.setData({
      isSelectAll:true
    })
  }else{
    this.setData({
      isSelectAll:false
    })
  }
  this.totalPrice()
},
reduceNum(e){
    var index=e.currentTarget.dataset.index
    var cartDatas=this.data.cartDatas
    var buynum=cartDatas[index].buynum
    cartDatas[index].buynum=--buynum
    this.setData({
      cartDatas:cartDatas
    })
    this.totalPrice()
  },
  increaseNum(e){
      var cartDatas=this.data.cartDatas
      var index=e.currentTarget.dataset.index
      var buynum=cartDatas[index].buynum
      cartDatas[index].buynum=++buynum
      this.setData({
        cartDatas:cartDatas
      })
      this.totalPrice()
  },
  deletGoods(e){
    console.log(e);
    var index=e.currentTarget.dataset.index
    var cartDatas=this.data.cartDatas
    wx.showModal({
      title:"提示",
      content:"确定放弃该物品？",
      success:(res)=>{
        if(res.confirm){
          cartDatas.splice(index,1)
          this.setData({
            cartDatas:cartDatas
          })
        }
      }
    })
    this.totalPrice()
  },
  selectAll(){
    var cartDatas=this.data.cartDatas
    var isSelectAll=this.data.isSelectAll
    isSelectAll=!isSelectAll
    for(var i=0;i<cartDatas.length;i++){
      cartDatas[i].isSelect=isSelectAll
    }
    this.setData({
      cartDatas:cartDatas,
      isSelectAll:isSelectAll
    })
    this.totalPrice()
  },
  totalPrice(){
    var cartDatas=this.data.cartDatas
    try {
        wx.getStorageInfoSync("carts",cartDatas)
    } catch (error) {
        console.log(err);
        
    }
    var total=0
    for(var i=0;i<cartDatas.length;i++){
      if(cartDatas[i].isSelect){
        total+=cartDatas[i].shop_price*cartDatas[i].buynum
      }
      this.setData({
        totalPrice:total
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          oH:result.windowHeight
        })
      },
    })
    var cartList=wx.getStorageSync('carts')||[]
    var flag=cartList.every((value)=>{
      return value.isSelect==true
    })
    if(flag){
      this.setData({
        isSelectAll:true
      })
    }
    this.setData({
      cartDatas:cartList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      cartListDatas:wx.getStorageSync("carts")
    },()=>{
      this.totalPrice()
    })
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