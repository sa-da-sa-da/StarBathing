// pages/user/index/index.js
import {config} from "../../../utils/config";

const db = wx.cloud.database({
  env: config.EnvID
})

Page({
  data: {
    Rooming: [{
      "storey": "学生宿舍 6-8 楼 ",
      "floor": "一 层",
      "room": "6-1-4",
      "note": "",
      "time": "2021-01-02 14:00"
    }],
    TabCur: 1,
    scrollLeft:1
  },
  onLoad(){
    this.authorizer()
    this.hasUserInfo()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  hasUserInfo(){
    let userid = wx.getStorageSync('userInfo')
    if(userid){
      this.setData({
        hasUserInfo: false
      })
    }else{
      this.setData({
        hasUserInfo: true
      })
    }
  },
  getUserProfile() {
    let userid = wx.getStorageSync('userInfo')
    console.log(userid)
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        db.collection('User').doc(userid._id).update({
          data: {
            User_AvatarUrl: res.userInfo.avatarUrl,
            User_NickName: res.userInfo.nickName
          }
        }).then(res => {
          this.setData({
            hasUserInfo: false
          })
          this.authorizer()
        })
      }
    })

  },
  authorizer() {
    let that = this
    db.collection('User').get().then(res => {
      console.log(res)
      if (res.data[0].User_AvatarUrl) {
        console.log(res.data[0].User_AvatarUrl)
        that.setData({
          User_AvatarUrl: res.data[0].User_AvatarUrl,
          User_NickName: res.data[0].User_NickName
        })
      } else {
        this.setData({
          hasUserInfo: true
        })
      }
    })
  },
})