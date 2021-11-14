// pages/index/complete/index.js
const app = getApp();
import {
  config
} from "../../../utils/config";
const db = wx.cloud.database({
  env: config.EnvID
})

Page({
  data: {
    multiArray: [
      ['雁塔校区', '长安校区'],
      ['学生6-8', '学生3-5', '学生1-2', '小粉喽'],
      ['一层']
    ],
    multiIndex: [0, 0, 0],
  },
  onLoad() {
    db.collection('User').get().then(res => {
      console.log(res)
      if ((res.data[0].User_Phone && res.data[0].User_Storey)) {
        wx.reLaunch({
          url: '../../index/index'
        })
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 0
        })
      }
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
    this.setData({
      User_Phone: e.detail.value
    })
  },
  ResetUserInfo() {
    console.log(this.data)
    let openid = wx.getStorageSync('userInfo')
    console.log(openid)
    db.collection('User').where({
      _openid: openid._openid
    }).update({
      data: {
        User_Phone: this.data.User_Phone,
        User_Storey: this.data.multiIndex,
        User_StoreyNickName: this.data.multiArray
      }
    }).then(res=>{
      console.log(res)
      wx.showToast({
        title: '请稍等',
      })
      wx.reLaunch({
        url: '../../index/index'
      })
      wx.showToast({
        title: '已完成',
        icon: 'success',
        duration: 0
      })
    }).catch(res=>{
      console.log(res)
      wx.showToast({
        title: '修改失败',
        icon: 'error',
        duration: 1000
      })
    })
  }
})