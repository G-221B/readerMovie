// pages/posts/posts.js
var { postList } = require('../../data/post-data')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// swipers: ['/images/wx.png', '/images/vr.png', '/images/iqiyi.png'],
		swipers: [
			{
				id: 3,
				url: '/images/wx.png'
			},
			{
				id: 4,
				url: '/images/vr.png'
			}, {
				id: 5,
				url: '/images/iqiyi.png'
			}],
		postList
	},
	goDetail (e) {
		const postId = e.currentTarget.dataset.postId
		wx.navigateTo({
			url: `/pages/posts/posts-detail/posts-detail?id=${postId}`
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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