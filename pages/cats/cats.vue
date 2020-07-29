<template>
	<view class="cat-page">
		<view class="uni-list">
			<view class="cats-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in cats" :key="index" @tap="opencat"
			 :data-catid="item.catid">
				<view class="cats-item-image">
					<image class="moments-item-cat-image" :src="item.imagepath"></image>
				</view>
				<view class="cats-item-foot">
					<text class="moments-item-foot-time">{{item.catname}}</text>
					<text class="moments-item-foot-others">动态总量：{{item.count}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cats: []
			}
		},
		onLoad: function() {
			uni.showLoading({
				title: 'Loading...',
				mask: false
			});
			uni.request({
				url: 'http://127.0.0.1:8080/getAllCats',
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: {},
				success: res => {
					console.log(res);
					this.cats = res.data.result;
					console.log(this.cats.result);
					uni.hideLoading();
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			opencat(e) {
				console.log(e);
				var catid = e.currentTarget.dataset.catid;
				console.log("catid -> " + catid);
				uni.navigateTo({
					url: '../cats_info/cats_info?' + "catid=" + catid,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.cat-page {
		width: 100%;
		background: #F8F8F8;
	}

	.cats-list-cell {
		flex-direction: column;
		width: 100%;
		background: #FFFFFF;
		margin: 8upx 0upx;
		
	}

	.cats-item-image {
		padding: 15upx 35upx 0upx 35upx;
	}

	.moments-item-cat-image {
		min-width: 100%; 
		width: 680upx;
	}

	.cats-item-foot {
		/* flex-direction: row;
		justify-content: space-between; */
		/* position: relative; */
		padding: 0upx 35upx 10upx 35upx;
		background: #555;
		opacity: 0.8;
		color: #FFF;
		margin: 0upx 35upx;
		font-size: 30upx;
		display: flex;
		justify-content: space-between;
	}

	.catlist_picture {
		height: 300upx;
		width: 300upx;
	}

	.uni-media-list {
		height: auto;
	}
</style>
