import $ from "jquery";
import "./explain.css";

class Explain{
	constructor(_callback){
		this.root = $("<div></div>");
		let html = '<div class="Explain_imgbox"><img class="Explain_img" src="./images/1.png"/></div><div class="Explain_level1 Explain_movie"></div><div class="Explain_level2 Explain_movie"></div><div class="Explain_level3 Explain_movie"></div><div class="Explain_level4 Explain_movie"></div><div class="Explain_close"></div>';
		
		this.root.append(html);
		this.root.addClass("Explain");
		this.img = this.root.find(".Explain_img");
		this.el1 = this.root.find(".Explain_level1");
		this.el2 = this.root.find(".Explain_level2");
		this.el3 = this.root.find(".Explain_level3");
		this.el4 = this.root.find(".Explain_level4");
		
		this.root.find(".Explain_close").click((event)=>{
			console.log("关闭窗口")
		});
		this.root.find(".Explain_level1").click((event)=>{
			this.img.attr("src","./images/2.png");
			this.el1.hide();
			this.el2.show();
		});
		this.root.find(".Explain_level2").click((event)=>{
			this.img.attr("src","./images/3.png");
			this.el2.hide();
			this.el3.show();
		});
		this.root.find(".Explain_level3").click((event)=>{
			this.img.attr("src","./images/4.png");
			this.el3.hide();
			this.el4.show();
		});
		this.root.find(".Explain_level4").click((event)=>{
			console.log("开始游戏")
			this.root.remove();
			if(_callback){
				_callback();
			}
		});
	}
}
export default Explain;