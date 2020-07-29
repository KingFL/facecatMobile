<template>
	<view class="loading_box" v-show="is_loading" @click="switch_loading">
		<view class="loading">
			<view class="loader loader-17">
			  <view class="css-square square1"></view>
			  <view class="css-square square2"></view>
			  <view class="css-square square3"></view>
			  <view class="css-square square4"></view>
			  <view class="css-square square5"></view>
			  <view class="css-square square6"></view>
			  <view class="css-square square7"></view>
			  <view class="css-square square8"></view>
			</view>
			 <!-- <view class="loader loader-4"></view> -->
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			switch_loading(){
				this.$store.commit("switch_loading")
			}
		},
		computed:{
			is_loading(){
				return this.$store.state.loading
			}
		}
	}
</script>

<style>
@import "../../lib/loading_animate/loading.wxss";
.loading_box{
	width: 100%;
	height: 100vh;
	/* background-color: rgba(0,0,0,0.4); */
	position: absolute;
	left: 0;
	top: 0;
	z-index: 10000;
}
.loading{
	width: 250rpx;
	height: 200rpx;
	background-color: rgba(0,0,0,0.5);
	color: #fff;
	position: relative;
	margin-left:250rpx ;
	margin-top: 40vh;
	line-height: 200rpx;
	text-align: center;
	border-radius: 20rpx;
}
.loading .loader{
	display:inline-block;
width:170rpx;
height:200rpx;
overflow:hidden;
/* background-color:#ccc; */
position:relative;

	
}
</style>
