<template>
	<view>
		<view class="heads">
		   <image class="heads_retangle" src="/static/ret.png"></image>
		   <text class="heads_text">阅读文本推荐</text>
		</view>
		<view class="readtext">
			<view class="read_list">
				<view class="read_list_cell" hover-class="read_list_hover" v-for="(item,index) in currentpagedata" :key="item.title" @tap="openinfo" :data-newid="item.id">
					<view class="read_body">
					    <!--<image class="read_image" :src="item.author_avatar"></image>-->
						<image class="read_image" src="/static/logo.png"></image>
						<view class="read_title">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class = "footer">
			<button @tap="currentpage = 1" :disabled="currentpage == 1" style="height: 5vw;font-size: 1upx;">首页</button>
			<button @tap="prevpage" :disabled="currentpage == 1" style="height: 5vw;font-size: 1upx;">上一页</button>
			<view v-if="Math.floor((currentpage-1)/pagemax)!=0">
			<button @tap="prevlistpage" :disabled="Math.floor((currentpage-1)/pagemax)==0" style="height: 5vw;font-size: 1upx;">...</button>
		    </view>
		    <button class="footbutton" v-if="(Math.floor((currentpage-1)/pagemax)*pagemax+page) <= totalpages" v-for="page in createArray(pagemax)" :key="page" @click="changePage(Math.floor((currentpage-1)/pagemax)*pagemax+page)" :class="{active: (Math.floor((currentpage-1)/pagemax)*pagemax+page) == currentpage}">
				 {{(Math.floor((currentpage-1)/pagemax))*pagemax+page}}
		    </button>
			<view v-if="currentpage < Math.floor(((totalpages-1)/pagemax))*pagemax+1">
			<button @tap="nextlistpage" :disabled="currentpage == totalpages" style="height: 5vw;font-size: 1upx;">...</button>
			</view>
 			<button @tap="nextpage" :disabled="currentpage == totalpages" style="height: 5vw;font-size: 1upx;">下一页</button>
			<button @tap="currentpage = totalpages" :disabled="currentpage == totalpages" style="height: 5vw;font-size: 1upx;">末页</button>
		</view>
	</view>
</template>

<script>
	import apprequest from "@/common/appurl.js"
	export default {
		data() {
			return {
				readlist:[],
				pagesize: 1,
				currentpage: 1,
				pagemax : 3//底部最多显示多少
			}
		},
		onShow: function(){
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news',
				//url : apprequest.urlMap.readtext+'?level=5',
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
		computed:{
			totalpages(){
				return Math.ceil(this.readlist.length / this.pagesize);
			},
			currentpagedata(){
				const start = (this.currentpage - 1) * this.pagesize;
				const end = start + this.pagesize;
				return this.readlist.slice(start,end);
			}
		},
		methods: {
			changePage(pagenumber){
				this.currentpage = pagenumber;
			},
			prevlistpage(){
				this.currentpage = Math.floor((this.currentpage-1)/this.pagemax)*this.pagemax;
			},
			prevpage(){
				if(this.currentpage > 1){
					this.currentpage--;
				}
			},
			nextlistpage(){
				this.currentpage = (Math.floor((this.currentpage-1)/this.pagemax)+1)*this.pagemax+1;
			},
			nextpage(){
				if(this.currentpage < this.totalpages){
					this.currentpage++;
				}
			},
			createArray(n) {
			    let arr = [];
			    for(let i = 1; i <= n; i++) {
			      arr.push(i);
			    }
			    return arr;
			},
			openinfo(e) {
				//var bookid = e.currentTarget.dataset.newid
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

<style scoped lang="scss">
@import url('/font/font.css');
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
		font-size: 25upx;
	}
  
    .active{
		background-color: red;
	}
	
	.footer{
		display: flex;
		gap: 0.5vw;
		position: sticky;
		bottom: 50rpx;
		height: 10vw;
		background-color: #ffaaf8;
		border-radius: 24upx;
		/*  阴影 */
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.footbutton{
			display: flex;
			justify-content: center;  // 让文字在水平方向居中
			align-items: center;  // 让文字在垂直方向居中
			text-align: center;
			margin: 0 auto;
			color: black;
			border-radius: 5px;
			height: 5vw;
			width: 5vw;  // 宽度也设置为 5vw 让它成为一个方形按钮
			font-size: 1vw; // 让字体大小更大一点
		}
	}
	

</style>
