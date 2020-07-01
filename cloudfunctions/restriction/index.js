// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //必须用八位数字作为唯一参数，才能保证函数的简洁有效
  console.log(event)

  // 将限行的day拆开
  var day = new Date(event.checkdate).getDay()
  console.log(day)
  var restrNum = []
  switch (day) {
    case 0:
      ;
      break;
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
    case 6:
      ;
  }
  return restrNum

  // 此处留云数据库查找的空间

}