<template>
	<view class="page"> 
		<view class='content'>
			<view class="cat-head">
				<view class="cat-title">{{cat[0].catname}}</view>
				<view class="cat-time">加入时间:{{cat[0].foundtime}}</view>
			</view>
			<view class="cat-picture">
				<image class="catimage" :src="cat[0].imagepath" mode="aspectFill"></image>
			</view>
			<view class="cat-content">
				<text>{{cat[0].remark}}</text>
			</view> 
		</view>
		<my-moments :list="moments"></my-moments>
	</view>
</template>

<script>
	import myMoments from '@/components/moment/index.vue';
	export default {
		components: {
			myMoments
		},
		data() {
			return {
				catid: '',
				cat: [],
				moments: []
			}
		},
		onLoad: function(e) {
			console.log("page cats_info");
			console.log(e);
			uni.request({
				url: 'http://127.0.0.1:8080/getOneCat',
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: {
					catid: e.catid
				},
				success: res => {
					this.cat = res.data.cat;
					this.moments = res.data.moments;
					console.log(this.cat);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {}
	}
</script>

<style>
	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.content {
		display: flex;
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		flex-direction: column;
		padding: 15upx 20upx 0upx 20upx;
	}

	.cat-head {
		flex-direction: row;
		padding: 0upx 10upx 0upx 10upx;
		justify-content: space-between;
	}

	.cat-title {
		font-size: 34upx;
	}

	.cat-time {
		font-size: 26upx;
		color: #666666;
	}

	.cat-picture {
		justify-content: space-between;
		padding: 10upx 10upx 10upx 10upx;
	}

	.catimage {
		width: 680upx;
	}

	.cat-content {
		font-size: 26upx;
		color: #555555;
		margin-bottom: 15upx;
	}
</style>
