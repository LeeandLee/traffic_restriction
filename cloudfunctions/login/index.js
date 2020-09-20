// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  console.log(wxContext)

  db.collection("userInfo").where({
   openid: wxContext.OPENID
  }).get().then(res=>{
    console.log(res)
    // 长度为零，没有这个数据,新增
    if(res.data.length == 0){
      db.collection("userInfo").add({
        data:{
          _id:wxContext.OPENID,
          _openid: wxContext.OPENID,
          number:event.number
        }
      }).then(res=>{
        console.log("新增成功")
        console.log(res)
        return event.number
      })
    }
    // 有数据，需要更改
    else{
      db.collection('userInfo').doc(wxContext.OPENID).update({
        data:{
          number:event.number
        }
      }).then(res=>{
        console.log("更新成功")
        console.log(res)
        return event.number
      })
    }
  })
}