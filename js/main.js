$(document).ready(function () {
	masonryInit();
	tocList();
	scrollTest();
	pjaxload();
	shortcut();
	clickEvent();
	hljs.initHighlightingOnLoad();
});
	
	//点击事件
	function clickEvent(){
		//分类窗口
		$("#showCategories").click(function(){
			$(this).next().removeClass("showOut").toggle();
			$(this).next().mouseleave(function(){
				$(this).addClass("showOut").fadeOut(500);
			});
		});
		//归档页切换显示模式
		$("#content").on("click", "#archives h1",function(event){
			$(this).next().fadeToggle().next().fadeToggle();
		});
		//文章目录开关
		$("#content").on("click", "#listSwitch",function(event){
			$("#contentList").slideToggle(400);
		});
		//隐藏背景图片
		$(".mask").click(function(){
			console.log($(window).width());
			$("html").toggleClass("temp");
			$(this).siblings().toggle();
		});
	}
	 //主页瀑布流布局
	function masonryInit(){   
		//初始化masonry
		$('#articleList').masonry({
			itemSelector: '.article-digest',
			columnWidth: '.grid-sizer',
			/* isFitWidth: true, */
			percentPosition: true
		});
		/* //每个图片加载完成后使用Masonry布局
		$grid.imagesLoaded().progress( function() {
		  $grid.masonry();
		}); */
	}
	//索引目录跳转动画
	function tocList(){
		$("#content").on("click", ".toc a",function(event){
		    event.preventDefault();
		    // 获取当前点击的 a 标签，并前触发滚动动画往对应的位置
			var temp=decodeURI($(this).attr("href"));
			console.log("test");
		   $("body, html").animate(
		        {'scrollTop':$("[href='"+temp+"']").offset().top},
		        500
		    );
		});
	}
	//滚动监听
	function scrollTest(){
		$(window).on("scroll", function(){
			if($(window).scrollTop()>60){
				$("#tree").addClass("fixedToc");
				$("#shortcut").fadeIn();
			}
			else{
				$("#tree").removeClass("fixedToc");
				$("#shortcut").fadeOut();
			}
			/////////////////////
			var tocList = $(".toc-link");
			tocList.each(function(){
				
				var anchor=decodeURI($(this).attr("href"));
				var anchorTop = $("[href='"+anchor+"']").offset().top;
				var windowTop = $(window).scrollTop();			
				if ( anchorTop <= windowTop+50 ) {
					$(this).addClass("read");
				}
				else {
					$(this).removeClass("read");
				}
			});
		});
	}
	//pjax局部刷新
	function pjaxload(){

		$(document).pjax('#widget a,#archives a,#articleList a','#content', {fragment:'#content', timeout:8000});

		$(document).on('pjax:start', function() { NProgress.start(); });
		$(document).on('pjax:end',   function() { NProgress.done();  });
		$(document).on({
		    "pjax:complete": function(e) {
				
			masonryInit();
			shortcut();
			
			$("pre code").each(function (i, block){
			    hljs.highlightBlock(block);
			});
			}     
		});
		
		//$(document).pjax('#tree a,#articleList a', '#tree', {fragment:'#tree', timeout:8000});
		
		
		
	}
	//切换目录
	function switchList(){
		$("#switchList").click(function(){
			$("#postList").toggle();
			$("#toc").toggle();
		});
	}
	//底部快捷
	function shortcut(){
		$(".fa-chevron-circle-up").click(function(){
			$("body, html").animate(
			     {'scrollTop':0},
			     500
			 );
		});
	}
	//主页悬停显示事件
	function showDescription(){
		$(".description img").mouseenter(function(){
			$(this).addClass('blur').next().fadeIn(200);
			$(this).parent().mouseleave(function(){
				$(this).find(".article-show").fadeOut(200).prev().removeClass('blur');
			});
		});
	}
	/* //目录点击事件
		$(".category").click(function(){
			$(this).find("li").toggle();
		}); */
		
		/* //浏览事件
		$(".post-list-item").mouseenter(function(){
			$(this).addClass('showBorder');
			$(this).mouseleave(function(){
				$(this).removeClass('showBorder');
			});
		}); */
	/* $(".article-digest").mouseleave(function(){
		$(this).children("div").fadeOut();
		$(this).children("img").removeClass('blur');
	}); */
