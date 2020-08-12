// pages/posts/posts-detail/posts-detail.js
const { postList } = require('../../../data/post-data')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false, // 标识是否正在播放音乐
    id: -1, // 当前页面的文章id
    collected: {}, // 所有文章的收藏记录
    currentCollected: false  // 当前页面文章是否被收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const collected = wx.getStorageSync('collected') || {}
    const currentCollected = collected[id] || false
    this.setData(postList.find(item => item.postId == id))
    this.setData({
      collected,
      currentCollected,
      id
    })
    if (app.globalData.g_isPlaying && id == app.globalData.g_playingId) {
      this.setData({
        isPlaying: app.globalData.g_isPlaying
      })
    }
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlaying: false
      })
    })
    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlaying: false
      })
    })
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlaying: true
      })
    })
  },
  onShareTap () {
    const itemList = ['分享至微博', '分享至QQ', '分享至朋友圈']
    wx.showActionSheet({
      itemList,
      success (res) {
        console.log(res)
      }
    })
  },
  onCollectionTap () {
    const id = this.data.id
    const currentCollected = !this.data.currentCollected
    let collected = wx.getStorageSync('collected') || {}
    collected[id] = currentCollected
    this.setData({
      currentCollected
    })
    wx.setStorageSync('collected', collected)
    wx.showToast({
      title: currentCollected ? '收藏成功' : '取消成功',
      duration: 1000
    })
  },
  onAudioTap () {
    const postData = postList.find(item => item.postId == this.data.id)
    if (!this.data.isPlaying) {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      app.globalData.g_playingId = this.data.id
      app.globalData.g_isPlaying = true
      this.setData({
        isPlaying: true
      })
    } else {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlaying: false
      })
      app.globalData.g_isPlaying = false
    }
  }
})