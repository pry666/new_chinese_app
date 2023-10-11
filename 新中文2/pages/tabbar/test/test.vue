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
		
        <!--<u-tabs @change="tabsChange($event,'paperView')" :current="paperView" ref="tabs" :list="list1" :is-scroll="false"></u-tabs>-->
		
		<view class="u-flex u-flex-row" style="background-color: white;justify-content: flex-end;">
			<view class="u-p-15">
				<u-button type="success" size="mini" @click="jumpToAddPaper()">新增试卷</u-button>
			</view>
		</view>
		
		<!--<view v-for="(item,index) in paperList">
			<view v-if="item.state == 0" class="shadow-border card-view">
				<view class="card-view-top">
					<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>{{item.paperName}}</text></view><view><u-button @click="changePaperState(item,1)" type="warning" size="mini">发布</u-button></view>
				</view>
				<view class="u-border-bottom"></view>
				<view class="card-view-bottom">
					 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="lightgray"></u-icon> <text class="u-tips-color">{{item.createTime}}</text> </view>
                     <view>
							<view class="mybtn-blue" @click="jumpToEditPaper(item)">编辑试卷</view>
					 </view>
					 <view><u-button type="success" size="mini" @click="jumpToEditQuestion(item)">编辑试题</u-button></view>
					
				</view>
			</view>
			
			<view v-if="item.state == 1" class="shadow-border card-view">
				<view class="card-view-top">
					<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>{{item.paperName}}</text></view><view><u-button @click="changePaperState(item,0)" type="error" size="mini">撤回</u-button></view>
				</view>
				<view class="u-border-bottom"></view>
				
				<view>
					<view class="card-view-bottom u-m-b-20 u-m-r-20" style="justify-content: space-between;">
						<view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="#2979ff"></u-icon>待考：<text class="u-tips-color">{{item.unStartNum}}</text></view>
						<view><u-icon style="margin-right: 10rpx;" name="checkmark-circle-fill" color="#71d5a1"></u-icon>合格：<text class="u-tips-color">{{item.passNum}}</text></text></view>
						<view><u-icon style="margin-right: 10rpx;" name="close-circle-fill" color="#dd6161"></u-icon>不合格：<text class="u-tips-color">{{item.failNum}}</text></text></view>
						
					</view>
					<view class="u-border-bottom"></view>
				</view>
				
				<view class="u-flex u-row-between u-p-t-20">
					 <view><u-button type="primary" @click="jumpToUserInfo(item)" size="mini">考试明细</u-button></view>
					 <view><u-button type="success" @click="jumptoAddUser(item)" size="mini">添加考生</u-button></view>
				</view>
			</view>
			
		</view>-->
		<u-button class="buttontest" type="warning" shape="circle" @tap="jump">进入测试</u-button>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				paperView:0,
				tabScrollTop: 0,
				currentId: 1,
				testList:[],
				paperList:[],
				list: [{
						name: '等待考试'
					}, {
						name: '考试合格'
					}, {
						name: '考试不合格'
					}],	
				list0: [
					{
						name: '考试记录'
					}, 
					{
						name: '试卷管理'
					}
				],list01: [
					{
						name: '考试记录'
					}
				],list1: [
					{
						name: '未发布'
					}, 
					{
						name: '已发布'
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
            jump: function(){
				uni.switchTab({
					url:'/pages/tabbar/read/read'
				})
			},
			jumpToAddPaper(){
				uni.navigateTo({
					url:"/pages/public/addPaper"
				});	
		    },
			tabsChange(index,name) {
				this[name] = index;
				if(name=='testView'){
					this.getTest(index);
				}else{
					this.getPaper(index);
				}
			},
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
	
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
	.mybtn-blue{
		font-size: 12px;border-radius:5px;padding:0 11px;background-color: #2979ff;height: 27px;width: auto;line-height: 27px;color:white;
	}
</style>
