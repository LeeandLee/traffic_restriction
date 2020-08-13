
Page({
  data: {
  },
  onchange_number:function(e){
    console.log(e)
    var a= e.detail.value.match(/\d/).join('')
    console.log(a)
  }
})