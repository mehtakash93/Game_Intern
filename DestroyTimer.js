#pragma strict
var destroyAfter:float = 2;
private var timer:float;

function Update () {
	timer += Time.deltaTime;
	if(destroyAfter <= timer){
		Destroy(gameObject);
	}
}