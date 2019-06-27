// vue的两个生命钩子，这里不多解释。
// window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
$(document).ready(function(){
	var scrowToTop=new Vue({
		
		el:'#scrowToTop',
		mounted () {
		  window.addEventListener('scroll', this.scrollToTop)
		},
		destroyed () {
		  window.removeEventListener('scroll', this.scrollToTop)
		},
		
		methods: {
		  // 点击图片回到顶部方法，加计时器是为了过渡顺滑
		  backTop () {
		      let that = this
		      let timer = setInterval(() => {
		        let ispeed = Math.floor(-that.scrollTop / 5)
		        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
		        if (that.scrollTop === 0) {
		          clearInterval(timer)
		        }
		      }, 16)
		  },
		 
		  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
		  scrollToTop () {
		    let that = this
		    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		    that.scrollTop = scrollTop
		    if (that.scrollTop > 60) {
		      that.btnFlag = true
		    } else {
		      that.btnFlag = false
		    }
		  }
		}
	});
})
