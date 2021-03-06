import $ from "jquery";
import GameWindow from "./view/GameWindow.js";
import StartWindow from "./view/start/StartWindow.js";
import Explain from "./view/explain/Explain.js";
import GameControl from "./control/GameControl.js";

class Main{
	constructor(){
        this.root = $("<div></div>");

		this.root.css({
			width:"100%",
			height:"100%"
		});
		
		this.sw = new StartWindow(this.startGame.bind(this));
		this.root.append(this.sw.root);
		GameControl.addEventListener(GameControl.GAME_RESET,this.resetHandler);
		
	}
	
	startGame(d){
		console.log("开始教学。。。。");
		this.ex = new Explain(this.startGame2.bind(this));
		this.root.append(this.ex.root);
	}
	
	startGame2(){
		console.log("开始游戏。。。。");
		let gw = new GameWindow();
        this.root.append(gw.root);
	}
	
	resetHandler = () =>{
		this.root.empty();
		console.log("重玩游戏。。。。");
		let gw = new GameWindow();
        this.root.append(gw.root);
	}
}

export default Main;
