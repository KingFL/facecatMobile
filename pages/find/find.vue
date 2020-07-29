<template>
	<view>
		<view class="content">
			<!-- <page-head :title="title"></page-head> -->
			<view class="picture_uploader">
				<view class="uploader_title">喵 ~ 拍照或选择照片上传哟</view>
				<view class='takepic'>
					<template v-if="image">
						<view class="photo_chooser">
							<view class="photo">
								<image class="uni_uploader_img" :src="image" :data-src="image" @tap="previewImage" mode="aspectFit"></image>
							</view>
							<view class="upload_buttons">
								<button type="primary" size="mini" @tap="clearimage">清除</button>
								<button type="primary" size="mini" @tap="uploadimage">提交识别</button>
							</view>
						</view>
					</template>
					<template v-else>
						<view class="photo_chooser">
							<view class="uni-uploader__input-box">
								<view class="uni-uploader__input" @tap="chooseImage"></view>
							</view>
						</view>
					</template>
				</view>
				<view class='catface'>
					<template v-if="face_image">
						<image class="catface_image" :src="face_image" mode="aspectFill"></image>
					</template>
					<template v-if="catname">
						<view class="catinfo">
							<view class="">这只猫的名字叫：{{catname}}</view>
							<view class="">
								<button size="mini" style="font-size: 30upx;text-align: left;padding-left: 10upx;" type="default" @tap="showSinglePicker">当前选择的位置：{{pickerText.label}}</button> 
								</view>
							<view class="">不正确？点击清除按钮再拍一张</view>
						</view>
					</template>
					<template v-else>
						<view class=""></view>
					</template>
				</view>
				<button type="primary"></button>
			</view>
			<view class="uploader_text">
				<textarea class="moment-input" v-model="moment" placeholder="在这里输入你想说的话,最多140字" auto-height />
				<button type="primary" @tap="sendmoment">发送动态</button>
        </view>
	</view>
	<view class="picker">
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvuePicker/mpvuePicker.vue';
	
	export default {
		components: {
            mpvuePicker,
        },
		data() {
			return {
				moment:'', //文本框绑定变量
				image: '', //拍摄或选择的图片
				imageList: [],//上传的图片（列表） - 用于多张图片选择 暂时弃用
				
				face_image: '', //猫脸数据地址（保留
				faceimages: [], //猫脸数据（多个）地址
				
				catid: '1',
				catname: '',
				
				catlist: [], //猫咪的列表
				
				mode: '',
				themeColor: '#007AFF',
				pickerValueDefault: [1],
				pickerValueArray: [], //选择器绑定的数据
				deepLength: 1,
				pickerText: {
					label:'位置选择'
				}, //选择器选择的内容
				username:''
			}
		},
		onShow:function(){
			uni.getStorage({
				key : "username",
				success: (res) => {
					this.username = res.data
				}
			})
			uni.request({
				url: 'http://127.0.0.1:8080/getAllLocations',
				method: 'POST',
				header:{
					"Content-Type":"application/x-www-form-urlencoded"
				},
				data: {},
				success: res => {
					this.catlist = res.data.locations;
					this.pickerSingleArray = res.data.locations;
					console.log(this.catlist);
                this.pickerValueArray = this.catlist
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			chooseImage(){
				uni.chooseImage({
						// sourceType: sourceType[this.sourceTypeIndex],
						// sizeType: sizeType[this.sizeTypeIndex],
					count: 1,
					success: (res) => {
						this.image = res.tempFilePaths[0];
						console.log(this.image);
						this.imageList = this.imageList.concat(res.tempFilePaths);
					}
				})
			},
			clearimage(){
				this.image = '';
				this.face_image = '';
				this.catname = '';
				this.catid = '';
			},
			uploadimage(){
				console.log(this.image);
				uni.showToast({
					title: '识别需要一段时间，请稍等',
					position: 'bottom',
					icon: 'none'
				});
				uni.uploadFile({ 
					url:'http://127.0.0.1:20000/id',
					filePath: this.image,
					name: 'file',
					formData:{
						imageclass:"userupload",
					},
					success: (res) => {
						var data =JSON.parse(res.data);
						if(data.err)
						uni.showToast({
							title: data.err,
							icon: 'none'
						});
						this.face_image = data.face_image; 
						this.faceimages = data; 
						this.catname = data.catname
						this.catid = data.catid
					},
					fail: (res) => {
						uni.showToast({
							title: res.statusCode + '错误',
							mask: false,
							duration: 1500
						});
						console.log(res);
					},
					complete: (res) => {
						
					}
				})
			},
			sendmoment(){
				console.log(this.moment);
				if(!this.username){
					uni.showToast({
						title: '不登陆是发不了动态的哟',
						icon: 'none'
					});
					return;
				}
				if(!this.pickerText.label || this.pickerText.label == '位置选择') {
					uni.showToast({
						title: '请选择位置',
						icon: 'none'
					});
					return;
				}
				if(!this.catname) {
					uni.showToast({
						title: '请先识别',
						icon: 'none'
					});
					return;
				}
				if(!this.moment) {
					uni.showToast({
						title: '请输入文字',
						icon: 'none'
					});
					return;
				}
				uni.uploadFile({  
					url:'http://127.0.0.1:8080/sendMoment',
					filePath: this.image,
					name: 'file',
					formData:{
						// imageclass:"userupload",
						username:this.username,
						content:this.moment,
						locatname:this.pickerText.label,
						catid: this.catid,
						catname:this.catname
					},
					success: (res) => { 
						uni.showToast({
							title: '发送成功！'
						});
					},
					fail: (res) => {
						uni.showToast({
							title: res.statusCode + '错误',
							mask: false,
							duration: 1500
						});
						console.log(res);
					},
					complete: (res) => { 
					}
				})
			},
			previewImage: function(e) {
				console.log(e.currentTarget.dataset.src);
				var current = e.currentTarget.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			//选择器相关方法
			showSinglePicker() {
                this.mode = 'selector'
                this.deepLength = 1
                this.pickerValueDefault = [0]
				console.log(this.$refs.mpvuePicker);
                this.$refs.mpvuePicker.show()
            },
			onConfirm(e) {
                this.pickerText = e 
            },
			onCancel(e) {
				console.log(e)
			},
		}
	}
</script>

<style>
	.picker{
		display: block;
	}
	page{
		background-color: #f8f8f8;
	}
	.content{
		width: 100%;
		flex-direction: column;
	}
	.uploader_title{
		font-size: 28upx;
		color: #606266;
	}
	.picture_uploader{
		width: 100%;
		height: auto;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		position: relative;
		display: flex;
	}
	.takepic{
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.photo{
		/* position: relative; */
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}
	.photo_chooser{
		position: relative;
		flex-direction: column;
	}
	.uni_uploader_img{
		position: relative;
		
	}
	.upload_buttons{
		/*flex-direction: row; 
		position: relative; */
		text-align: center;
		padding: 5upx 20upx 5upx 20upx;
	}
	.upload_buttons button{
		margin:0upx 10upx ;
	}
	.catface_image{
		width: 300upx;
		height: 300upx;
	}
	.catfaces{
		padding: 10upx;
	}
	.catinfo{
		flex-direction: column;
		text-align: center;
	}
	.uploader_text{
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.moment-input{
		margin: 20upx;
		padding: 10upx;
		width: 80%;
		background-color: #FFFFFF;
	}
	.photo{
		/* height: 300upx; */
	}
	.examplehhhhh {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
