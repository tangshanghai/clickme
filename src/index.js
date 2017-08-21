import Main from "./Main.js";
import $ from "jquery";
import GameControl from "./control/GameControl.js";

GameControl.addEventListener(GameControl.BACK_TOMAIN,backmainHandler);
var main = new Main();
$("body").append(main.root);

function backmainHandler(){
	$("body").empty();
	main = new Main();
	$("body").append(main.root);
}
