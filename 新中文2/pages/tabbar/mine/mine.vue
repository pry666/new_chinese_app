<template>
<view class="content">
  <view class="header">
            <image class="face" :src="userinfo.face"></image>
            <view class="username">{{userinfo.username}}</view>
			<text class="level">您的阅读水平等级为：{{level}}</text>
            <image class="setting" src="/static/mine/setting.png"></image>
    </view>
	<view class="box">
		<view class="label" v-for="(row,index) in orderTypeList" :key="row.name">
			<view class="icon">
				<image :src="'/static/mine/'+row.icon"></image>
			</view>
			<text>{{row.name}}</text>
		</view>
	</view>
</view>
</template>

<script>
	import apprequest from "@/common/appurl.js"
	export default {
		data() {
			return {
				userinfo:{},
				level : 0,
				orderTypeList:[
					{
						name: '已阅读',
						icon: 'have_read.png'
					},
					{
						name:'阅读历史',
						icon:'history.png'
					},
					/*{
						name:'我的笔记',
						icon:'note.png'
					}*/
				],
			}
		},
		onShow:	function(){		
			//this.init();
			uni.request({
				url: apprequest.urlMap.getusr+"?uid=1",
				method: 'GET',
				data: {
				},
				success: res => {
					this.userinfo={
						face:'/static/mine/face.png',
						username: res.data[0].username,
					}
					this.level = res.data[0].userscore/20
				},
				fail: () => {},
				complete: () => {}
			});
		}
		,
		methods: {
			init(){
				this.userinfo={
					face:'/static/mine/face.png',
					username:"管理员"
				}
			}
		}
	}
</script>

<style lang="scss">

    .content {
		flex-direction: column;
		align-items: center;
		justify-content: center;
    }
	
    .header {
		display: flex;
        background-color: #76cee1;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		position: relative;
		height: 75px;
		width: 100%;
		margin: 0;
		overflow: hidden;
		border-radius: 24upx;
    }
	
	.face {
			position:absolute;
			width: 70rpx;
			height: 70rpx;
			object-fit: contain;
	}

	.username {
		position: absolute;
		left: 80rpx;
		font-family: btt;
		width: 100%;
		color: #fff;
		font-size: 20upx;
	}

    .level{
		position: absolute;
		left: 50%;
		top: 50%;
		font-family: btt;
		width: 100%;
		color: #aa0000;
		font-size: 20upx;
	}
	.setting {
		position:absolute;
		right: 0;
		height: 70rpx;
		width: 70rpx;
		object-fit: contain;
	}
    
	.box {
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
	        justify-content: center;
	    }
	
	.label {
	            display: flex;
	            flex-direction: column;
	            align-items: center;
	            justify-content: center;
	            width: 100%;
	            height: 16vw;
	            color: #666666;
	            font-size: 26upx;
	
	            .icon {
	                position: relative;
	                width: 7vw;
	                height: 7vw;
	                margin: 0 1vw 2vw 1vw;
	
	                // 文字上的图片
	                image {
	                    width: 7vw;
	                    height: 7vw;
	                    z-index: 9;
	                }
	            }
	        }
	
</style>
