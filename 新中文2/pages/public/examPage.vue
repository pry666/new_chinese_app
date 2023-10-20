<template>
	<view class="examdetail">
		<view class="u-m-r-30" style="display: flex;justify-content: center;">
			<view class=" u-p-10" style="display: flex;justify-content: center;gap: 10vw;">
					<u-button type="success" size="medium" @tap="examsubmit">提交</u-button>
					<view v-if="pid!=1"><u-button type="warning" size="medium" style="width: 10vw;font-size: 36upx;" @tap="back">返回</u-button></view>
			</view>
		</view>
		<view class="examtypes">
			<swiper class="examtypes-swiper" :current="currentindexpage" @change="change">
				<template v-for="(itemcard,indexcard) in examdata.examlist">
					<swiper-item>
						<view class="swiper-item">
								<view class="exam-type">
									{{indexcard+1}}.{{itemcard.realType == 1 ? '判断':'单选'}}题（20分）
								</view>
								<view class="exam-content">
									{{itemcard.examcontent}}
								</view>
								<view class="exam-optionlist">
									<!-- 正常考试 -->
									<view @tap="changChecked(index,itemcard.type)" :class="{ examactive: optionsel.checked }"
									 v-for="(optionsel, index) in itemcard.optionlist" class="exam-option_item">
										<view class="exam-option_item_option">
											{{index == 0?'A':''}}
											{{index == 1?'B':''}}
											{{index == 2?'C':''}}
											{{index == 3?'D':''}}
										</view>
										<view class="exam-option_item_text">
											 {{optionsel.name}}
										</view>
									</view>
								</view>
						</view>
					</swiper-item>

				</template>
			</swiper>

		</view>
		<!-- 倒计时 -->
		<view class="exam-countdown">
			<!-- <view v-if="!analysis" class="exam-coundown_time" :class="{coundown_end:coundown_end}">
				倒计时：<tui-countdown :time="endtimeconfig.time" @end="endtime" @time="time"
					:borderColor="endtimeconfig.borderColor" :size="endtimeconfig.size" :color="endtimeconfig.color"
					:colonColor="endtimeconfig.colonColor" :hours="false" :returnTime="true"></tui-countdown>
			</view> -->
			<view class="exam-coundown_page">
				<u-button @tap="pageswitch(0)" class="exam-page_btn">
					上一题
				</u-button>
				<view class="exam-page_length" @tap="card_off">
					题卡（{{currentindexpage + 1}}/{{examdata.examlist.length}}）
				</view>
				<u-button @tap="pageswitch(1)" class="exam-page_btn">
					下一题
				</u-button>
			</view>
		</view>
		<!-- 题卡 -->
		<view backgroundColor="#24222200" mode="bottom" :visible="examvisible" @tap="card_off">
			<view class="exam-card">
				<view class="exam-card_title">
					题卡
				</view>
				<!-- 正常考试 -->
				<view class="exam-card_list">
					<view @tap="selectexam(index)" class="exam-card_item" v-for="(item,index) in examdata.examlist"
						:class="{'exam-card_blue':answerlist[index],'exam-card_bluecur':answerlist[index] && index == currentindex,'exam-card_graycur':answerlist[index] == undefined && index == currentindex}">
						{{index + 1 }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appRequest from "@/common/appurl.js";
    import { onLoad } from "../../uni_modules/uview-ui/libs/mixin/mixin";
	export default {
		data() {
			return {
				examvisible: false, // 答题卡显示隐藏
				analysis: '', // 是否是答题解析
				headline: {
					headline: '2010新人入职培训结业考试',
					gobackurl: '', // 返回页面
					tabbar: false, // 是否是tab页
					stop: true //是否阻止返回
				}, // 标题
				currentindexpage: 0, // 手动滑屏下标
				currentindex: 0, // 手动切换题目下标
				coundown_end: false, // 倒计时结束class控制
				answerlist: [], // 记录答案
				currlist: [], // 最终答案, // 配置倒计时
				questionList:[],
				examdata: {
					"examtype": "0", // 考试类型
					"examlength": 5, // 考试题数
					"examtitle": "模拟测试", // 考试标题
					"examlist":[]
				}, // 考试数据
				tid:"",
				pid: "",
				paperData:"",
				testData:"",
				score:0
			};
		},
		onLoad: function(e){
			this.pid = e.pid;
		}
		,
		mounted(detail) {
			
			this.analysis = false;
			//this.pid = detail.pid;
			//this.pid = 1;
			this.getQuestionList();
			// 取消
			// 确认
			uni.$on("btnaffirm", res => {
				if (res == 0) {
					// 确认
					this.submitconfig.submitmodal = false
					this.submitanswer()
					this.gotoexamresult()
				} else {
					// 继续答题
					this.submitconfig.submitmodal = false
				}
			})
			// 我知道了
			uni.$on("btngot", res => {
				if (res == 2) {
					this.submitconfig.submitmodal = false
					this.gotoexamresult()
				}
			})
			// 监听页面返回
			// uni.$on("goback", res => {
			// 	console.log("页面返回")
			// 	this.examsubmit()
			// 	// return
			// })
		},
		onBackPress(e) {
			// if (e.from == "backbutton") {
			// 	this.examsubmit()
			// 	return true
			// }
		},
		// 监听页面卸载
		onUnload() {
			uni.$off("btncancel")
			uni.$off("btnaffirm")
			uni.$off("btngot")
		},
		components: {

		},
		methods: {
			getQuestionList(){
				let _this = this;
				uni.request({
					method: "GET",
					url: appRequest.urlMap.queryListForExam + "?pid=" + _this.pid,
					data:{
					},
					success: function(res) {		
						    console.log(res);
						    //var getdata= JSON.stringify(res.data);
					if (res.statusCode == 200) {
							_this.questionList = res.data[0].question;
							var list = _this.formatQuestion();
							
							_this.examdata = {
								"examtype": "0", // 考试类型
								"examlength": _this.questionList.length, // 考试题数
								"examlist":list
							}; // 考试数据
							
							//console.log(JSON.stringify(_this.examdata));
						}else{
							console.log("获取失败");
						}
					},
					fail: function(res) {
						console.log("请求异常");
					}
				})
				
			},
			// 提交按钮点击弹出选择框
			examsubmit() {
				console.log("提交")
				// console.log(this.examdata.examlength);
				//console.log(this.answerlist);
				let currlist = []
				this.answerlist.forEach((item, index) => {
					if (item) {
						currlist.push(item)
					}
				})
				this.currlist = currlist;
				//console.log(currlist);
				//console.log(this.examdata.examlength, this.currlist.length);
				if (this.examdata.examlength == this.currlist.length) {
					var hisList = [];
					this.score = 0
					for(let i = 0;i<this.questionList.length;i++){
						var obj = this.questionList[i];
						var usrRes = "";
						usrRes = this.getResByNum(this.currlist[i].answer);
						if(usrRes == obj.rightAns){
							this.score += 20;
						}
						hisList.push({userAns:usrRes,rightAns:obj.rightAns,tid:this.tid,pid:this.pid,res:usrRes == obj.rightAns?1:0,qid:obj.qid});
					}
					//this.editExamTest(this.score,this.tid);
					if(this.pid == 1){
						this.cot(this.score);
						console.log(this.score);						
					}
                    else if(this.score == 100){
						uni.showModal({
							content:"恭喜你全对!",
							showCancel:false,
							success(res) {
	                          uni.switchTab({
								  url:'/pages/tabbar/read/read'
							  })
							}
						})													
					}
					else{
						uni.showModal({
							content:"你的答案有错，点击确认查看结果反馈并请重新阅读",
							showCancel:false,
							success(res) {
							  var content = ""
							  for(var i = 0;i<hisList.length;i++){
								  content+='\r\n'+(i+1)+". "+hisList[i].userAns
								  if(hisList[i].userAns == hisList[i].rightAns){
									  content+='  正确';
								  }else{
									  content+='  错误';
								  }
							  }
	                          uni.showModal({
								  title: "结果反馈",
								  content:"你的答案："+ content
							  })
							}
						})						
					}
				} else if (this.examdata.examlength > this.currlist.length) {
					let undone = this.examdata.examlength - this.currlist.length;
					uni.showModal({
						content:"还有"+undone+"道题未完成",
						success(res) {
							if(res.confirm){
							}
						}
					})
					
				}
			},
			formatQuestion(){
				var resList = [];
				var _this = this;
				//var scoreName = ['singleScore','multiScore','judgeScore']
				for(var i=0;i<this.questionList.length;i++){
					//this.anllist.push("1");
					var obj = this.questionList[i];
					var optionlist = [];
					optionlist.push({name:obj.ansA,checked: false});
					optionlist.push({name:obj.ansB,checked: false});
					if(obj.type==0){
						optionlist.push({name:obj.ansC,checked: false});
						optionlist.push({name:obj.ansD,checked: false});
					}
					
					var res = {
						id:obj.qid,
						type:obj.type==1?1:0,
						realType:obj.type,
						examcontent:obj.context,
						optionlist:optionlist
					}
					resList.push(res);
				}
				
				return resList;
				
			},
			getResByNum(num){
				let usrRes = ""
				switch (num){
					case 0:
						usrRes+='A';
						break;
					case 1:
					usrRes+='B';
						break;
					case 2:
					usrRes+='C';
						break;
					case 3:
					usrRes+='D';
						break;
					default:
						break;
				}
				return usrRes;
			},
			// 卡片滑动
			change(e) {
				const {
					current
				} = e.detail
				console.log(current)
				this.currentindex = current
				this.currentindexpage = current
			},			
			cot(score){
				uni.showModal({
					content:"提交成功，你获得了"+score+"分",
					showCancel:false,
					success(res) {
						if(res.confirm){
							uni.request({
								url: appRequest.urlMap.updateuser,
								method:"POST",
								data:{
									uid : 1,
									score: score
								},
								success(res) {
									console.log("成功");
									uni.switchTab({
										url: '/pages/tabbar/mine/mine'
									})
								},
								fail: () => {},
								complete: () => {}
								
							})

						}
					}
				})
			},
			addExamHisList(newscore,tid){
				let _this = this;
				uni.request({
					method: "POST",
					url: appRequest.urlMap.updateuser,
					data:{
						score : newscore,
						uid : tid
					},
					success: function(res) {
						if (res.data.statusCode == 200) {
							
							uni.showModal({
								content:"提交成功，你获得了"+_this.score+"分，成绩",
								showCancel:false,
								success(res) {
									if(res.confirm){
										uni.navigateBack({
											
										})
									}
								}
							})
							
							
						} else {
							console.log('提交失败');
						}
					},
					fail: function(res) {
						console.log("请求异常");
					}
				})
			},
			// 单选
			changChecked(index, type) {
				// console.log(index, type);
				console.log(this.currentindex);
				if (this.examdata.examlist[this.currentindex].optionlist[index].checked) {
					this.examdata.examlist[this.currentindex].optionlist[index].checked = false;
					this.answerlist[this.currentindexpage] = undefined
					return
				}
				this.examdata.examlist[this.currentindex].optionlist.forEach((item, index) => {
					item.checked = false;
				})
				this.examdata.examlist[this.currentindex].optionlist[index].checked = !this.examdata.examlist[this
					.currentindex].optionlist[index].checked;
				this.answerlist[this.currentindexpage] = ({
					"index": this.currentindexpage,
					"answer": index
				})
				console.log(this.answerlist);
			},
			// textarea输入
			valuecontent() {
				if (this.examdata.examlist[this.currentindex].answer.trim().length == 0) {
					this.answerlist[this.currentindexpage] = undefined
					return;
				} else {
					this.answerlist[this.currentindexpage] = ({
						"index": this.currentindexpage,
						"answer": this.examdata.examlist[this.currentindex].answer
					})
				}
			},
			// 题卡切换
			pageswitch(index) {
				// console.log(this.currentindexpage);
				if (index) {
					let curlength = this.examdata.examlength
					if (this.currentindexpage < curlength - 1) {
						this.currentindexpage = this.currentindexpage + 1
					}
				} else {
					if (this.currentindexpage > 0) {
						this.currentindexpage = this.currentindexpage - 1
					}
				}
			},
			// 提交试卷答案
			submitanswer() {
				console.log("提交试卷答案")
				console.log(this.currlist)
			},
			// 跳转到考试结果
			gotoexamresult() {
				let result = {
					//"title": this.examdata.examtitle,
					"submittime": new Date().getTime(),
					"resultnum": 90,
					"subjective": 3,
					"objective": 3,
					//"residuetime": this.residuetime,
					"accuracy": 90,
					"jige": 60,
					"msg": "待测评"
				};
				result = JSON.stringify(result)
				/*uni.redirectTo({
					url: `/pages/examresult/examresult?result=${result}`
				});*/
				uni.switchTab({
					url:'/pages/tabbar/test/test'
				})
			},
			// 关闭题卡
			card_off() {
				this.examvisible = !this.examvisible
			},
			// 选题卡选题
			selectexam(index) {
				this.examvisible = false;
				this.currentindexpage = index;
			},
			back(){
				uni.navigateBack({});
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.examdetail {
		width: 100%;
		height: 100%;

		.exam-submit {
			width: 70rpx;
			height: 70rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ff0000;
			margin: 0;
			padding: 0;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 28rpx;
		}

		.examtypes {
			width: 100%;
			height: 80%;

			.examtypes-swiper {
				height: 100%;
				width: 100%;

				.swiper-item {
					width: 92%;
					padding: 0 30rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #909090;
					height: 100%;

					.exam-type {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #909090;
						padding-top: 44rpx;
					}

					.exam-content {
						width: 100%;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202020;
						line-height: 44rpx;
						margin-top: 40rpx;
					}

					.exam-optionlist {
						padding-top: 44rpx;
						display: flex;
						flex-direction: column;
						padding-bottom: 15rpx;

						.exam-option_item {
							margin-bottom: 24rpx;
							width: 100%;
							min-height: 98rpx;
							background: #F6F6F6;
							border-radius: 10rpx;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							box-sizing: border-box;
							border: 2rpx solid #FFFFFF;

							.exam-option_item_option {
								width: 48rpx;
								height: 48rpx;
								background: #F6F6F6;
								border: 2rpx solid #B2B2B2;
								border-radius: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
								margin-left: 30rpx;

							}

							.exam-option_item_text {
								margin-left: 44rpx;
								width: 535rpx;
								padding: 30rpx 0;
							}
						}

						.examactive {
							background: #F6F6F6;
							border: 2rpx solid #ff0000;

							.exam-option_item_option {
								background-color: #ff0000;
								color: #FFFFFF;
								border: 2rpx solid #ff0000;
							}
						}
					}

					.exam-input {
						width: 100%;
						// height: 800rpx;
						background: #F6F6F6;
						box-sizing: border-box;
						border-radius: 10rpx;
						margin-top: 44rpx;
						margin-bottom: 44rpx;

						textarea {
							width: 94%;
							// height: 760rpx;
							padding: 20rpx 3%;
						}

						.textarea {
							width: 94%;
							padding: 20rpx 3%;
						}
					}

					.examdetail-analysis {
						width: 690rpx;

						.examdetail-analysis_title {
							width: 100%;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #ff0000;
							line-height: 44rpx;
						}

						.exammistake {
							color: $uni-color-error;
						}

						.examdetail-analysis_content {
							width: 92%;
							// height: 212rpx;
							background: #EEEEEE;
							border-radius: 10rpx;
							margin-top: 23rpx;
							padding: 4%;

							.examdetail-analysis_content_op {
								width: 100%;
								display: flex;
								justify-content: flex-start;
								font-size: 20rpx;
								color: #202020;

								.title {
									width: 18%;
								}

								.text {
									width: 82%;
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 500;
									line-height: 30rpx;

								}

								.answer {
									color: #ff0c1c;
								}

							}
						}
					}
				}


			}


		}

		.exam-countdown {
			position: fixed;
			bottom: 35vw;
			width: 100%;
			display: flex;
			flex-direction: column;
			// border-top: 2rpx solid #000000;

			.exam-coundown_time {
				width: 100%;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-weight: bold;
				text-align: center;
				color: #ff0000;
				margin: 22rpx 0;
				display: flex;
				justify-content: center;
			}

			.coundown_end {
				color: $uni-color-error;
			}

			.exam-coundown_page {
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 22rpx 0 36rpx 0;

				.exam-page_length {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202020;
				}

				.exam-page_btn {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #909090;
				}
			}
		}

		.exam-card {
			position: relative;
			width: 100%;
			height: 50%;
			bottom: 15vw;
			background: #FFFFFF;
			border-radius: 30rpx 30rpx 0px 0px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.exam-card_title {
				width: 92%;
				padding: 0 4%;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202020;
				//padding: 2rpx 0;
			}

			.exam-card_list {
				width: 92%;
				padding: 0 4%;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.exam-card_item {
					width: 80rpx;
					height: 80rpx;
					color: #909090;
					border-radius: 50%;
					margin: 17rpx;
					border: 2rpx solid #B2B2B2;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
				}

				.exam-card_blue {
					background: rgba($color: #ff0000, $alpha: 0.15);
					border: 2rpx solid rgba($color: #ff0000, $alpha: 0.15);
					color: #ff0000;
				}

				.exam-card_bluecur {
					background: rgba($color: #ff0000, $alpha: 0.35);
					border: 2rpx solid rgba($color: #ff0000, $alpha: 0.35);
					color: #ff0000;
				}

				.exam-card_graycur {
					background: #F0F0F0;
				}

				.exam-card_red {
					background: rgba($color: $uni-color-error, $alpha: 0.15);
					border: 2rpx solid rgba($color: $uni-color-error, $alpha: 0.15);
					color: $uni-color-error;
				}

				.exam-card_redcur {
					background: rgba($color: $uni-color-error, $alpha: 0.35);
					border: 2rpx solid rgba($color: $uni-color-error, $alpha: 0.35);
					color: $uni-color-error;
				}
			}

			.exam-card_off {
				position: absolute;
				bottom: 30vw;
				width: 100%;
				height: 100%;
				background: #FFFFFF;
				color: #202020;
				font-size: 32rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-top: 2rpx solid #EEEEEE;
			}
		}
	}
</style>
