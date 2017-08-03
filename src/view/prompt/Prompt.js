import $ from "jquery";
import "./Prompt.css";
class Prompt{
    constructor(_callback){
        this.root = $("<div></div>");

        this.htmlStr = '<div class="content"><div class="titlebox"><img src="./images/prompt_title.png"/><div class="icon">得分</div><span></span></div><div class="content2"></div><div class="bottom"><div class="okBtn"></div></div></div>';
        

        this.root.html(this.htmlStr);
        this.root.addClass("Prompt");
        
        this.titleBox = this.root.find(".titlebox");
        this.content2 = this.root.find(".content2");
        this.bottom = this.root.find(".bottom");
        
        this.root.find(".btn_start").click((event)=>{
        	this.root.remove();
        	if(_callback){
        		_callback();
        	}
        });
    }

}
export default Prompt;