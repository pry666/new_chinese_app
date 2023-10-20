const baseUrl = "******";

const urlMap = {
	login: baseUrl + "/login",
	logout: baseUrl + "/logout",
	
	getusr: baseUrl + "/userinfo",
	updateusr: baseUrl + "/updateuser",
	readtext: baseUrl + "/gettext",
	gettext: baseUrl + "/gettextbyid",
	
	getpaper: baseUrl + "/getpaperlist",
	delpaper: baseUrl + "/deletepaper",
	queryListForExam: baseUrl + "/getexaminfo",
	addExamPaper: baseUrl + "/addpaper",
	updateuser : baseUrl + "/updateuser",
	
	findExamHisList: baseUrl + "/examHis/queryList",
	findExamHis: baseUrl + "/examHis/queryObject",
	addExamHis: baseUrl + "/examHis/addExamHis",
	editExamHis: baseUrl + "/examHis/editExamHis",
	addExamHisList: baseUrl +"/examHis/addExamHisList",
	
	findExamLoginList: baseUrl + "/examLogin/queryList",
	findExamLogin: baseUrl + "/examLogin/queryObject",
	addExamLogin: baseUrl + "/examLogin/addExamLogin",
	editExamLogin: baseUrl + "/examLogin/editExamLogin",
	
	findExamPaperList: baseUrl + "/examPaper/queryList",
	findExamPaper: baseUrl + "/examPaper/queryObject",

	editExamPaper: baseUrl + "/examPaper/editExamPaper",
	queryListWithNum: baseUrl + "/examPaper/queryListWithNum",
	
	findExamQuestionList: baseUrl + "/examQuestion/queryList",
	findExamQuestion: baseUrl + "/examQuestion/queryObject",
	addExamQuestion: baseUrl + "/examQuestion/addExamQuestion",
	editExamQuestion: baseUrl + "/examQuestion/editExamQuestion",
	
	queryListWithAns:  baseUrl + "/examQuestion/queryListWithAns",
	
	findExamTestList: baseUrl + "/examTest/queryList",
	findExamTest: baseUrl + "/examTest/queryObject",
	addExamTest: baseUrl + "/examTest/addExamTest",
	editExamTest: baseUrl + "/examTest/editExamTest",
	
	findExamUserList: baseUrl + "/examUser/queryList",
	findExamUser: baseUrl + "/examUser/queryObject",
	addExamUser: baseUrl + "/examUser/addExamUser",
	editExamUser: baseUrl + "/examUser/editExamUser"
}

export default {
	baseUrl,
	urlMap
}
