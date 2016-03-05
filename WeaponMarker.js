#pragma strict

var _mesh:GameObject;
var _mesh1:GameObject;

var activated:boolean;

function Awake(){
	activated = false;
}

function Update () {
	Activated();
	if(Time.time > 20){
		activated = true;
	}
}

function Activated(){
	if(activated == true){
		_mesh.SetActive(true);
		_mesh1.SetActive(false);
		_mesh.transform.Rotate(Vector3.up * 100 *Time.deltaTime, Space.World);
	}
	else{
		_mesh.SetActive(false);
		_mesh1.SetActive(true);
	}
}