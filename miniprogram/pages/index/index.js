// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日期数据
    todayObj: {},
    // 今日限行的两张照片地址
    imgOne: null,
    imgTwo: null,
    // 下方选择的限行照片
    imgOne_s: null,
    imgTwo_s: null,
    // 用于显示周末不限行的照片
    imgHidden: true,
    imgHidden02: true,
    pickerDate: '',
    // picker是否已经选择，决定下面的是不是显示
    ifCheck: false,
    checkObj:{},
    area:"zhengzhou"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dayObj = new Date()
    var year = dayObj.getFullYear()
    var month = dayObj.getMonth() + 1
    var date = dayObj.getDate()
    var day = dayObj.getDay()
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    var week = weeks[day]
    // 做个集合封装起来，更合理
    // 这里犹豫一下，到底是传8位的数字进去再判断好，还是传集合进去好
    var todayObj = {
      year: year,
      month: month,
      date: date,
      week: week,
      day: day
    }
    // todayObj用于前端代码的简洁
    this.setData({
      todayObj: todayObj
    })

    // 整理数据,改为YYYY-MM-DD的格式
    if (month < 10) {
      this.data.todayObj.month = "0" + this.data.todayObj.month;
    }
    if (date < 10) {
      this.data.todayObj.date = "0" + this.data.todayObj.date;
    }
    var checkdate = this.data.todayObj.year + "-" + this.data.todayObj.month + "-" + this.data.todayObj.date
    var area = this.data.area
    wx.cloud.callFunction({
      name: "restriction",
      data: {
        checkdate,
        area
      }
    }).then(res => {
      console.log(res)

      if (res.result.length != 0) {
        // 除了周末之外的时间
        this.setData({
          imgOne: res.result[0],
          imgTwo: res.result[1],
          imgHidden: true
        })
      } else {
        // 周末返回的的数据为空，将图片显示的开关置到false
        this.setData({
          imgHidden: false
        })
      }

    })

  },
  bindDateChange: function (e) {
    console.log(e)
    var checkdate = e.detail.value
    // 用于前端显示
    var dayObj = new Date(checkdate)
    var year = dayObj.getFullYear()
    var month = dayObj.getMonth() + 1
    var date = dayObj.getDate()
    var day = dayObj.getDay()
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    var week = weeks[day]

    var checkObj = {
      year: year,
      month: month,
      date: date,
      week: week,
      day: day
    }
    // todayObj用于前端代码的简洁
    this.setData({
      checkObj: checkObj
    })
    
    var area = this.data.area
    wx.cloud.callFunction({
      name: "restriction",
      data: {
        checkdate,
        area
      }
    }).then(res => {
      this.setData({
        ifCheck: true
      })
      if (res.result.length != 0) {
        // 除了周末之外的时间
        this.setData({
          imgOne_s: res.result[0],
          imgTwo_s: res.result[1],
          imgHidden02: true,
        })
      } else {
        // 周末返回的的数据为空，将图片显示的开关置到false
        this.setData({
          imgHidden02: false
        })
      }
    })
  }
})