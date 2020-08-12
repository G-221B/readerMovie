// pages/movies/more-movies/more-movies.js
const app = getApp()
const util = require('../../../util/util')
const REQ_NUM = 21 // 一次请求的条数 /
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 电影列表
    total: 0, // 电影数
    url: '' // api地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const title = options.title
    let url = app.globalData.g_baseUrl
    switch (title) {
      case '豆瓣Top250':
        url += 'v2/movie/top250?count=21&start='
        break
      case '正在热映':
        url += 'v2/movie/in_theaters?count=21&start='
        break
      case '即将上映':
        url += 'v2/movie/coming_soon?count=21&start='
        break
    }
    this.setData({
      title,
      url
    })
    this.getMoviesList(url + this.data.total)
  },
  getMoviesList (url) {
    wx.showNavigationBarLoading()
    wx.request({
      url,
      method: 'GET',
      success: (res) => {
        this.setData({
          list: this.data.list.concat(util.formatMovieData(res.data.subjects)),
          total: this.data.total + REQ_NUM
        })
        wx.hideNavigationBarLoading()
      }
    })
  },
  // 处理图片加载异常
  errorFunction (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      ['list[' + index + '].img']: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg'
    })
  },
  onPullDownRefresh () {
    this.setData({
      list: [],
      total: 0
    })
    const url = this.data.url + this.data.total
    this.getMoviesList(url)
    wx.stopPullDownRefresh()
  },
  goMovieDetail (e) {
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total > this.data.list.length) {
      return
    }
    const url = this.data.url + this.data.total
    this.getMoviesList(url)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})