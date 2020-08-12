// pages/movies/movies.js
const app = getApp()
const util = require('../../util/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top250: {},
    inTheaters: {},
    comingSoon: {},
    showReault: false,
    searchReault: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const baseUrl = app.globalData.g_baseUrl
    const top250Url = baseUrl + 'v2/movie/top250?start=6&count=3'
    const inTheatersUrl = baseUrl + 'v2/movie/in_theaters?start=4&count=3'
    const comingSoonUrl = baseUrl + 'v2/movie/coming_soon?start=10&count=3'
    this.getMovieListData(top250Url, 'top250', '豆瓣Top250')
    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映')
    this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映')
  },
  getMovieListData (url, attrName, title) {
    wx.showNavigationBarLoading()
    wx.request({
      url,
      method: 'GET',
      success: (res) => {
        // this.formatMovieData(res.data.subjects, attrName, title)
        this.setData({
          [attrName]: {
            title,
            list: util.formatMovieData(res.data.subjects)
          }
        })
        wx.hideNavigationBarLoading()
      }
    })
  },
  // formatMovieData (list, attrName, title) {
  //   const newList = []
  //   for (let i = 0; i < list.length; i++) {
  //     let subTitle = list[i].title
  //     if (subTitle.length > 6) {
  //       subTitle = subTitle.substring(0, 6) + '...'
  //     }
  //     const movie = {
  //       id: list[i].id,
  //       subTitle: subTitle || list[i].title,
  //       img: list[i].images.large,
  //       starts: this.formatStarts(list[i].rating.stars.substring(0, 1)),
  //       average: list[i].rating.average
  //     }
  //     newList.push(movie)
  //   }
  //   this.setData({
  //     [attrName]: {
  //       title,
  //       list: newList
  //     }
  //   })
  // },
  // formatStarts (starts) {
  //   const startArr = []
  //   for (let i = 0; i < 5; i++) {
  //     if (starts > i) {
  //       startArr.push(1)
  //     } else {
  //       startArr.push(0)
  //     }
  //   }
  //   return startArr
  // },
  goMore (e) {
    wx.navigateTo({
      url: '/pages/movies/more-movies/more-movies?title=' + e.currentTarget.dataset.title
    })
  },
  searchFocus (e) {
    this.setData({
      showReault: true
    })
  },
  closeInput (e) {
    this.setData({
      showReault: false,
      searchReault: {}
    })
  },
  search (e) {
    if (this.data.T) {
      clearTimeout(this.data.T)
    }
    const text = e.detail.value
    const url = app.globalData.g_baseUrl + 'v2/movie/search?q=' + text
    this.setData({
      T: setTimeout(() => {
        this.getMovieListData(url, 'searchReault', '')
        console.log('111')
      }, 1000)
    })
  },
  // 处理图片加载异常
  errorFunction (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      ['searchReault.list[' + index + '].img']: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg'
    })
  },
  goMovieDetail (e) {
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id=' + e.currentTarget.dataset.id
    })
  }
})