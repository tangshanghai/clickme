/**
 * Created by tangshanghai on 2017/4/18.
 */
import $ from "jquery";
import GameControl from "../control/GameControl.js";
import GameModel from "../model/GameModel.js";
import RectBox from "./RectBox.js";
import ScoreWindow from "./prompt/ScoreWindow.js";
import "./GameWindow.css";

class GameWindow{
    constructor(){
        this.root = $("<div></div>");

        this.htmlStr = '<div id="gameWindow"><div class="gameWindow_title"><div class="title_left">最高<label>0</label></div><div class="title_right"><span>5</span></div></div><div class="gameWindow_score">0</div><div class="gameWindow_count"></div><div class="gameWindow_rect"></div></div>';
        

        this.root.html(this.htmlStr);
        let rectbox = new RectBox();
       	this.root.find("#gameWindow .gameWindow_rect").append(rectbox.root);
       	
//     	this.root.find(".title_right").click((event)=>{
//     		let score = new ScoreWindow();
//     		this.root.append(score.root);
//     	});
       	
       	this.dis_score = this.root.find(".gameWindow_score");
       	this.dis_scorehigh = this.root.find(".title_left label");
       	this.dis_compose = this.root.find(".title_right span");
       	this.dis_life = this.root.find(".gameWindow_count");
       	GameControl.addEventListener(GameControl.SCORE_CHANGE,this.scoreChange);
       	GameControl.addEventListener(GameControl.SCORE_HIGH_CHANGE,this.scoreHighChange);
       	GameControl.addEventListener(GameControl.COMPOSE_CHANGE,this.composeChange);
       	GameControl.addEventListener(GameControl.LIFE_CHANGE,this.lifeChange);
       	GameControl.addEventListener(GameControl.GAME_OVER,this.gameOverHandler);
       	
       	this.initData();
    }
    
    //初始化数据
    initData(){
    	this.dis_score.text(GameModel.score);
    	this.dis_scorehigh.text(GameModel.highScore);
    	this.dis_compose.text(GameModel.compose);
    	this.dis_life.css({
    		"background-position-y":(5-GameModel.life)*-30
    	});
    }
    
    //分数改变
    scoreChange = (obj) =>{
    	this.dis_score.text(obj);
    }
    
    //最高分数改变
    scoreHighChange = (obj) =>{
    	this.dis_scorehigh.text(obj);
    }
    
    //合成数改变
    composeChange = (obj) =>{
    	console.log("合成数改变",obj)
    	this.dis_compose.text(obj);
    }
    
    //生命改变
    lifeChange = (obj) =>{
    	let lifeN = obj;
    	this.dis_life.css({
    		"background-position-y":(5-lifeN)*-30
    	});
    }
    
    //游戏结束
    gameOverHandler = () =>{
    	let score = new ScoreWindow();
       	this.root.append(score.root);
    }

}
export default GameWindow;