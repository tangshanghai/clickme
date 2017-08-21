import Event from "../lib/Event.js";
import GameControl from "../control/GameControl";
class GameModel extends Event{
    constructor(){
        super();

        this.score = 0;
        this.compose = 5;//初始就为5;
        this.highScore = 0;//最高分
        this.life = 5;//默认5条命
        this.lianji = 0;//连击
        
        let hs = this.getCookie("highScore");
        if(hs == ""){
        	this.highScore = 0;
        }else{
        	this.highScore = parseInt(hs);
        }
        console.log(this.highScore);
    }
    
    getCookie(c_name)
	{
		if (document.cookie.length>0)
		{
			let c_start,c_end;
			c_start=document.cookie.indexOf(c_name + "=")
		  	if (c_start!=-1)
		    { 
			    c_start=c_start + c_name.length+1;
			    c_end=document.cookie.indexOf(";",c_start);
			    if (c_end==-1) c_end=document.cookie.length;
			    return unescape(document.cookie.substring(c_start,c_end));
		    } 
		  
		}
		return "";
	}
    
    setCookie(c_name,value,expiredays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	}

    resetGame(){
    	this.score = 0;
    	this.compose = 5;
    	this.life = 5;
    	let hs = this.getCookie("highScore");
        if(hs == ""){
        	this.highScore = 0;
        }else{
        	this.highScore = parseInt(hs);
        }
    }
    
    //合成了数，及合成值
    composeNumber(_v,_leng,isGoon){
    	if(_leng < 2) _leng = 2;
    	if(isGoon){
    		this.lianji++;
    	}else{
    		this.lianji = 0;
    	}
    	this.score += (_leng-1)*(_leng-1)*100+(this.lianji*500);
    	let nowCompose = _v+1;
    	if(nowCompose > this.compose){
    		this.compose = nowCompose;
    		GameControl.ComposeChange(this.compose);
    	}
    	GameControl.ScoreChange(this.score);
    }
    
    //增加或减少生命
    addOrRemoveLife(b){
    	if(b){
    		this.life++;
    		if(this.life > 5) this.life = 5;
    	}else{
    		this.life--;
    		if(this.life < 0){
    			this.life = 0;
    			console.log("游戏结束");
    			GameControl.GameOver();
    			return;
    		}
    	}
    	GameControl.LifeChange(this.life);
    }



}
export default new GameModel();