var contextpath = "http://localhost:8080/GameResourceMS";
template.config({sTag:'<#',eTag:'#>'});
var chart = null;

$(document).ready(function(){
	//加载当前用户信息
	$.ajax({
		type:"POST",
		url:contextpath+"/index/getUserInfo",
		success:function(data){
			var img = new Image({
				onload: $("img#portrait,img#nav-portrait").prop("src",contextpath+"/uploadfiles"+data.portrait),
				onerror: $("img#nav-portrait,img#portrait").prop("src",contextpath+"/user/personalConfig/getPortrait")
			});
			img.src = contextpath+"/uploadfiles"+data.portrait;//加载头像，失败则去取数据库中存储的BASE64编码过的头像
			
			$("p#identity").text(data.identity);
			$("p#introduction").text(data.introduction);
		},
		error:function(){
			alert('拉取用户信息失败!');
		}
	})
	$.latestPosts_page();
})

//Triggers definition
$(document).ready(function(){
	//菜单栏绑定调用
    initToolbarBootstrapBindings();  

    //插件调用
    $('#editor').wysiwyg();

    window.prettyPrint && prettyPrint();
	
	$('#adCarousel').carousel({
	    interval: 4000
	});
	$("#toggle_info_button").click(function(){
		$("#introduction").slideToggle('slow');
	});
	$("#portrait").click(function(){
		window.location.href=contextpath+"/user/personalConfig";
	});
	$("#nav-portrait,#nav-username").click(function(){
		$("#user_info").slideToggle('slow');
	})
	$("#query-web-info").click(function(){
		queryWebInfo();
	})
	$("#query-author-info").click(function(){
		queryAuthorInfo();
	})
	$("#query-game-info").click(function(){
		console.log("in");
		queryGameinfo();
		console.log("in");
	})
	$("#btn-show-latest-posts").click(function(){
		$.latestPosts_page();
	})
	$("#post_send").click(function(){
		var title="";
		var subtitle="";
		title = $("#title").val();
		subtitle = $("#subtitle").val();
		if(true){
			if(title!=""&&subtitle!=""){
				$.createNewPost();
				return true;
			}else{
				$("#title").attr({value:'',placeholder:'请输入信息'});
				return false;
			}
		}else{
			alert('pleace check first');
			return false;
		}
	});
	
})


//listPosts方法已update为latestPosts_page方法
/*$.listPosts = function(){
	var tpl = $("#latestPosts").html();
	$.ajax({
		type:"POST",
		url:contextpath+"/posts/getLatestPosts",
		dataType:"json",
		success:function(list){
			console.log(list);
			/*传回来的list是无名称的样式[{data1},{data2}],要对其进行对象的引用就将其包装成Map格式*/
			/*var datas = {"list":list};
			var rendered_html = template(tpl,datas);
			$("#templates_Panel").html(rendered_html);
			$("#latestPostsDataTable").DataTable();
		}
	})
}*/
$.createNewPost = function(){
	var post_title =$("#title").val();
	console.log(post_title);
	var post_subtitle = $("#subtitle").val();
	console.log(post_subtitle);
	
	var content = $("#editor").html();
	console.log(content);
	var post_content = html_encode(content);
	$.ajax({
		type:"POST",
		url:contextpath+"/posts/createNewPost",
		dataType:"json",
		contentType:"application/json;charset=utf-8",
		data:JSON.stringify({'post_title':post_title, 'post_subhead':post_subtitle ,'post_content':post_content}),
		success:function(msg){
			console.log(msg);
			if(msg){
				window.location.reload();
			}else{
				alert("回复失败!");
			}
		}
	})
}

$.latestPosts_page = function(){
	var rendered_html = template($("#latestPosts").html());
	$("#templates_Panel").html(rendered_html);
	$.beginService();
}

$.beginService = function(){
	
	//底部分页组件
	Vue.component('pagination',{
		//父组件传递的值(有的有默认值)
		props: {
			//每页可见页码
			perPages : {
				type: Number,
				default: 5
			},
			//当前页码
			pageIndex : {
				type: Number,
				default: 1
			},
			//每页显示条数
			pageSize : {
				type: Number,
				default: 10
			},
			//总条数
			total : {
				type: Number,
				default: 1
			},
		},
		template:`<ul class="ul-paging center-block" v-if="pages != 1">
				 	<!--prev-->
				 	<li :class="['paging-item', 'paging-item--prev',{'paging-item--disabled':index===1}]"
				 		@click="prev"><<</li>
				 	
				 	<!--first-->
				 	<li :class="['paging-item', 'paging-item--first']"
						@click="first">首页</li>
					<li :class="['paging-item', 'paging-item--more']"
						v-if="showPrevMore">...</li>
					<li :class="['paging-item', {'paging-item--current':index===pager}]"
						v-for="pager in pagers" @click="go(pager)">{{ pager }}</li>
					<li :class="['paging-item', 'paging-item--more']"
						v-if="showNextMore">...</li>
					
					<!--last-->
					<li :class="['paging-item', 'paging-item--last']"
						@click="last">尾页</li>
						
					<!--next-->	
					<li :class="['paging-item', 'paging-item--next', {'paging-item--disabled':index===pages}]"
						@click="next">>></li>
				  </ul>
				 `,
		methods:{
			prev(){
				console.log(this.limit);
				if(this.index > 1)
					this.go(this.index - 1)
			},
			next(){
				if(this.index<this.pages)
					this.go(this.index +  1)
			},
			first(){
				if(this.index !== 1)
					this.go(1)
			},
			last(){
				if(this.index !== this.pages)
					this.go(this.pages)
			},
			go(page){
				if(this.index !== page){
					this.index = page
					//发送给父组件，让父组件调用change对应的pageChange方法
					this.$emit('change', this.index)
				}
			}
		},
		computed:{
			//计算总页码
			pages(){
				return Math.ceil(this.size / this.limit)
			},
			//计算页码,当count变化时自动计算
			pagers(){
				const array = []
				const perPages = this.perPages
				const pageCount = this.pages
				let current = this.index
				//偏移量
				const _offset = (perPages - 1)/2

				const offset = {
					start 	: current - _offset,
					end		: current + _offset 
				}
				
				if(offset.start < 1){
					offset.end += 1 - offset.start
					offset.start = 1
				}
				if(offset.end > pageCount){
					offset.start -= offset.end - pageCount
					offset.end = pageCount
				}
				if(offset.start < 1) offset.start = 1
				
				this.showPrevMore = (offset.start > 1)
				this.showNextMore = (offset.end < pageCount)
				
				for(let i = offset.start;i<=offset.end;i++){
					array.push(i)
				}
				return array
			}
		},
		data(){
			return {
				index: this.pageIndex,//当前页码
				limit: this.pageSize, //每页显示条数
				size: this.total || 1,//总记录数
				showPrevMore: false,
				showNextMore: false
			}
		},
		watch :{
			pageIndex(val) {
				this.index = val || 1
			},
			pageSize(val) {
				this.limit = val || 10
			},
			total(val) {
				this.size = val || 1
			}
		}
	});
	
	var latestPosts = new Vue({
		el:'#postManagement',
		data(){
			return {
				isActive: false,
				selected: -1,
				selectedlist: {},
				slist:[],
				searchlist:[],
				list:[],
				pageSize : 5,
				currentPage: 1,
				count : 0,
				items : [],
				postInfo: []
			}
		},
		created(){
			console.log(Date.now()+'|'+'Vue instance has been created');
		},
		mounted:function(){
			this.getPostInfo();
		},
		methods:{
			//获取用户信息
			getPostInfo:function(){
				$.ajax({
					type:"POST",
					url:contextpath+"/posts/getLatestPosts",
					dataType:"json",
					success:function(postInfos){
						console.log(postInfos);
						for(var i=0;i<postInfos.length;i++){
							latestPosts.list.push(postInfos[i]);
						}
						if(latestPosts.pageSize<=postInfos.length){
							for(var i=0;i<latestPosts.pageSize;i++)
								latestPosts.slist.push(postInfos[i]);
						}else{
							for(var i=0;i<postInfos.length;i++)
								latestPosts.slist.push(postInfos[i]);
						}
						
						latestPosts.count = latestPosts.list.length;//总记录
					}
				})
			},
			jump(poster_id, post_id){
				location.href = contextpath+"/posts/"+poster_id+"/"+post_id;
			},
			getPostURL(poster_id, post_id){
				return contextpath+"/posts/"+poster_id+"/"+post_id;
			},
			setSlist(arr){
				this.slist = JSON.parse(JSON.stringify(arr));
			},
			jump(poster_id, post_id){
				window.location.href =  contextpath+"/posts/"+poster_id+"/"+post_id;
			},
			pageChange(page){
				this.currentPage = page
				//TODO 改变页码时改变slist
				var curPageStartIndex = (page - 1) * this.pageSize;
				var curPageEndIndex = page*this.pageSize - 1;
				if(curPageEndIndex >= this.count){
					curPageEndIndex = this.count - 1;
				}
				this.slist.splice(0, this.slist.length);//清空原来要显示的slist
				
				for(var i = curPageStartIndex;i<=curPageEndIndex;i++){
					this.slist.push(this.list[i]);
				}
			},
			clean(){
				$(".search_post").val('');
				this.$emit('input');
			},
			//获取需要渲染进页面的数据
			setSlist(arr){
				this.slist = JSON.parse(JSON.stringify(arr));
			},
			search_post(e){
				var v = e.target.value,
					self = this;
				self.searchlist = [];
				if(v){
					var ss=[];
					//过滤需要的数据
					this.list.forEach(function(post){
						if(post.title.indexOf(v) > -1){
							if(self.searchlist.indexOf(post.title) == -1){
								self.searchlist.push(post.title);
							}
							ss.push(post);
						}else if(post.subhead.indexOf(v) > -1){
							if(self.searchlist.indexOf(post.subhead) == -1){
								self.searchlist.push(post.subhead);
							}
							ss.push(post);
						}
					});
					this.setSlist(ss);//过滤后数据传给slist
				}else{
					//TODO 
					//搜索框为空,则展示所有数据
					this.setSlist(this.list);
				}
			}
			//修改数据
			/*showOverlay(index){
				this.selected = index;
				this.selectedlist = this.list[index];
				this.changeOverlay();
			},
			//点击保存按钮
			
			//获取需要渲染进页面的数据
			setSlist(arr){
				this.slist = JSON.parse(JSON.stringify(arr));
			},
			updateUserInfo(arr){
				$.ajax({
					type:"POST",
					url:contextpath+"/admin/updateUserInfo",
					data:arr,
					success:function(result){
						
					}
				})
			},*/
			
		}
	});
}
	


$.newPost = function(){
	var tpl = $("#newPost").html();
	
	$("#submit_newPost").click(function(){
		var newPost_data = {"post_title":$("#post_title").val(),"post_subhead":$("#post_subhead").val(),"post_content":$("#post_content").val(),};
		
		$.ajax({
			type:"POST",
			url:contextpath+"/posts/newPost",
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			data:JSON.stringify(newPost_data),
			success:function(data){
				if(data.msg == "success"){
					window.location.href=contextpath+"/posts/"+data.post_id;
				}
			}
			
		})
	})
}

function queryWebInfo(){
	//创建渐变色
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color){
		return {
			radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
	        stops: [
	            [0, color],
	            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken brightness
	        ]
		};
	});
	//处理数据
	chart = Highcharts.chart('templates_Panel',{
		chart: {
			type: 'pie',
			events: {
				load: requestWebInfo
			},
			options3d: {
				enabled: true,
				alpha: 45,
				beta: 0
			}
		},
		title: {
			text: '来自不同浏览器的访问量占比'
		},
		subtitle: {
			text: 'click the slice to see details\n数据源:netmarketshare.com'
		},
		tooltip: {
			headerFormat:'<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
		},
		plotOptions: {
			pie:{
				allowPointSelect: true,
				cursor: 'pointer',
				depth: 35,
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.y:.2f} %',
				}
			}
		}
		,
		series: [{
			name:'浏览器',
			colorByPoint: true,
			data: [
				{
					name: 'Chrome',
					y: 66.21,
					sliced: true,
					selected: true,
					drilldown: "Chrome"
				},
				{
					name: 'Firefox',
					y: 9.59,
					drilldown: "Firefox"
				},
				{
					name: 'Internet Explorer',
					y: 9.20,
					drilldown:  "IE"
				},
				{
					name: 'Edge',
					y: 4.57,
					drilldown: "Edge"
				},
				{
					name: 'Safari',
					y: 3.65,
					drilldown: "Safari"
				},
				['Opera', 1.60],
				['Others', 5.18]
				],
			tooltip: {
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
			}
		}],
		drilldown: {
			series: [
				{
					type: "pie",
					id: "Chrome",
					name: "Chrome",
					data: [
						['v19.0', 23.0],
						['v18.0', 12.3],
						['v17.0', 6.6],
						['v16.0', 3.1],
					]
				},
				{
					type: "pie",
					id: "Firefox",
					name: "Firefox",
					data: [
						['v19.0', 23.0],
						['v18.0', 12.3],
						['v17.0', 6.6],
						['v16.0', 3.1],
					]
				},
				{
					type: "pie",
					id: "IE",
					name: "Internet Explorer",
					data: [
						['IE11',7.52],
						['IE10',0.33],
						['IE9', 0.34],
						['IE8', 0.68],
						['IE7', 0.14],
						['IE6', 0.18]
					]
				}
				]
		}

	})
};


function requestWebInfo(){
	
}

function queryAuthorInfo(){
	var rendered_html = template($("#aboutAuthor").html());
	$("#templates_Panel").html(rendered_html);
}

function queryGameinfo(){
	var rendered_html = template($("#aboutGame").html());
	$("#templates_Panel").html(rendered_html);
}

function initToolbarBootstrapBindings() {
    var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
          'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
          'Times New Roman', 'Verdana'],
          fontTarget = $('[title=字体]').siblings('.dropdown-menu');
    $.each(fonts, function (idx, fontName) {
        fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
    });
    $('a[title]').tooltip({container:'body'});
      $('.dropdown-menu input').click(function() {return false;})
          .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
      .keydown('esc', function () {this.value='';$(this).change();});

    $('[data-role=magic-overlay]').each(function () { 
      var overlay = $(this), target = $(overlay.data('target')); 
      overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
    });
    $('#voiceBtn').hide();
    // if ("onwebkitspeechchange"  in document.createElement("input")) {
    //   var editorOffset = $('#editor').offset();
    //   $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
    // } else {
    //   $('#voiceBtn').hide();
    // }
  };
/**
$.queryWebInfo = function(){
	var tpl = $("#webInfo").html();
	$.ajax({
		type:"POST",
		url:contextpath+"/webInfo",
		dataType:"json",
		success:function(data){
			console.log(data);
			var infos = {"infos":data};
			$("#templates_Panel").html(template(tpl,infos));
		},
		error:function(){
			alert("访问网站底层信息出错!请联系管理员!");
		}
	})
	
}*/