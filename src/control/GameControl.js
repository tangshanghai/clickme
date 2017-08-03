/**
 * Created by tangshanghai on 2017/4/17.
 */
import Event from "../lib/Event.js";
class GameControl extends Event{
    constructor(){
        super();

        this.RECTITEM_CLICK = "rectItem_click";
        this.START_CLEAR = "start_click";
        this.RECTITEM_LOCK = "rectItem_lock";
        this.MOVE_TO = "move_to";
        this.UPDATE_ITEM = "update_item";
        this.CREATE_ITEM = "create_item";
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


}
export default new GameControl();