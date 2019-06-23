
		//动态日期 
		function time(){

			var date = new Date();
			//获取 年
			var y = date.getFullYear();
			//获取 月  0 --> 11
			var M = date.getMonth() + 1;
			//获取 日
			var d = date.getDate();
			//获取 时
			var h = date.getHours();
			//获取 分
			var m = date.getMinutes();
			//获取 秒
			var s = date.getSeconds();

			var date = y + " 年 " + M + " 月 " + d + " 日 " + h + " 时 : " + m + "分 : " + s + "秒";
			//获取 页面显示的位置
			var time = document.getElementById('right').innerText = date;

			//定时器  			1、调用的方法  2、指定每隔多长事件调用  
			window.setTimeout("time()","1000");
			
		}

		//页面启动广告
		function openAD(){
			window.open("open.jsp","京东广告","width=670,height=530,top=80,left=350")
		}

		//页面左边滚动广告
		function leftAD(){
			var top = 100;
			
			document.getElementById("leftAD").style.top = document.body.scrollTop + top;
			document.getElementById("rightAD").style.top = document.body.scrollTop + top;
		}

		window.onscroll = leftAD;

		//关闭左边广告
		function offLeft(){
			document.getElementById("leftAD").style.display = "none";
		}

		//关闭右边广告
		function offRight(){
			document.getElementById("rightAD").style.display = "none";
		}

		//隔行变色
		function xiaoGuo(){
				
			//获取table对象
			var table = document.getElementById("content");
			//获取表里面的行信息
			var tr = table.getElementsByTagName("tr");
			
			//循环遍历
			for(var i=0;i<tr.length;i++){

				if(i % 2 == 0){
					//如果为偶数行
					tr[i].style.background = "#7EC0EE";

					//鼠标移开  背景色还原成 默认当前色
					tr[i].onmouseout = function(){
						this.style.background = "#7EC0EE";
					}
					
				}else{
					//基数行背景色
					tr[i].style.background = "#AEEEEE";


					//鼠标移开  背景色还原成 默认当前色
					tr[i].onmouseout = function(){
						this.style.background = "#AEEEEE";
					}
				}

				//鼠标移动上 背景色高亮
				tr[i].onmouseover = function(){
					this.style.background = "yellow";
				}
			}

		}

		//删除商品
		function del(id){

			/**
				confirm 方法 返回 boolean 值
				true 表示 点击了 确定
				false 表示 点击了 取消
			*/
			if(window.confirm("确定要删除该信息吗  ?")){
				//跳转到 Servlet 中 将 ID  编号传递过去
				window.location.href = "DeleteGoodsServlet?id=" + id;
			}
			
		}
