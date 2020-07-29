<template>
	<view class="">
		<view class="content">
			<view class="">
				<view class="">
					<input @blur="confirm()" type="text" v-model="userinfo.nickname" placeholder="请输入用户名" class="is-input" />
				</view>
				<view class="" style="text-align: left;">
					<view class="uni-padding-wrap">
						<view class="uni-title">
							<radio-group @change="radioChange">
								性别：
								<label class="radio">
									<radio value="男" :checked="userinfo.usersex == '男'" />男</label>
								<label class="radio">
									<radio value="女" :checked="userinfo.usersex == '女'" />女</label>
							</radio-group>
						</view>
					</view>
				</view>
				<view class="">
					<view class="uni-list" style="background: #fff;">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left resiser-label">
								选择生日：
							</view>
							<view class="uni-list-cell-db">
								<picker mode="date" :value="userinfo.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
									<view class="uni-input">{{userinfo.birthday}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class=" loginbtn ">
					<button @tap="Register" type="primary" size="mini">修改</button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "RegisterView",
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			currentDate() {

				this.getDate()
			}
		},
		data() {
			return {
				loading: false,
				userinfo: {
					nickname: "",
					password: "",
					usersex: '',
					birthday: ''
				},
				username: ''

			};
		},
		onShow: function() {

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
					success: (res)=> {
						console.log(res.data);
						_this.userinfo = res.data.userinformation
						// document.querySelector("input[name='gradio'][value="+_this.userinfo.usersex+"]").checked=true;
					}
				})
			},
			radioChange(evt) {
				this.userinfo.usersex = evt.detail.value
				console.log(this.userinfo);
			},
			bindDateChange: function(e) {
				this.userinfo.birthday = e.target.value
			},
			Register: function() {

				uni.request({
					url: "http://127.0.0.1:8080/registerUser",
					method: "POST",
					data: this.userinfo,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						console.log(res);
						uni.showToast({
							title: '注册成功'
						});
						uni.redirectTo({
							url: '../login/login'
						})
					}
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
	}
</script>

<style scoped>
	.radio {
		margin: 0 15upx;
	}

	.content {
		background: #FFF;

	}

	.is-input {
		height: 88rpx;
		color: #353535;
		font-size: 32rpx;
		border-top: 2rpx solid #e5e5e5;
		/* border-radius: 44rpx; */
		text-align: left;
		padding-left: 25upx;
		background: #fff;
	}

	.is-input-2 {
		border-bottom: 2rpx solid #e5e5e5;
	}

	.loginbtn {
		text-align: right;
	}

	.loginbtn button {
		margin-top: 20rpx;
		/* float: right; */
		/* height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		  background: #1a7bc1;  
		opacity: 0.8;*/
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}

	.resiser-label {
		background: #fff;
	}
</style>
