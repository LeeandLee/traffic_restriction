
Page({
  data: {
    text:"000"
  },
  onShow:function(e){
    wx.cloud.callFunction({
      name:"getNum"
    }).then(res=>{
      console.log(res)
    })
  },
  onchange_number:function(e){
    console.log(e)
    // 把小写转为大写
    this.setData({
      text:e.detail.toUpperCase()
    })  
  },
  submit:function(e){
    wx.cloud.callFunction({
      name:"login",
      data:{
        number:this.data.text
      }
    }).then(res=>{
      console.log(res)
    })
  }
})