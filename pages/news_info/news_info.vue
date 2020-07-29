<template>
	<view class="content">
		<view class="title">{{title}}</view>
		<view class="art-content">
			<!-- <text>{{strings}}</text> -->
			<rich-text class="richText" :nodes="strings"></rich-text>
		</view>
		<view class="comments" v-for="(item, index) in comments" :key="item.messageid">
			<text>{{item.text}}</text>
			<text>{{item.username}}</text>
			<text>{{item.time}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				strings: '',
				comments:[
					{
						text: "111111111111111",
						username: "张三",
						time:"2019030213534422",
						messageid:'2019030213534422'
					},{
						text: "222222222222222",
						username: "李四",
						time:"2019030215534422",
						messageid:"2019030215534422"
					},{
						text: "333333333333333",
						username: "王麻子",
						time:"2019030216534422",
						messageid:"2019030216534422"
					},{
						text: "444444444444444",
						username: "小白",
						time:"2019030217534422",
						messageid:"2019030217534422"
					}
				]
			}
		},
		onLoad:function(e){
			console.log(e);
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + e.newsid,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.title = res.data.title;
					this.strings = res.data.content;

					console.log(this.strings);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			
		}
	}
</script>

<style>
.content{
	padding: 10upx 2%;
	width: 96%;
	flex-wrap: wrap;
}
.art-content{
	font-size: 16upx;
	line-height: 2em;
}
.title{
	line-height: 2em;
	font-weight: 700;
	font-size: 38upx;
}
.comments{
	
}
</style>
