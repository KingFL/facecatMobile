<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" active-color="#1a7bc1" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-show="current === 0">
				<login-view></login-view>
			</view>
			<view v-show="current === 1">
				<register-view></register-view>

			</view>
		</view>
	</view>
</template>

<script>
	import LoginView from './components/login';
	import RegisterView from './components/register';
	import moment from '../../common/js/moment.js'

	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'

	export default {
		components: {
			uniSegmentedControl,
			LoginView,
			RegisterView
		},
		name: "Login",
		data() {
			return {
				current: 0,
				time: moment().format('YYYY-MM-DD HH:mm:ss'),
				items: ["登陆", '注册'],
				styleType: 'button',
			}
		},
		onLoad() {
			// uni.getStorage({
			// 	key: "username",
			// 	success: function(res) {
			// 		if (res.data) {
			// 			uni.switchTab({
			// 				url: '/pages/account/me'
			// 			})
			// 		}
			// 	}
			// })
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index
				}
			}
		},
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 0 40upx
	}

	.content {
		/* display: flex; */
		justify-content: center;
		/* align-items: center; */
		/* height: 300upx; */
		text-align: center;
	}

	.color-tag {
		width: 50upx;
		height: 50upx;
	}

	uni-radio-group uni-label {
		padding: 0;
	}

	.uni-list-item__container {
		padding: 24upx 30upx;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-item__container:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
</style>
