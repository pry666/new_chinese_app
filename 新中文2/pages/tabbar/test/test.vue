<template>
	<view>
		<view class="heads">
		   <image class="heads_retangle" src="/static/ret.png"></image>
		   <text class="heads_text">阅读水平测试</text>
		</view>
		<view class="content">
			<view class="text-area">
				<text class="title">测试说明</text>
			</view>
		</view>
		<button class="buttontest" @tap="jump">进入测试</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
            jump: function(){
				uni.switchTab({
					url:'/pages/tabbar/read/read'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
    .heads{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		height: 90rpx;
		.heads_retangle{
			height: 100%;
			width: 100%;		
			margin-top: 0rpx;

		}
		.heads_text{
			position: absolute;
			top:  50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-family: btt;
			font-size: 40px;
			color: #FFFFFF;
			text-shadow: 0 2px 4px rgba(0,0,0,0.50);			
		}
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.buttontest{
		margin-top: 460rpx;
		height: 50rpx;
		width: 150rpx;
	}
</style>
