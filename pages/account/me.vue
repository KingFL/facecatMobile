<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login&&userInfo.avatar ? userInfo.avatar :avatarUrl"></image>
			<view class="logo-title"> 
				<text class="uer-name" :class="{'nologin':!login}">{{login ? '欢迎您，'+userInfo.nickname  : '去登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="updateInfo">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">帐号管理</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<!-- <view class="center-list-item">
				<text class="list-icon">&#xe639;</text>
				<text class="list-text">新消息通知</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view> -->
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="sendReport()">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe65f;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-icon">&#xe614;</text>
				<text class="list-text">关于应用</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<button v-if="login" @tap="logout" type="warn" style="width: 100%;margin-top: 20upx;">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				avatarUrl: "../../static/person.png",
				userInfo: {},
				username: ''
			}
		},
		onShow() {
			let _this = this;
			uni.getStorage({
				key: 'username',
				success: function(res) {
					if (res.data) {
						_this.username = res.data
						_this.login = true
						_this.getUserInfo();
					}
				}
			})
		},
		methods: {
			getUserInfo() {
				let _this = this;
				uni.request({
					url: 'http://127.0.0.1:8080/getUserInformation',
					method: "POST",
					data: {
						username: this.username
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res.data);
						_this.userInfo = res.data.userinformation
					}
				})
			},
			logout() {
				uni.clearStorage();
				this.username = ''
				this.userInfo = {}
				this.login  = false
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			goLogin() {
				if (!this.login) {
					// uni.reLaunch({
					// 	url: '../login/login',
					// });
					uni.navigateTo({
						url: '../login/login',
						success: res => {},
						fail: () => {},
						complete: () => {}
					})
					console.log("点击前往登录")
				} else {
					//上传图片事件
					this.updateImage()
				}
			},
			updateInfo() { 
					uni.navigateTo({
					url: '../account/updateInfo',
						success: res => {},
						fail: () => {},
						complete: () => {}
					}) 
			}, 
			sendReport() {
				uni.navigateTo({
					url: '../account/report'
				})
			},
			updateImage() {

				uni.chooseImage({
					// sourceType: sourceType[this.sourceTypeIndex],
					// sizeType: sizeType[this.sizeTypeIndex],
					count: 1,
					success: (res) => {
						this.image = res.tempFilePaths[0];
						console.log(this.image);
						this.uploadImage();
					}
				})

			},
			uploadImage() {
				uni.uploadFile({
					url: 'http://127.0.0.1:8080/updateAvatar',
					filePath: this.image,
					name: 'file',
					formData: {
						username: this.username
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						this.userInfo.avatar = this.image
						this.getUserInfo()
					},
					fail: (res) => {
						uni.showToast({
							title: res.statusCode + '错误',
							mask: false,
							duration: 1500
						});
						console.log(res);
					},
					complete: (res) => {}
				})
			}
		},
		//监听导航栏事件
		onNavigationBarButtonTap(e) {
			// if (e.index === 0) {
			// 	uni.navigateTo({
			// 		url: './setting',
			// 	});
			// }
			// console.log('hhh');
		}
	}
	//字体32  灰色背景颜色 #f6f6f6  每个高度90  间距25   灰色线颜色 #d9d9d9
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('../../static/mefont.ttf') format('truetype');
	}
	page,
	view {
		display: flex;
	}

	page {
		background-color: #f6f6f6;
	}

.nologin{
	float: right;
}
	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #1a7bc1;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 80upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 25upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #d9d9d9;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 32upx;
		color: #4cd964;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 32upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 32upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
