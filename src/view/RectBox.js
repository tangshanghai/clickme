import $ from "jquery";
import Map from "../model/Map.js";
import GameControl from "../control/GameControl.js";
import RectItem from "./RectItem.js";

class RectBox{
	constructor(){
		this.root = $("<div></div>");
        let maps = Map.getNewMap();
        console.log(maps);
        for(let i=0;i<maps.length;i++){
            let arr = maps[i];
            for(let j=0;j<arr.length;j++){
                let v = arr[j];
                let ri = new RectItem({
                    value:v,
                    orderX:i,
                    orderY:j
                });
                //ri.setX(j*ri.getWidth());
                //ri.setY(i*ri.getHeight());
                this.root.append(ri.root);
            }
        }

        GameControl.addEventListener(GameControl.CREATE_ITEM,this.createItemHandler.bind(this));
	}

    createItemHandler(_obj){
        let ri = new RectItem({
            value:_obj.v,
            orderX:_obj.i,
            orderY:_obj.j
        });
        this.root.append(ri.root);
        ri.movieIn();
    }
}
export default RectBox;