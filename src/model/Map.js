import $ from "jquery";
import GameControl from "../control/GameControl.js";
import GameModel from "../model/GameModel.js";

class Map{
	constructor(){
		this.Maps = [];
        this.range = 5;

        GameControl.addEventListener(GameControl.RECTITEM_CLICK,this.itemClickHandler.bind(this));

	}

    itemClickHandler(_obj){
        let obj = _obj;
        if(obj == null) return;
        let i = obj.i,j=obj.j;
        this.Maps[i][j]++;
        let composeNum = this.Maps[i][j];
        let arr = this.findThree(i,j);
        if(arr == null){
            console.log("未查找到三连线！");
            GameModel.addOrRemoveLife(false);
        }else{
            GameControl.RectItemLock({isLock:true});
            GameModel.composeNumber(composeNum,arr.length,false);
            this.startMove(arr,i,j);
        }
    }

    startMove(arr,i,j){
        for(let k=0;k<arr.length;k++){
            let item = arr[k];
            let obj = {
                si:item.i,
                sj:item.j,
                ei:i,
                ej:j,
                mTime:1000,
                isRemove:true
            };
            this.Maps[item.i][item.j] = 0;
            GameControl.MoveToPos(obj);
        }
        let self = this;
        setTimeout(function(){
            self.Maps[i][j]++;
            GameControl.UpdateItem({i:i,j:j,v:self.Maps[i][j]});
            self.repairMaps();
        },1000);

    }

    //地图填空
    repairMaps(){
        for(let j=4;j>=0;j--){
            let zeroArr = [];
            let hasArr = [];
            for(let i=4;i>=0;i--){
                if(this.Maps[i][j] != 0){
                    hasArr.push({i:i,j:j,v:this.Maps[i][j]});
                }
            }
            for(let i=4;i>=0;i--){
                if(hasArr.length > 0){
                    let hasObj = hasArr.shift();
                    this.Maps[i][j] = hasObj.v;
                    GameControl.MoveToPos({
                        si:hasObj.i,
                        sj:hasObj.j,
                        ei:i,
                        ej:j,
                        mTime:1000,
                        isRemove:false
                    });
                }else{
                	let rangeNum = GameModel.compose;
                    this.Maps[i][j] = (Math.floor(Math.random()*5)+1)+(rangeNum-5);//Math.floor(Math.random()*this.range)+1;
                    GameControl.CreateItem({
                        v:this.Maps[i][j],
                        i:i,
                        j:j
                    });
                }
            }
        }

        //继续查找连线情况
        setTimeout(this.goOnFind.bind(this),1000);
    }
    //继续查找
    goOnFind(){
        for(let i=0;i<5;i++){
            for(let j=0;j<5;j++){
                let arr = this.findThree(i,j);
                if(arr != null){
                    GameControl.RectItemLock({isLock:true});
                    let composeNum = this.Maps[i][j];
                    GameModel.composeNumber(composeNum,arr.length,true);
                    this.startMove(arr,i,j);
                    GameModel.addOrRemoveLife(true);//第二次加载需要续一次命
                    return;
                }
            }
        }
        GameControl.RectItemLock({isLock:false});
        //console.log("查找完成，需要告知现在的分数与合成值")
    }
    findThree(i,j){
        let cv = this.Maps[i][j];
        //横向查找
        let hArr = [];
        for(let k=i-1;k>=0;k--){
            if(this.Maps[k][j] == cv){
                hArr.push({i:k,j:j});
            }else{
                break;
            }
        }
        for(let k=i+1;k<5;k++){
            if(this.Maps[k][j] == cv){
                hArr.push({i:k,j:j});
            }else{
                break;
            }
        }
        //竖向查找
        let vArr = [];
        for(let k=j-1;k>=0;k--){
            if(this.Maps[i][k] == cv){
                vArr.push({i:i,j:k});
            }else{
                break;
            }
        }
        for(let k=j+1;k<5;k++){
            if(this.Maps[i][k] == cv){
                vArr.push({i:i,j:k});
            }else{
                break;
            }
        }
        if(hArr.length < 2 && vArr.length < 2){
            return null;
        }
        if(hArr.length > vArr.length){
            return hArr;
        }else{
            return vArr;
        }
        //let willClearArr = hArr.concat(vArr);
        //return willClearArr;
    }

    createMap(){
        let mapArr = new Array();
        for(let i=0;i<5;i++){
            let temparr = new Array();
            for(let j=0;j<5;j++){
                let v = Math.floor(Math.random()*this.range)+1;
                temparr.push(v);
            }
            mapArr.push(temparr);
        }
        return mapArr;
    }
	getNewMap(){
		let mapArr = this.createMap();
        for(let i=0;i<5;i++){
            console.log(mapArr[i]);
        }
        console.log("去除三连线");
        //this.RemoveThree(mapArr);
        while(this.isHasThree(mapArr)){
            console.log("次数")
            mapArr = this.createMap();
        }
        for(let i=0;i<5;i++){
            console.log(mapArr[i]);
        }
        this.Maps = mapArr;
		return this.Maps;
	}

    RemoveThree(arr){
        for(let i=0;i<arr.length;i++){
            let temparr = arr[i];
            for(let j=0;j<temparr.length;j++){
                let c = arr[i][j];
                let left = j-1>=0?arr[i][j-1]:-1;
                let right = j+1<=temparr.length-1?arr[i][j+1]:-1;
                let top = i-1>=0?arr[i-1][j]:-1;
                let bottom = i+1<=arr.length-1?arr[i+1][j]:-1;

                if(c == left && left == right){
                    //console.log("横向查找",i,j,c+":"+left+":"+right);
                    c = arr[i][j]++;// = Math.floor(Math.random()*this.range)+1;
                    if(c == top && top == bottom){
                        //console.log("竖向查找2",i,j)
                        c = arr[i][j]++;// = Math.floor(Math.random()*this.range)+1;
                    }
                    j--;
                }else if(c == top && top == bottom){
                    //console.log("竖向查找",i,j,c+":"+top+":"+bottom)
                    c = arr[i][j]++;// = Math.floor(Math.random()*this.range)+1;
                    if(c == left && left == right){
                        //console.log("横向查找2",i,j);
                        c = arr[i][j]++;// = Math.floor(Math.random()*this.range)+1;
                    }
                    i--;
                }
            }
        }
    }

    isHasThree(arr){
        for(let i=0;i<arr.length;i++){
            let temparr = arr[i];
            for(let j=0;j<temparr.length;j++){
                let c = arr[i][j];
                let left = j-1>=0?arr[i][j-1]:-1;
                let right = j+1<=temparr.length-1?arr[i][j+1]:-1;
                let top = i-1>=0?arr[i-1][j]:-1;
                let bottom = i+1<=arr.length-1?arr[i+1][j]:-1;
                if((c == left && left == right) || (c == top && top == bottom)){
                    return true;
                }
            }
        }
        return false;
    }
}

export default new Map();