<template>
	<view>
		<view class="heads">
		   <image class="heads_retangle" src="/static/ret.png"></image>
		   <text class="heads_text">阅读文本推荐</text>
		</view>
		<view class="readtext">
			<view class="read_list">
				<view class="read_list_cell" hover-class="read_list_hover" v-for="(item,index) in readlist" :key="item.title" @tap="openinfo" :data-newid="item.post_id">
					<view class="read_body">
					    <!--<image class="read_image" :src="item.author_avatar"></image>-->
						<image class="read_image" src="/static/logo.png"></image>
						<view class="read_title">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				readlist:[]
			}
		},
		onLoad: function(){
						uni.request({
							url: 'https://unidemo.dcloud.net.cn/api/news',
							method: 'GET',
							data: {},
							success: res => {
								console.log(res)
								this.readlist = res.data
							},
							fail: () => {},
							complete: () => {}
						});
		},
		methods: {
			openinfo(e) {
				var bookid = e.currentTarget.dataset.newid
				uni.navigateTo({
					url: '/pages/info/info?bookid=' + bookid,
					success: res => {
						console.log(bookid)
						console.log("打开成功")
					},
					fail: () => {
						console.log("打开失败了")
					},
					complete: () => {}
				});
			}			
		}
	}
</script>

<style>
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
	
	.read_body{
	        width: 96%;
	        /* padding: 0 3%; */
	        height: 22vw;
	        background-color: #fefefe;
	        border-radius: 24upx;
	        /*  阴影 */
	        box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
	        margin: 40upx 2% 0upx 2%;
	        display: flex;
	        align-items: center;
	        justify-content: flex-start;
			position: relative;
	    }
	
	.read_image{
		position:absolute;
		width: 20vw;
		height: 20vw;
		object-fit: contain;
	}
	
	.read_title{
		position: absolute;
		left: 22vw;
		right: auto;
		color: #000000;
		font-size: 2em;
	}
  
</style>
