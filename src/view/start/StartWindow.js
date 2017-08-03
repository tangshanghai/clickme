import $ from "jquery";
import "./StartWindow.css";

class StartWindow{
    constructor(_callback){
        this.root = $("<div></div>");

        this.htmlStr = '<img class="imgBg" src="./images/startWin.png"/><div class="btn_start"></div><div class="btn_ask"></div><div class="btn_share1"></div><div class="btn_share2"></div><div class="btn_share3"></div><div class="btn_share4"></div><div class="btn_share5"></div>';
        

        this.root.html(this.htmlStr);
        this.root.addClass("StartWindow");
        
        this.root.find(".btn_start").click((event)=>{
        	this.root.remove();
        	if(_callback){
        		_callback();
        	}
        });
    }

}
export default StartWindow;