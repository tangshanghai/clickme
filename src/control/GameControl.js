/**
 * Created by tangshanghai on 2017/4/17.
 */
import Event from "../lib/Event.js";
class GameControl extends Event{
    constructor(){
        super();

		this.SCORE_CHANGE = "score_change";
		this.SCORE_HIGH_CHANGE = "score_high_change";
		this.LIFE_CHANGE = "life_change";
		this.COMPOSE_CHANGE = "compose_change";
		this.GAME_OVER = "game_over";
		
        this.RECTITEM_CLICK = "rectItem_click";
        this.START_CLEAR = "start_click";
        this.RECTITEM_LOCK = "rectItem_lock";
        this.MOVE_TO = "move_to";
        this.UPDATE_ITEM = "update_item";
        this.CREATE_ITEM = "create_item";
        
        this.BACK_TOMAIN = "back_tomain";
        this.GAME_RESET = "game_reset";
    }

	//得分改变
	ScoreChange(_obj){
		this.dispatchEvent(this.SCORE_CHANGE,_obj);
	}
	
	//最高分改变
	ScoreHighChange(_obj){
		this.dispatchEvent(this.SCORE_HIGH_CHANGE,_obj);
	}
	
	//生命改变
	LifeChange(_obj){
		this.dispatchEvent(this.LIFE_CHANGE,_obj);
	}
	
	//合成数改变
	ComposeChange(_obj){
		this.dispatchEvent(this.COMPOSE_CHANGE,_obj);
	}
	
    RectItemClick(_obj){
        this.dispatchEvent(this.RECTITEM_CLICK,_obj);
    }

    RectItemLock(_obj){
        //{isLock:true}
        this.dispatchEvent(this.RECTITEM_LOCK,_obj);
    }

    MoveToPos(_obj){
        this.dispatchEvent(this.MOVE_TO,_obj);
    }

    UpdateItem(_obj){
        this.dispatchEvent(this.UPDATE_ITEM,_obj);
    }

    CreateItem(_obj){
        this.dispatchEvent(this.CREATE_ITEM,_obj);
    }
    StartClear(_obj){
        this.dispatchEvent(this.START_CLEAR,_obj);
    }
    
    /*
     *游戏结束
     * */
    GameOver(_obj){
    	this.dispatchEvent(this.GAME_OVER,_obj);
    }
    /*
     * 回到主页
     */
    backToMain(_obj){
    	this.dispatchEvent(this.BACK_TOMAIN,_obj);
    }
	/*
     * 重玩游戏
     */
    resetGame(_obj){
    	this.dispatchEvent(this.GAME_RESET,_obj);
    }

}
export default new GameControl();