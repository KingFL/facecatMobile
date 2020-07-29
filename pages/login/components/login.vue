<template>
	<view class="">
		<view class="content">
			<view class="">
				<view class="">
					<input type="text" v-model="username" placeholder="请输入用户名" class="is-input" />
				</view>
				<view class="">
					<input v-model="password" placeholder="请输入登录密码" class="is-input" password data-val="password" />
				</view>
				<view class=" loginbtn ">
					<button :loading="loading" @tap="Login"> {{ loading ? "登录中...":"登 录"}} </button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "LoginView",
		data() {
			return {
				loading: false,
				username: "",
				password: "",

			};
		},
		methods: {
			Login: function() {
				this.loading = true;
				setTimeout((e => {
					this.loading = false;
				}), 1500);
				if (this.username == "" || this.password == "") {
					uni.showToast({
						title: '请输入用户名或密码'
					});
					return;
				} else {
					uni.request({
						url: "http://127.0.0.1:8080/userLogin",
						method: "POST",
						data: {
							username: this.username,
							password: this.password
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						success: (res) => {
							if (res.data.stat == 1) {
								uni.setStorage({
									key: 'username',
									data: this.username,
									success: () => {
										uni.switchTab({
											url: "/pages/account/me"
										})

									}
								})
							} else {
								uni.showToast({
									title: '用户名或密码错误'
								});
							}
						}
					})
				}

			},
		}
	}
</script>

<style scoped>
	.content {
		margin: 80rpx auto;

		width: 70%;
	}

	.is-input {
		height: 88rpx;
		color: #353535;
		font-size: 32rpx;
		border: 2rpx solid #e5e5e5;
		border-radius: 44rpx;
		text-align: center;
		background: #fff;
		margin-bottom: 20rpx;
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
</style>
