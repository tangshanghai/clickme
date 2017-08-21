import $ from "jquery";
import "./Prompt.css";
class Prompt{
    constructor(_callback){
        this.root = $("<div></div>");

        let htmlStr = '<div class="content"><div class="titlebox"><img src="./images/prompt_title.png"/><div class="icon">得分</div><span></span></div><div class="content2"></div><div class="bottom"><div class="okBtn"></div></div></div>';
        

        this.root.html(htmlStr);
        this.root.addClass("Prompt");
        
        this.titleBox = this.root.find(".titlebox");
        this.content2 = this.root.find(".content2");
        this.bottom = this.root.find(".bottom");
        this.callBack = _callback;
        
        //let okBtn = this.bottom.find("okBtn");
//      this.bottom.find("okBtn").click(this.closeHandler);
        this.root.find(".okBtn").click((event)=>{
        	this.closeWindow();
        });
   }
    
    closeWindow(){
    	this.root.remove();
    }

}
export default Prompt;