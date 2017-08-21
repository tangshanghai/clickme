import $ from "jquery";
import Prompt from "./Prompt.js";
import GameModel from "./../../model/GameModel.js";
import GameControl from "./../../control/GameControl.js";
import "./ScoreWindow.css";

class ScoreWindow extends Prompt{
	constructor(_callback){
		super(_callback);
		this.init();
	}
	
	init(){
		let htmlStr = '<div class="score">200032</div><div class="number">10</div><div class="btnbox"><div class="mainbtn"></div><div class="resetbtn"></div></div>';
		this.content2.append(htmlStr);
		
		let hs = GameModel.getCookie("highScore");
		hs = hs==""?0:parseInt(hs);
		if(GameModel.score > hs){
			GameModel.setCookie("highScore",GameModel.score);
			//console.log("覆盖"+GameModel.getCookie("highScore"));
		}
		//console.log("最后"+GameModel.getCookie("highScore"));
		this.content2.find(".score").text(GameModel.score);
		this.content2.find(".number").text(GameModel.compose);
		
		this.content2.find(".mainbtn").click(()=>{
			GameModel.resetGame();
			this.closeWindow();
			GameControl.backToMain();
		});
		
		this.content2.find(".resetbtn").click(()=>{
			GameModel.resetGame();
			this.closeWindow();
			GameControl.resetGame();
		});
	}
}
export default ScoreWindow;