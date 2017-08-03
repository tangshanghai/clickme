/**
 * Created by tangshanghai on 2017/4/18.
 */
import $ from "jquery";
import GameControl from "../control/GameControl.js";
import RectBox from "./RectBox.js";
import Prompt from "./prompt/Prompt.js";
import "./GameWindow.css";

class GameWindow{
    constructor(){
        this.root = $("<div></div>");

        this.htmlStr = '<div id="gameWindow"><div class="gameWindow_title"><div class="title_left">                最高13903</div><div class="title_right"><span>5</span></div></div><div class="gameWindow_score">            1232131</div><div class="gameWindow_count"></div><div class="gameWindow_rect"></div></div>	';
        

        this.root.html(this.htmlStr);
        let rectbox = new RectBox();
       	this.root.find("#gameWindow .gameWindow_rect").append(rectbox.root);
       	
       	this.root.find(".title_right").click((event)=>{
       		let prompt = new Prompt();
       		this.root.append(prompt.root);
       	});
    }

}
export default GameWindow;