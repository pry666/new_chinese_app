<template>
	<view>
		<view class="heads">
		   <image class="heads_retangle" src="/static/ret.png"></image>
		   <text class="heads_text">阅读水平测试</text>
		</view>
		<!--<u-subsection :list="list0" :current="current" @change="sectionChange"></u-subsection>

		
		<view v-if="current==1">
        <u-tabs @change="tabsChange($event,'paperView')" :current="paperView" :list="list1" :scrollable="false" lineWidth=50 itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"></u-tabs>
		
		<view class="u-flex u-flex-row" style="background-color: white;align-items: flex-end;">
			<view class="u-p-15">
				<u-button type="success" size="mini" @click="jumpToAddPaper()">新增试卷</u-button>
			</view>
		</view>
		
		<view v-for="(item,index) in paperList">
			<view v-if="item.state == 0" class="shadow-border card-view">
				<view class="card-view-top">
					<view>
						<u-icon class="topicon" name="file-text-fill" color="#2979ff"></u-icon>
						<text class="toptext">{{item.paperName}}</text>
					</view>
					<view>
						<u-button @click="changePaperState(item,1)" type="warning" size="mini" class="topbutton">发布</u-button>
						<u-button class="del_button" color="#aa0000" size="mini" @click="deletePaper(item)">删除</u-button>
					</view>
				</view>
				<view class="card-view-bottom">
					 <view><u-icon class="bottomicon" name="clock-fill" color="#bdbeae"></u-icon> <text class="bottomtext">{{item.createTime}}</text> </view>
                     <view>
							<u-button class="mybtn-blue" color="#0000ff" size="mini" @click="jumpToEditPaper(item)">编辑试卷</u-button>
					 </view>
					 <view><u-button class="bottombutton" type="success" size="mini" @click="jumpToEditQuestion(item)">编辑试题</u-button></view>
					
			    </view>
			</view>
		</view>-->
			
			<!--<view v-if="item.state == 1" class="shadow-border card-view">
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
			
		</view>
		</view>-->
			<view class="content">
				<view class="text-area">
					<text class="title">测试说明</text>
				</view>
			</view>
		<u-button class="buttontest" type="warning" shape="circle" @tap="jump">进入测试</u-button>
		
		
	</view>
</template>

<script>
	import apprequest from "@/common/appurl.js"
	export default {
		data() {
			return {
				title: 'Hello',
				paperView:0,
				tabScrollTop: 0,
				currentId: 1,
				testList:[],
				paperList:[],
				current:0,
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
		onShow() {
			this.paperView = 0;
			this.getPaper(0);
		},
		methods: {
            jump: function(){
				uni.navigateTo({
					url:'/pages/public/examPage?pid=1'
				})
			},
			jumpToAddPaper(){
				uni.navigateTo({
					url:"/pages/public/addPaper"
				});	
		    },
			tabsChange(index,name) {
				this[name] = index;
				/*if(name=='testView'){
					this.getTest(index);
				}else{
					this.getPaper(index);
				}*/
			},			
			sectionChange(index){
				this.current = index;
				console.log(index);
				/*if(index==0){
					this.getTest(0);
				}else{
					this.getPaper(0);
				}*/
				if(index==1){
					this.getPaper(0);
				}
			},
			getPaper(state){
				//console.log(apprequest.urlMap.getpaper)
				uni.request({
					url: apprequest.urlMap.getpaper,
					method:"GET",				
					//url: "http://106.75.250.96:9252/getpaperlist",
					data:{},
					success:(res)=>{
						console.log("success");
						this.paperList = res.data;
					},
					fail: ()=>{
						console.log("error");
					}
				})
			},
			deletePaper(item){
				uni.request({
					url: apprequest.urlMap.delpaper,
					method:"POST",				
					//url: "http://106.75.250.96:9252/getpaperlist",
					data:{
						pid: item.pid
						},
					success:(res)=>{
						console.log("success");
						uni.showModal({
							title:"成功",
							content:"删除成功",
							showCancel:false,
							success:function(res){
								if(res.confirm){
									location.reload();
								}
							}
						})
						
					},
					fail: ()=>{
						console.log("error");
					}
				})				
			}
		}
	}
</script>

<style lang="scss">
	@import url('/font/font.css');
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
			font-size: 20px;
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
	
	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
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

	
	.u-p-15{
		width: 10vw;
		height: 7vw;
		right: 3vw;
		position: absolute;
	}
	
	.shadow-border {
	        width: 96%;
	        /* padding: 0 3%; */
	        height: 10vw;
	        background-color: #fefefe;
	        border-radius: 24upx;
	        /*  阴影 */
	        box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
	        margin: 40upx 2% 0upx 2%;
	        display: flex;
	        align-items: flex-start;
	        justify-content: flex-start;
	    }
		
	.card-view-top{
		display: flex;
		position: absolute;
		margin-left: 3vw;
		height: 5vw;
		width: 90%;
		align-items: flex-start;
		justify-content: flex-start;
	}
	
	.topicon{
		display: flex;
		position: absolute;
		margin-left: 0;
		margin-top: 2vw;
		width: 5vw;
	}
	
	.toptext{
		display: flex;
		position: absolute;
		margin-left: 7vw;
		margin-top: 2vw;
		font-size: 10upx;
	}
	
	.topbutton{
		display: flex;
		position: absolute;
		margin-top: 2vw;
		width: 7vw;
		right: 0;
	}
	
	.card-view-bottom{
		display: flex;
		position: absolute;
		height: 3vw;
		margin-top:6vw;
		margin-left: 3vw;
		width: 90%;
		align-items: flex-start;
		justify-content: flex-start;
	}
	
	.buttomicon{
		display: flex;
		position: absolute;
		margin-left: 0;
		margin-top: 4vw;
		width: 5vw;
	}
	
	.bottomtext{
		display: flex;
		position: absolute;
		margin-left: 7vw;
		margin-top: -1.5vw;
		font-size: 5upx;
		color: gray;
	}
	
	.mybtn-blue{
		display: flex;
		position: absolute;
		width: 10vw;
		right: 11vw;
	}	
	
	.bottombutton{
		display: flex;
		position: absolute;
		width: 10vw;
		right: 0;
	}	
	
</style>
