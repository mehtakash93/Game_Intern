#pragma strict

var destroytimer:float;

function Update () {
	destroytimer += 0.05;;
	
	if(destroytimer > 5){
		Destroy(this.gameObject);
	}
}