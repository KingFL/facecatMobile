<template>
	<view>
		<view class="moments-list-cell" v-for="(item, index) in moments" :key="index">
			<view class="moments-item-left">
				<view class="moments-item-avatar">
					<image class="moments-item-avatar-image" mode="aspectFill" :src="item.avatar"></image>
				</view>
			</view>
			<view class="moments-item-right">
				<view class="moments-item-head">
					<text class="moments-item-head-username">{{item.nickname}}</text>
					<text class="moments-item-head-locat">{{item.locatname}}</text>
					<text class="moments-item-head-catname">{{item.catname}}</text>
				</view>
				<view class="moments-item-image">
					<image class="moments-list-cell-image" :src="item.imagepath" mode="aspectFill"></image>
				</view>
				<view class="moments-item-text">{{item.content}}</view>
				<view class="moments-item-foot">
					<text class="moments-item-foot-time">{{item.time}}</text>
					<!-- <text class="moments-item-foot-others">点赞：{{item.like}}</text>
					<text class="moments-item-foot-others">回复：{{item.count}}</text> -->
				</view>
				<template v-if="username">
					<view class="add-comments">
						<textarea v-model="comment" class="add-comments-content" placeholder="评论" />
						<button type="primary" @tap="addsubmit()" style="float: right;margin-top: 10upx;" size="mini">提交</button>
					</view>
				</template>
				
			</view>
		</view>
		<view class="uni-comment">
			<view class="uni-comment-list" v-for="(item, index) in comments" :key="index">
				<view class="uni-comment-face">
					<image :src="item.avatar" mode="widthFix"></image>
				</view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>{{item.username}}</text>
					</view>
					<view class="uni-comment-date">
						<text>{{item.commenttime}}</text>
					</view>
					<view class="uni-comment-content">{{item.comment}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moments: [],
				comments: [],
				comment:'',
				commentId:'',
				username: ''
			}
		},
		onLoad: function(e) {
			this.commentId = e.momentid;
			console.log(e);
			uni.getStorage({
				key : "username",
				success: (res) => {
					this.username = res.data
				}
			})
			uni.request({
				url: 'http://127.0.0.1:8080/getOneMoment',
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: {
					momentid: e.momentid
				},
				success: res => {
					this.moments = res.data.moment;
					console.log(this.moments);
				},
				fail: () => {},
				complete: () => {}
			});
			this.getComment(e.momentid);
		},
		methods: {
			getComment(e) {
				uni.request({
					url: 'http://127.0.0.1:8080/getComments',
					method: 'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						momentid: e
					},
					success: res => {
						this.comments = res.data.result;
						console.log(this.comments);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			addsubmit(){
				if(!this.username){
					uni.showToast({
						title: '请先登录！',
						icon: 'none'
					});	
					return;
				}
				if(!this.comment) {
					uni.showToast({
						title: '评论不能为空！',
						icon: 'none'
					});	
					return; 
				}
				uni.request({
					url: 'http://127.0.0.1:8080/sendComment',
					method: 'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						momentid: this.commentId,
						comment: this.comment,
						username: this.username
					},
					success: res => {
						// this.comments = res.data.result;
						// console.log(this.comments);
						this.getComment(this.commentId);
						this.comment = '';
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	/* comment */
	page {
		background-color: #f8f8f8;
	}

	.uni-padding-wrap {
		padding: 30upx;
	}

	view {
		font-size: 28upx;
	}

	.uni-comment {
		padding: 5rpx 0;
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		background: #fff;
		margin-top: 15upx;
	}

	.uni-comment-list {
		flex-wrap: nowrap;
		padding: 10rpx 0;
		margin: 10rpx 0;
		width: 100%;
		display: flex;
	}

	.uni-comment-face {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		margin-right: 20upx;
		margin-left: 15upx;
		/* margin-left: 10upx; */
		/* flex-shrink: 0; */
	}

	.uni-comment-face image {
		width: 100%;
		border-radius: 50%;
	}

	.uni-comment-body {
		width: 100%;
	}

	.uni-comment-top {
		line-height: 1.5em;
		justify-content: space-between;
	}

	.uni-comment-top text {
		color: #0A98D5;
		font-size: 24upx;
	}

	.uni-comment-date {
		line-height: 38upx;
		flex-direction: row;
		justify-content: space-between;
		display: flex !important;
		flex-grow: 1;
	}

	.uni-comment-date view {
		color: #666666;
		font-size: 24upx;
		line-height: 38upx;
	}

	.uni-comment-content {
		line-height: 1.6em;
		font-size: 28upx;
		padding: 8rpx 0;
	}

	.uni-comment-replay-btn {
		background: #FFF;
		font-size: 24upx;
		line-height: 28upx;
		padding: 5rpx 20upx;
		border-radius: 30upx;
		color: #333 !important;
		margin: 0 10upx;
	}


.add-comments-content{
	/* background: #F8F8F8; */
	border: 1upx solid #eee;
	width: 100%;
}

	.moments-list-cell {
		display: flex;
		flex: 5;
		flex-direction: row;
		padding: 10upx 20upx 20upx 5upx;
		position: relative;
		/* justify-content: space-between; */
		/* align-items: center; */
		background: #fff;
	}

	.moments-item-left {
		justify-content: flex-start;
		height: 100%;
		flex-direction: column;
		flex: 1;
	}

	.moments-item-avatar {
		justify-content: flex-start;
		border-radius: 100%;
		/* overflow: hidden; */
		margin: 20upx 10upx 10upx 10upx;
	}

	.moments-item-avatar-image {
		justify-content: flex-start;
		width: 80upx;
		border-radius: 50%;
		height: 80upx;
	}

	.moments-item-right {
		flex-direction: column;
		flex: 6;
	}

	.moments-item-head {
		padding: 8upx 20upx 8upx 20upx;
		flex-direction: row;
		justify-content: space-between;
	}

	.moments-item-head-catname {
		color: #FF4343;
		float: right;
	}

	.moments-item-head-username {
		flex-flow: column;
	}

	.moments-item-head-locat {
		color: #888888;
		flex-flow: column-reverse;
		margin-left: 20upx;
	}

	.moments-item-image {
		/* align-items: center; */
	}

	.moments-list-cell-image {
		/* align-items: center; */
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
		color: #888888;
	}

	.moments-item-foot-others {
		font-size: 24upx;
		color: #B2B2B2
	}
</style>
