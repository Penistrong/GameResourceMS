var contextpath = "http://localhost:8080/GameResourceMS";

var spinner = null;

//!spin定义
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var defaults = {
    lines: 12,
    length: 7,
    width: 5,
    radius: 10,
    scale: 1.0,
    corners: 1,
    color: '#000',
    fadeColor: 'transparent',
    animation: 'spinner-line-fade-default',
    rotate: 0,
    direction: 1,
    speed: 1,
    zIndex: 2e9,
    className: 'spinner',
    top: '50%',
    left: '50%',
    shadow: '0 0 1px transparent',
    position: 'absolute',
};
var Spinner = /** @class */ (function () {
    function Spinner(opts) {
        if (opts === void 0) { opts = {}; }
        this.opts = __assign({}, defaults, opts);
    }
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target by calling
     * stop() internally.
     */
    Spinner.prototype.spin = function (target) {
        this.stop();
        this.el = document.createElement('div');
        this.el.className = this.opts.className;
        this.el.setAttribute('role', 'progressbar');
        css(this.el, {
            position: this.opts.position,
            width: 0,
            zIndex: this.opts.zIndex,
            left: this.opts.left,
            top: this.opts.top,
            transform: "scale(" + this.opts.scale + ")",
        });
        if (target) {
            target.insertBefore(this.el, target.firstChild || null);
        }
        drawLines(this.el, this.opts);
        return this;
    };
    /**
     * Stops and removes the Spinner.
     * Stopped spinners may be reused by calling spin() again.
     */
    Spinner.prototype.stop = function () {
        if (this.el) {
            if (typeof requestAnimationFrame !== 'undefined') {
                cancelAnimationFrame(this.animateId);
            }
            else {
                clearTimeout(this.animateId);
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
            this.el = undefined;
        }
        return this;
    };
    return Spinner;
}());
//export { Spinner };
/**
 * Sets multiple style properties at once.
 */
function css(el, props) {
    for (var prop in props) {
        el.style[prop] = props[prop];
    }
    return el;
}
/**
 * Returns the line color from the given string or array.
 */
function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length];
}
/**
 * Internal method that draws the individual lines.
 */
function drawLines(el, opts) {
    var borderRadius = (Math.round(opts.corners * opts.width * 500) / 1000) + 'px';
    var shadow = 'none';
    if (opts.shadow === true) {
        shadow = '0 2px 4px #000'; // default shadow
    }
    else if (typeof opts.shadow === 'string') {
        shadow = opts.shadow;
    }
    var shadows = parseBoxShadow(shadow);
    for (var i = 0; i < opts.lines; i++) {
        var degrees = ~~(360 / opts.lines * i + opts.rotate);
        var backgroundLine = css(document.createElement('div'), {
            position: 'absolute',
            top: -opts.width / 2 + "px",
            width: (opts.length + opts.width) + 'px',
            height: opts.width + 'px',
            background: getColor(opts.fadeColor, i),
            borderRadius: borderRadius,
            transformOrigin: 'left',
            transform: "rotate(" + degrees + "deg) translateX(" + opts.radius + "px)",
        });
        var delay = i * opts.direction / opts.lines / opts.speed;
        delay -= 1 / opts.speed; // so initial animation state will include trail
        var line = css(document.createElement('div'), {
            width: '100%',
            height: '100%',
            background: getColor(opts.color, i),
            borderRadius: borderRadius,
            boxShadow: normalizeShadow(shadows, degrees),
            animation: 1 / opts.speed + "s linear " + delay + "s infinite " + opts.animation,
        });
        backgroundLine.appendChild(line);
        el.appendChild(backgroundLine);
    }
}
function parseBoxShadow(boxShadow) {
    var regex = /^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/;
    var shadows = [];
    for (var _i = 0, _a = boxShadow.split(','); _i < _a.length; _i++) {
        var shadow = _a[_i];
        var matches = shadow.match(regex);
        if (matches === null) {
            continue; // invalid syntax
        }
        var x = +matches[2];
        var y = +matches[5];
        var xUnits = matches[4];
        var yUnits = matches[7];
        if (x === 0 && !xUnits) {
            xUnits = yUnits;
        }
        if (y === 0 && !yUnits) {
            yUnits = xUnits;
        }
        if (xUnits !== yUnits) {
            continue; // units must match to use as coordinates
        }
        shadows.push({
            prefix: matches[1] || '',
            x: x,
            y: y,
            xUnits: xUnits,
            yUnits: yUnits,
            end: matches[8],
        });
    }
    return shadows;
}
/**
 * Modify box-shadow x/y offsets to counteract rotation
 */
function normalizeShadow(shadows, degrees) {
    var normalized = [];
    for (var _i = 0, shadows_1 = shadows; _i < shadows_1.length; _i++) {
        var shadow = shadows_1[_i];
        var xy = convertOffset(shadow.x, shadow.y, degrees);
        normalized.push(shadow.prefix + xy[0] + shadow.xUnits + ' ' + xy[1] + shadow.yUnits + shadow.end);
    }
    return normalized.join(', ');
}
function convertOffset(x, y, degrees) {
    var radians = degrees * Math.PI / 180;
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    return [
        Math.round((x * cos + y * sin) * 1000) / 1000,
        Math.round((-x * sin + y * cos) * 1000) / 1000,
    ];
}
//!spin结束

$(document).ready(function(){
	
	var opts = {
			lines: 13, // 花瓣数目
			length: 20, // 花瓣长度
			width: 5, // 花瓣宽度
			radius: 20, // 花瓣距中心半径
			corners: 1, // 花瓣圆滑度 (0-1)
			rotate: 0, // 花瓣旋转角度
			direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
			color: '#20dfaf', // 花瓣颜色
			speed: 1, // 花瓣旋转速度
			trail: 60, // 花瓣旋转时的拖影(百分比)
			shadow: false, // 花瓣是否显示阴影
			hwaccel: false, //spinner 是否启用硬件加速及高速旋转
			className: 'spinner', // spinner css 样式名称
			zIndex: 2e9, // spinner的z轴 (默认是2000000000)
			top: '50%', // spinner 相对父容器Top定位 单位 px
			left: '50%',// spinner 相对父容器Left定位 单位 px
			position: 'absolute'
	};
	
	spinner = new Spinner(opts);

	$.ajax({
		type:"post",
		url:contextpath+"/index/getUserInfo",
		success:function(data){
			user = data;
			var img = new Image({
				onload: $("img#portrait,img#nav-portrait,img#modal-portrait").prop("src",contextpath+"/uploadfiles"+data.portrait),
				onerror: $("img#nav-portrait,img#portrait,img#modal-portrait").prop("src",contextpath+"/user/personalConfig/getPortrait")
			});
			img.src = contextpath+"/uploadfiles"+data.portrait;//加载头像，失败则去取数据库中存储的BASE64编码过的头像
		},
		error:function(){
			alert('拉取用户信息失败');
		}
	});
	$.repliesFloors();
	
	//菜单栏绑定调用
    initToolbarBootstrapBindings();  

    //插件调用
    $('#editor').wysiwyg();

    window.prettyPrint && prettyPrint();
    
    //新建回复
    $("#btn-emit-reply").click(function(){
    	$.createNewReply();
    });
})

$.repliesFloors = function(){
	var rendered_html = template($("#repliesFloors").html());
	$("#templates_Panel").html(rendered_html);
	$.beginService();
}

//!Must include html_coder.js first!
$.createNewReply = function(){
	var content = $("#editor").html();
	console.log(content);
	var reply = html_encode(content);
	console.log(reply);
	$.ajax({
		type:"POST",
		url:contextpath+"/posts/createNewReply",
		dataType:"json",
		contentType:"application/json;charset=utf-8",
		data:JSON.stringify({'post_id':$("#post_id_box").html(), 'reply':reply}),
		success:function(msg){
			console.log(msg);
			if(msg==true){
				window.location.reload();
			}else{
				alert("回复失败!");
			}
		}
	})
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
	
var manage_replies = new Vue({
	el:'#replyManagement',
	data(){
		return{
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
		console.log(Date.now().toString()+'|'+'Vue instance has been created');
	},
	mounted:function(){
		this.getPostMainInfo();
		this.getRepliesOfPost();
	},
	methods:{
		//获取帖子主要信息,包括发帖人信息与帖子内容等,前端Vue进行渲染操作
		getPostMainInfo:function(){
			$.ajax({
				type:"POST",
				url:contextpath+"/posts/getPostMainInfo",
				dataType:"json",
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify({'poster_id':$("#poster_id_box").html(), 'post_id':$("#post_id_box").html()}),
				success:function(postInfo){
					manage_replies.postInfo = postInfo;
				},
				error:function(){
					alert("拉取帖子信息失败!");
				}
			})
		},
		//获取用户回复信息
		getRepliesOfPost:function(){
			$.ajax({
				type:"POST",
				url:contextpath+"/posts/getRepliesOfPost",
				dataType:"json",
				contentType:"application/json;charset=utf-8",
				data:JSON.stringify({'post_id':$("#post_id_box").html()}),
				beforeSend:function(){
					$("#div-loading-spin").text("");
					var target = $("#div-loading-spin").get(0);
					spinner.spin(target);
				},
				success:function(replies){
					//首先对回复信息里的html内容decode进行标签转义
					for(var i=0;i<replies.length;i++){
						replies[i].reply = html_decode(replies[i].reply);
					}
					for(var i=0;i<replies.length;i++){
						manage_replies.list.push(replies[i]);
					}
					//console.log(manage_users.list);
					//显示展现出的slist(showed list)
					//manage_replies.setSlist(manage_replies.list);
					//默认显示前pageSize条数据
					if(manage_replies.pageSize<=replies.length){
						for(var i=0;i<manage_replies.pageSize;i++)
							manage_replies.slist.push(replies[i]);
					}else{
						for(var i=0;i<replies.length;i++)
							manage_replies.slist.push(replies[i]);
					}
					
					manage_replies.count = manage_replies.list.length;//总记录
					
					setTimeout(function(){
						spinner.spin();
					},500);
				}
			})
		},
		//拼接img src属性
		getPortraitURL(resource_id){
			return contextpath+"/user/personalConfig/getPor?resource_id="+resource_id;
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
		//修改数据
		showOverlay(index){
			this.selected = index;
			this.selectedlist = this.list[index];
			this.changeOverlay();
		},
		//点击保存按钮
		modify(arr){
			if(this.selected > -1){
				Vue.set(this.list,this.selected,arr);
			}else{
				this.list.push(arr);
			}
			this.setSlist(this.list);
			this.updateUserInfo(arr);
			this.changeOverlay();
		},
		clean(){
			$(".search_user").val('');
			this.$emit('input');
		},
		del(index){
			this.list.splice(index,1);
			this.setSlist(this.list);
		},
		changeOverlay(){
			this.isActive = !this.isActive;
		},
		//获取需要渲染进页面的数据
		setSlist(arr){
			this.slist = JSON.parse(JSON.stringify(arr));
		},
		/**updateUserInfo(arr){
			$.ajax({
				type:"POST",
				url:contextpath+"/admin/updateUserInfo",
				data:arr,
				success:function(result){
					
				}
			})
		},*/
		search_reply(e){
			var v = e.target.value,
				self = this;
			self.searchlist = [];
			if(v){
				var ss=[];
				//过滤需要的数据
				this.list.forEach(function(reply){
					if(reply.user_name.indexOf(v) > -1){
						if(self.searchlist.indexOf(user.user_name) == -1){
							self.searchlist.push(user.user_name);
						}
						ss.push(user);
					}else if(reply.floor.indexOf(v) > -1){
						if(self.searchlist.indexOf(reply.floor) == -1){
							self.searchlist.push(reply.floor);
						}
						ss.push(reply);
					}
				});
				this.setSlist(ss);//过滤后数据传给slist
			}else{
				//搜索框为空,则展示所有数据
				this.setSlist(this.list);
			}
		}
	}
});



/**
Vue.component('model',{
	props:['list','isactive'],
	template:`<div class="overlay" v-show="isactive">
					<div class="con">
						<h2 class="title">修改用户权限与类型</h2>
						<div class="content">
							<table>
								<tr>
									<td class="modify_option">用户类型</td>
									<td>
									<select name="" id="" v-model="modifylist.user_type">
									<option value="administrator">管你猿</option>
									<option value="normal">普通注册</option>
									<option value="limited">限制功能</option>
									</select>
									</td>
									<td class="modify_option">用户身份</td>
									<td>
									<select name="" id="" v-model="modifylist.identity">
									<option value="超级版主">Super Moderator</option>
									<option value="斑竹">Moderator</option>
									<option value="会员">VIP</option>
									<option value="普通用户">Normal</option>
									</select>
									</td>
								</tr>
							</table>
							<center>
							<p>
								<input type="button" @click="modify" value="保存">
								<input type="button" @click="changeActive" value="取消"/>
							</p>
							</center>
						</div>
					</div>
				</div>`,
	computed:{
		modifylist(){
			return this.list;
		}
	},
	methods:{
		changeActive(){
			this.$emit('change');
		},
		modify(){
			this.$emit('modify',this.modifylist);
		}
	}
});*/
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