<template>
	<view class="report">
		<view class="add-comments">
			<textarea v-model="comment" class="add-comments-content" placeholder="您的宝贵意见" />
			<input  v-model="phone" class="add-comments-content uni-input" placeholder="联系方式" /> 
			<button type="primary" @tap="addsubmit()" style="float: right;margin-top: 10upx;" size="mini">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				comment:'',
				phone:''
			}
		},
		methods:{
			addsubmit(){
				uni.getStorage({
					key : 'username',success: (res) => {
						uni.request({
							url: 'http://127.0.0.1:8080/sendReport',
							method: 'POST',
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							data: {
								username:res.data,
								suggestion:this.comment,
								contact:this.phone
							},
							success: res => {  
								uni.showToast({
									title: '发送成功！'
								});
							},
							fail: () => {},
							complete: () => {}
						}); 
						
					}
				})
			}
		},
	}
</script>

<style>
.add-comments-content{
	background: #FFFFFF;
	border: 1upx solid #eee;
	margin-bottom: 20upx;
	width: 100%;
	padding: 20upx;
}

</style>
