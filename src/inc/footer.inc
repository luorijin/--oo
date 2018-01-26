
<footer class="footer-nav-bar">
	<div class="nav-cell @@if(index==1){current}">
		@@if(index!==1){<a href="discovery.html">}
			<i class="icon-nav-1"></i>
			<div>发现</div>
		@@if(index!==1){</a>}
	</div>
	<div class="nav-cell">
		@@if(index!==2){<a href="recreation.html">}
		<i class="icon-nav-2"></i>
		<div>娱乐</div>
		@@if(index!==2){</a>}
	</div>
	<div class="nav-cell @@if(index==3){current}">
		<a href="login.html">
		<i class="icon-nav-3"></i>
		<div>我的</div>
		</a>
	</div>
</footer>