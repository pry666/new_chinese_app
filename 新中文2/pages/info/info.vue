<template>
	<view>
		<view class="content">
			<view v-show="showElement" class="listen_box">
				<image class="lis_t" :src="'/static/info/'+ifplay" @tap="changestate"></image>
				<view class="audio_wrapper">
							<view class="audio_left">{{ format(currentTime) }}</view>
							<slider class="audio_slider"
								:max="duration"
								:value="currentTime"
                                @change="sliderchange"
								@changing="sliderdrag"
								v-model="sliderValue"
							></slider><!--后续改成touch-->
							<view class="audio_right">{{ format(duration) }}</view>
				</view>
			</view>
			<view class="title">{{title}}</view>
			<view class="art-content">
				<rich-text class="richText" :nodes="strings"></rich-text>
			</view>
		</view>
		<view class="bottom_bar">
			<view class="label" v-for="(row,index) in sel_choice" :key="row.name" @tap="donext(index)">
				<view class="icon">
					<image :src="'/static/info/'+row.icon"></image>
				</view>
				<text>{{row.name}}</text>
			</view>	
		</view>		
	</view>
</template>

<script>
	//const audio = uni.createInnerAudioContext()
	export default {
		data() {
			return {
				ifplay: 'continue.png',
				title:'',
				strings:'',
				sel_choice:[
					{
						name:"读",
						icon:"read.png"
					},
					{
						name:"听",
						icon:"listen.png"
					},
					{
						name:"练",
						icon:"test.png"
					}
				],
				showElement:false,
				audio: uni.createInnerAudioContext(),
				currentTime: 0, //当前进度(s)
				duration: 0, //总时长(s)
				paused: true, //是否处于暂停状态
				loading: false, //是否处于读取状态
				seek: false, //是否处于拖动状态
				sliderValue: 0,
				audiopath: "/music/test.mp3", //音频链接
				autoplay: false, //是否自动播放
				issliderchange: false,
				frameid: null ,//帧请求的id
			}
		},
		onLoad:
		function(e){
			console.log(e)
			uni.request({
				url:'https://unidemo.dcloud.net.cn/api/news/36kr/' + e.bookid,
				success: res => {
					this.title = res.data.title
					this.strings = res.data.content
				},
				fail: () => {},
				complete: () => {}
			})
		},
		methods: {
			 updateSliderValue() {
			    // 获取音频的当前播放进度，
			    // 假设 `this.audio` 是一个 HTMLAudioElement 实例
			    //const progress = this.audio.currentTime / this.audio.duration;
			
			    // 更新滑块 value，假设滑块的数据绑定是 `this.sliderValue`			    
			    if(!this.issliderchange){
					this.sliderValue = this.currentTime;
				}
			    // 如果音频还在播放，继续更新进度条
			    if (!this.audio.paused && !this.issliderchange) {
			      // 在下一帧更新滑块值
			      this.frameid = requestAnimationFrame(this.updateSliderValue);
			    }
			  },
			donext(index){
				if(index==0){
					this.sel_choice[0].icon = "read_sl.png"
					this.sel_choice[1].icon = "listen.png"
					this.sel_choice[2].icon = "test.png"
					this.showElement = false
					this.ifplay = 'continue.png'
					this.audio.pause()
				}
				else if(index==1){
					this.sel_choice[0].icon = "read.png"
					this.sel_choice[1].icon = "listen_sl.png"
					this.sel_choice[2].icon = "test.png"
					this.showElement = true
				}
				else if(index==2){
					this.sel_choice[0].icon = "read.png"
					this.sel_choice[1].icon = "listen.png"
					this.sel_choice[2].icon = "test_sl.png"
					this.showElement = false
					this.audio.pause()
				}
			},
			//格式化时长
			format(num) {
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
			//点击播放按钮
			play() {
				this.audio.play()
				this.updateSliderValue()
				// this.loading = true
			},
			sliderdrag(e){
				this.issliderchange = true;
				if(this.frameid != null){
					cancelAnimationFrame(this.frameid);
					this.frameid = null;
				}
				this.currentTime = e.mp.detail.value;
			},
			changestate() {
				//this.play()
				//this.audio.play()
				//this.ifplay = 'stop.png'
				if(this.audio.paused){
					//this.audio.onCanplay()
					this.play()
					this.ifplay = 'stop.png'
				}
				else{
					this.audio.pause()
					this.ifplay = 'continue.png'
				}
			},
			sliderchange(e){
				this.issliderchange = true
				this.audio.seek(e.detail.value)
				this.issliderchange = false
				//this.currentTime = e.detail.value
			}
		},
		created() {
			this.audio.src = require("../../music/test.mp3");
			/*if (this.audiopath) {
				this.audio.src = this.audiopath
				this.audio.autoplay = false
				//this.audio.pause()
				//console.log('音频地址'+this.src)
			}*/
			/*this.audio.onError((res) => {
			  console.log(res.errMsg);
			  console.log(res.errCode);
			});*/
			this.audio.obeyMuteSwitch = false
			//获取音频长度
			this.audio.onCanplay(() => {
				this.duration = this.audio.duration
			})
			//音频进度更新事件
			this.audio.onTimeUpdate(() => {
				// console.log('音频进度条发生更新')
				if(!this.issliderchange){
				   this.currentTime = this.audio.currentTime						
				}			
			})
			//音频播放事件
			this.audio.onPlay(() => {
				console.log('音频播放')
				this.paused = false
				this.loading = false
				console.log(this.audio.duration)
			})
			//音频暂停事件
			this.audio.onPause(() => {
				this.paused = true
			})
			//音频结束事件
			this.audio.onEnded(() => {
				// console.log('音频结束')
				this.paused = true
				this.currentTime = 0
				this.ifplay = "continue.png"
			})
			//音频完成更改进度事件
			this.audio.onSeeked(() => {
				// console.log('音频进度条完成')
				this.issliderchange = false
				this.$forceUpdate()
			})
	
			this.audio.onWaiting(() => {
				// console.log('XXXX')
				this.loading = true
				//console.log(this.audio.duration)
			})
			
			uni.addInterceptor('navigateBack',{
				success: (e) => {
					this.audio.stop()
				}
			})
		},
		watch:{
			sliderValue(newTime){
				if(this.issliderchange){
					if(this.audio.currentTime != newTime){
						//this.seek = true
						this.audio.currentTime = newTime;
					}					
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 10upx 2%;
		width: 96%;
		flex-wrap: wrap;
		align-items: center;
	}

	.title {
		text-align: center;
		line-height: 2em;
		font-weight: 700;
		font-size: 38upx;
	}
	
	.bottom_bar {
		    position: sticky;
	        width: 96%;
	        /* padding: 0 3%; */
			bottom: 0;
	        height: 6vw;
	        background-color: #ffaaf8;
	        border-radius: 24upx;
	        /*  阴影 */
	        box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
	        margin: 40upx 2% 0upx 2%;
	        display: flex;
	        align-items: center;
	        justify-content: center;
	    }
		
	.label {
	            display: flex;
	            flex-direction: column;
	            align-items: center;
	            justify-content: center;
	            width: 100%;
	            height: 7vw;
	            color: #000000;
	            font-size: 10upx;
	
	            .icon {
					position: relative;
	                width: 3vw;
	                height: 3vw;
	                margin: 0 1vw 0 1vw;
	                image {
	                    width: 3vw;
	                    height: 3vw;
	                    z-index: 9;
	                }
	            }
	        }
			
	.listen_box {
	        width: 46%;
	        /* padding: 0 3%; */
			position: sticky;
			top: 0;
	        height: 6vw;
	        background-color: #ffffff;
	        border-radius: 24upx;
	        /*  阴影 */
	        box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
	        /*margin: 40upx 2% 0upx 2%;*/
	        align-items: center;
	        justify-content: flex-start;
			margin: 0 auto;
			display: flex;
			z-index: 999;
			
			.lis_t{
				position: relative;
				align-items: center;
				margin: 0.5vw 0.5vw 0.5vw 0.5vw;
				width: 5vw;
				height: 5vw;
			}
			
			.audio_wrapper{
				position: absolute;
				align-items: center;
				left: 7vw;
				//width: 46%;
				display: flex;
				
				.audio_left{
					//display: flex;
					position: relative;
					align-items: flex-start;
					//height: 5vw;
					//margin-left: 10vw;
				}
				
				.audio_slider{
					position: relative;
					align-items: center;
					width: 20vw;
				}	
					
				.audio_right{
					position: relative;
					align-items: flex-end;
				}
			}
	    }
</style>
