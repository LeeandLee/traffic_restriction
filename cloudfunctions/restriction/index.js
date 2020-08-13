// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  //必须用八位数字作为唯一参数，才能保证函数的简洁有效
  // console.log(event)
  // return [1,1]
  // 这里有个很典型的异步问题，直接使用return，会返回undefined
return new Promise((resolve, reject)=>{
  db.collection(event.area).where({
    checkdate: event.checkdate
  }).get().then(res => {
    if (res.data.length != 0) {
      resolve(res.data[0].num)
    } else {
      var day = new Date(event.checkdate).getDay()
      var restrNum = []
      switch (day) {
        case 1:
          restrNum = [1, 6];
          break;
        case 2:
          restrNum = [2, 7];
          break;
        case 3:
          restrNum = [3, 8];
          break;
        case 4:
          restrNum = [4, 9];
          break;
        case 5:
          restrNum = [5, 0];
          break;
        default:
          restrNum = [];
      }
      console.log(restrNum)
      // 不知道为啥，这个return一直返回不过去
      resolve(restrNum) 
    }
  })
})



}