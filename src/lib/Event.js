/**
 * Created by tangshanghai on 2016/12/29.
 */
class Event{
    constructor(){
        this.callBacks = [];
    }

    addEventListener(type,callback){
        this.callBacks.push({
            type:type,
            callback:callback
        })
    }

    removeEventListener(type,callback){
        for(var i = 0;i<this.callBacks.length;i++){
            var temp = this.callBacks[i];
            if(temp.type == type && temp.callback == callback){
                this.callBacks.splice(i,1);
                break;
            }
        }
    }

    dispatchEvent(type,parameter){
        for(var i = 0;i<this.callBacks.length;i++){
            var temp = this.callBacks[i];
            if(temp.type == type){
                temp.callback(parameter);
            }
        }
    }
}

export default Event;