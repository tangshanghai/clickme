/**
 * Created by tangshanghai on 2017/4/14.
 */
import $ from "jquery";
import Configuration from "../model/Configuration.js";
import GameControl from "../control/GameControl.js";
import GameModel from "../model/GameModel.js";

class RectItem{
    constructor(_obj){
        const defaultW = 60;
        const defaultH = 60;
        let wordColor = Configuration.rectWordColor || "#000000";
        this.orderX = _obj.orderX;
        this.orderY = _obj.orderY;
        this.isLock = false;
        this.defaultWH = defaultW;
        this.v = _obj.value || 1;
        this.root = $("<div></div>");
        this.content = $("<div></div>");
        this.content.text(this.v);
        this.root.append(this.content);
        this.root.css({
            left:this.orderY*defaultW,
            top:this.orderX*defaultH,
            width:defaultW,
            height:defaultH,
//          background:Configuration.rectColors[this.v-1],
        });
        this.content.css({
        	background:Configuration.rectColors[this.v-1],
        });
        
        this.root.addClass("RectItem");
        this.content.addClass("RectItem_content");
        

        this.root.click(this.clickHandler.bind(this));
        GameControl.addEventListener(GameControl.RECTITEM_LOCK,this.lockHandler.bind(this));
        GameControl.addEventListener(GameControl.MOVE_TO,this.moveToHandler.bind(this));
        GameControl.addEventListener(GameControl.UPDATE_ITEM,this.updateItemHandler.bind(this));
    }

    clickHandler(){
        console.log("aaabbbccc")
        if(this.isLock) return;
        this.v++;
        this.content.text(this.v);
        this.content.css("background",Configuration.rectColors[this.v-1]);
        console.log("点击时",this.getOrderX(),this.getOrderY())
        GameControl.RectItemClick({
            i:this.getOrderX(),
            j:this.getOrderY()
        });
    }

    lockHandler(_obj){
        this.isLock = _obj.isLock;
    }

    moveToHandler(_obj){
        if(_obj.si == this.orderX && _obj.sj == this.orderY){
            let left = _obj.ej*this.defaultWH;
            let top = _obj.ei*this.defaultWH;
            let self = this;
            this.root.animate({
                left:left,
                top:top
            },_obj.mTime,function(){
                self.orderX = _obj.ei;
                self.orderY = _obj.ej;
                if(_obj.isRemove){
                    self.removeSelf();
                }
            });
            console.log(_obj.si,_obj.sj,"aaa",_obj.ei,_obj.ej)
        }
    }

    updateItemHandler(_obj){
        if(_obj.i == this.orderX && _obj.j == this.orderY){
            this.v = _obj.v;
            this.content.text(this.v);
            this.content.css("background",Configuration.rectColors[this.v-1]);
        }
    }

    movieIn(){
        this.setY(-this.defaultWH);
        this.root.animate({
            top:this.orderX*this.defaultWH
        },1000);
    }
    setX(v){
        this.root.css("left",v);
    }

    setY(v){
        this.root.css("top",v);
    }

    getWidth(){
        return this.root.width();
    }

    getHeight(){
        return this.root.height();
    }

    getOrderX(){
        return this.orderX;
    }

    getOrderY(){
        return this.orderY;
    }

    removeSelf(){
        GameControl.removeEventListener(GameControl.RECTITEM_LOCK,this.lockHandler.bind(this));
        GameControl.removeEventListener(GameControl.MOVE_TO,this.moveToHandler.bind(this));
        GameControl.removeEventListener(GameControl.UPDATE_ITEM,this.updateItemHandler.bind(this));
        this.root.remove();
        console.log("asdfasfasfasfasfafdd")
    }
}
export default RectItem;