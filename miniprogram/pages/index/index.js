// pages/index.js
const app = getApp();
import {
  config
} from "../../utils/config";
const db = wx.cloud.database({
  env: config.EnvID
})
Page({
  data: {
    second: 600,
    seconded: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    ReserveState: true,
   
    roomList: [{
        "storey": "学生宿舍 6-8 楼 ",
        "floor": "一 层",
        "room": "6-1-4",
        "note": "请在使用完之后将房间打扫干净",
        "time": "2021-01-02 14:00"
      },
      {
        "storey": "学生宿舍 6-8 楼 ",
        "floor": "一 层",
        "room": "6-1-4",
        "note": "请在使用完之后将房间打扫干净",
        "time": "2021-01-02 14:00"
      }, {
        "storey": "学生宿舍 6-8 楼 ",
        "floor": "一 层",
        "room": "6-1-4",
        "note": "请在使用完之后将房间打扫干净",
        "time": "2021-01-02 14:00"
      },
      {
        "storey": "学生宿舍 6-8 楼 ",
        "floor": "一 层",
        "room": "6-1-4",
        "note": "请在使用完之后将房间打扫干净",
        "time": "2021-01-02 14:00"
      },
      {
        "storey": "学生宿舍 6-8 楼 ",
        "floor": "一 层",
        "room": "6-1-4",
        "note": "请在使用完之后将房间打扫干净",
        "time": "2021-01-02 14:00"
      },
    ],
    list: [],
    multiArray: [
      ['雁塔校区', '长安校区'],
      ['学生6-8', '学生3-5', '学生1-2', '小粉喽'],
      ['一层']
    ],
    multiIndex: [0, 0, 0],
  },
  onLoad() {
    this.ReserveHistory()
  },
  btnReserve(e) {
    let ReserveState = !(this.data.ReserveState)
    console.log(e)
    console.log(ReserveState)
    this.setData({
      ReserveState: ReserveState
    })
    db.collection('ReserveHistory').add({
      data: {
        ReserveRoom: this.data.multiIndex,
        addtime: db.serverDate(),
        State: 1,
      },
    }).then(res => {
      wx.showToast({
        title: '成功预约',
        icon: 'success',
        duration: 3000
      })
      console.log(res)
      app.globalData.ReserveHistoryId = res._id
      this.timer()
    })
  },
  btnReserveCancel(e) {
    let ReserveState = !(this.data.ReserveState)
    console.log(ReserveState)
    this.setData({
      ReserveState: ReserveState
    })
    console.log(app.globalData.ReserveHistoryId)
    db.collection('ReserveHistory').where({
      _id: app.globalData.ReserveHistoryId
    }).updata({
      data: {
        State: 3,
      },
    }).then(res => {
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 3000
      })
    })
  },
  cancel() {
    wx.showToast({
      title: '删除成功',
    })

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data)
    this.setData(data);
  },
  User_Phone_Input(e) {
    console.log(e)
    this.setData({
      User_Phone: e.detail.value
    })
  },
  ReserveHistory() {
    db.collection('ReserveHistory').get().then(res => {
      console.log(res)
      this.setData({
        Rooming: res[0]
      })
    })
  },
  timer() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(() => {
        this.setData({
          second: this.data.second - 1,
          seconded:this.data.seconded +1
        })
        if (this.data.second <= 0) {
          this.setData({
            seconded:0,
            second: 600,
            alreadySend: false,
            send: true
          })
          resolve(setTimer)
        }
      }, 1000)
    })
    
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
})