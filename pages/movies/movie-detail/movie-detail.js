// pages/movies/movie-detail/movie-detail.js
const app = getApp()
import { formatStarts, convertToCastString, convertToCastInfos } from '../../../util/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 电影id
    movie: {} // 电影详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      id
    })
    this.getMoiveDetail(id)
  },
  getMoiveDetail (id) {
    const url = app.globalData.g_baseUrl + "/v2/movie/subject/" + id
    wx.request({
      url,
      method: 'GET',
      success: (res) => {
        console.log(res)
        this.formatData(res.data)
      }
    })
  },
  formatData (data) {
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      starts: formatStarts(data.rating.stars),
      average: data.rating.average,
      director: director,
      casts: convertToCastString(data.casts),
      castsInfo: convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.setData({
      movie
    })
    console.log(movie)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})