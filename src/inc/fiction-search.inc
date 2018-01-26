<style>
	.pop{
		position: absolute;
		height: 100%;
		width: 100%;
		background: #fff;
		transform: translateX(100%);
		transition: .2s ease-out;
		-webkit-transform: translateX(100%);
		-webkit-transition: .2s ease-out;
		top:0px;
		left: 0px;
		z-index: 11;
		&.open{
			transform: translateX(0%);
		}
		.lf{
			position: absolute;
			left: 0.2rem;
			right: 1.1rem;
			height: 100%;
			font-size: 0;
			z-index: 1;
			 &:before{
	        	display: inline-block;
	        	vertical-align: middle;
	        	height: 100%;
	        	content: '';
        	}
		}
		.rg{
			float: right;
			width: 1rem;
			text-align: center;
		}
	}
	.pop .input-grounp{
        position: relative;
        line-height: normal;
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        &:after{
            position:absolute;
            content: '';
            left: 0px;
            top:0px;
            width: 40px;
            height: 100%;
            background: url('images/read_icon_search.png') center no-repeat;
            background-size: auto 60%; 
            }
        input{
            position: relative;
            width: 100%;
            padding: 0.15rem;
            padding-left: 40px;
            background: #f0f0f0;
            border-radius: 15px;
        }
    }
</style>
<div class="module pop" :class="{open:popopen}">
	<header class="top-nav-bar">
		<div class="lf">
			<div class="input-grounp">
	            <input type="text"  name="bookname" placeholder="请输入书名">
	        </div>
    	</div>
    	<div class="rg">
    		<button @click="popopen=false">取消</button>
    	</div>
	</header>
	<div class="scroll-view">
		<ul class="fiction-list">
			<li>
				<i class="type"></i><div class="name">《钢铁是怎样炼成的》作者：奥斯特洛夫斯.《钢铁是怎样炼成的》作者：奥斯特洛夫斯.</div>
			</li>
			<li>
				<i class="type"></i><div class="name">《静静的顿河》作者：肖洛克夫</div>
			</li>
			<li>
				<i class="type"></i><div class="name">《青年近卫军》作者：陀思妥耶夫斯基</div>
			</li>
		</ul>	
	</div>
</div>