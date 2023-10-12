<template>
	<view>
		
		<view class="shadow-border" style="background-color: white;border-radius: 15rpx;padding-bottom: 20rpx;">
			<u-tabs ref="tabs" :list="list" :is-scroll="false"></u-tabs>
		</view>	
		<view class="u-p-l-10 u-p-r-10">
			<view class="shadow-border card-view">
				<view class="card-view-top">
					<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>这是一个考试嗷嗷</text></view><view><u-button type="warning" size="mini">发布</u-button></view>
				</view>
				<view class="u-border-bottom"></view>
				<view class="card-view-bottom">
					 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="lightgray"></u-icon> <text class="u-tips-color">2022-10-15 00:15</text> </view>
					 <view><u-button type="primary" size="mini">编辑试卷</u-button></view>
					 <view><u-button type="success" size="mini">编辑试题</u-button></view>
				</view>
			</view>
			
			<view class="shadow-border card-view">
				<view class="card-view-top">
					<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>这是一个考试嗷嗷</text></view><view><u-button type="error" size="mini">撤回</u-button></view>
				</view>
				<view class="u-border-bottom"></view>
				<view class="card-view-bottom">
					 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="lightgray"></u-icon> <text class="u-tips-color">2022-10-15 00:15</text> </view>
					 <view><u-button type="success" size="mini">添加考生</u-button></view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
			data() {
				return {
					user:"",
					paperList:[],
					selType:0,
					list: [{
							name: '待发布'
						}, {
							name: '已发布'
						}]
				}
			}
		}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
</style>