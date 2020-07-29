<template>
	<view>
		<image :src="avatar" mode="aspectFill"></image>
		<button type="primary" @tap="testbutton"></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				avatar: ''
			}
		},
		onLoad:function(){
			uni.setStorage({
				key: 'username',
				data: 'kingfl',
				success:function(){
					console.log("用户已经登录");
				}
			})
			this.username = 'kingfl';
			this.avatar = "http://127.0.0.1:8080/images/avatar/" + this.username + ".jpg";
		},
		methods: {
			testbutton(){
				console.log(this.username);
				uni.getStorage({
					key: 'username',
					success:function(res){
						console.log("从缓存中获取username");
						console.log(res.data);
					}
				})
			}
		}
	}
</script>

<style>

</style>
