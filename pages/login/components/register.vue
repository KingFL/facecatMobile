<template>
	<view class="">
		<view class="content">
			<view class="">
				<view class="">
					<input @blur="confirm()" type="text" v-model="registerData.username" placeholder="请输入用户名" class="is-input" />
				</view>
				<view class="">
					<input v-model="registerData.password" placeholder="请输入登录密码" class="is-input is-input-2" password data-val="password" />
				</view>
				<view class="" style="text-align: left;">
					<view class="uni-padding-wrap">
						<view class="uni-title">
							<radio-group @change="radioChange">
								性别：
								<label class="radio">
									<radio value="男" checked="true" />男</label>
								<label class="radio">
									<radio value="女" />女</label>
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
								<picker mode="date" :value="registerData.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
									<view class="uni-input">{{registerData.birthday}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class=" loginbtn ">
					<button @tap="Register">注册 </button>
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
				registerData: {
					username: "",
					password: "",
					usersex: '男',
					birthday: ''
				},

			};
		},
		methods: {
			radioChange(evt) {
				this.registerData.usersex = evt.detail.value
				console.log(this.registerData);
			},
			bindDateChange: function(e) {
				this.registerData.birthday = e.target.value
			},
			Register: function() {
				this.loading = true;
				setTimeout((e => {
					this.loading = false;
				}), 1500);
				if (this.registerData.username == "" || this.registerData.password == "") {
					uni.showToast({
						title: '请输入用户名或密码',
						icon: "none"
					});
					return;
				} else if (this.registerData.birthday == "") {
					uni.showToast({
						title: '请选择生日',
						icon: "none"
					});
					return;
				} else {



					uni.request({
						url: "http://127.0.0.1:8080/checkUsername",
						method: "POST",
						data: {
							username: this.registerData.username,
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.count != 0) {
								uni.showToast({
									title: '用户名已存在！',
									icon: 'none'
								});
							} else {

								console.log('test');
								uni.request({
									url: "http://127.0.0.1:8080/registerUser",
									method: "POST",
									data: this.registerData,
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
							}
						}
					})
				}

			},
			confirm() {

				uni.request({
					url: "http://127.0.0.1:8080/checkUsername",
					method: "POST",
					data: {
						username: this.registerData.username,
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: (res) => {
						if (res.data.count != 0) {
							uni.showToast({
								title: '用户名已存在！',
								icon: 'none'
							});
						}
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
		}
	}
</script>

<style scoped>
	.radio {
		margin: 0 15upx;
	}

	.content {
		margin: 80rpx auto;

		width: 70%;
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

	.loginbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		background: #1a7bc1;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid #f2f2f2;
	}

	.resiser-label {
		background: #fff;
	}
</style>
