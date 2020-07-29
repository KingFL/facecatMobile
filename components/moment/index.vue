<template>
	<view class="content">
		<view class="uni-list">
			<view class="moments-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in list" :key="index" @tap="openmoment(item.momentid)"
			 :data-momentid="item.momentid"> 
					<view class="moments-item-left">
						<view class="moments-item-avatar">
							<image class="moments-item-avatar-image" mode="aspectFill" :src="item.avatar"></image>
						</view>
					</view>
					<view class="moments-item-right">
						<view class="moments-item-head">
							<text class="moments-item-head-username">{{item.nickname}}</text>
							<text class="moments-item-foot-time">{{item.time}}</text>
							<text class="moments-item-head-catname">{{item.catname}}</text>
						</view>
						<view class="moments-item-image">
							<image class="moments-list-cell-image" :src="item.imagepath" mode="aspectFill"></image>
						</view>
						<view class="moments-item-text">
							{{item.content}}
						</view>
						<view class="moments-item-foot">
							<text class="moments-item-head-locat">{{item.locatname}}</text>
							<text class="moments-item-foot-others">点赞：{{item.like}}</text>
							<text class="moments-item-foot-others">回复：{{item.count}}</text>
						</view> 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
		},
		methods: {
			openmoment(e) {
				console.log(e);
				console.log('aaaaa');
				uni.navigateTo({
					url: '../../pages/comments/comments?' + "momentid=" + e,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		min-height: 100%;
	}

	.moments-list-cell {
		display: flex;
		flex: 5;
		/* flex-direction: row; */
		padding: 10upx 20upx 20upx 5upx;
		position: relative;
		/* justify-content: space-between; */
		/* align-items: center;  上下居中了*/
		margin: 15upx 0;
		background: #fff;
	}

	.moments-item-left {
		/* justify-content: flex-start;
		height: 100%;
		flex-direction: column;
		flex: 1; */
		float: left;
		/* display: inline-block; */
		margin-top: 20upx;
		margin-left: 10upx;
	}

	.moments-item-avatar {
		/* justify-content: flex-start;  
		border-radius: 100%;
		overflow: hidden;
		margin: 40upx 10upx 10upx 10upx; */
		/* position: relative; */
		display: inline-block;
	}

	.moments-item-avatar-image {
		/* justify-content: flex-start; */
		width: 80upx;
		height: 80upx;
		border-radius: 50%;

	}

	.moments-item-right {
		flex-direction: column;
		flex: 6;
		float: right;
	}

	.moments-item-text {
		/* white-space: nowrap; */
		/* display: inline-block; */
		width: 90%;
		/* 
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis; */
	}

	.moments-item-text-content {
		display: inline-block;
	}

	.moments-item-head {
		padding: 8upx 20upx 8upx 20upx;
		/* flex-direction: row; */
		justify-content: space-between;
	}

	.moments-item-head-username {
		/* flex-flow: column; */
		font-size: 30upx;
	}

	.moments-item-head-locat {
		color: #888888;
		/* flex-flow: column-reverse; */
	}

	.moments-item-head-catname {
		color: #FF4343;
		float: right;
	}

	.moments-item-image {
		align-items: center;
	}

	.moments-list-cell-image {
		align-items: center;
		width: 600upx;
		height: 300upx;
		margin: 10upx 20upx;
	}

	.moments-item-foot {
		justify-content: space-between;
		flex-direction: row;
	}

	.moments-item-foot-time {
		font-size: 24upx;
		margin-left: 10upx;
		color: #888888;
	}

	.moments-item-foot-others {
		font-size: 24upx;
		color: #B2B2B2;
		margin: 0 10upx;

		float: right;
	}

	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list-text-top {
		line-height: 1.6em;
	}

	.uni-media-list-text-bottom {}

	.uni-ellipsis {}

	/* 	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	} */
</style>
