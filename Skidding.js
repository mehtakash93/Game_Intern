#pragma strict

var currentFrictionValue:float;
var skidAt:float = 0.6;
var soundEmission : float = 10;
private var soundWait : float;
var skidSound: GameObject;

function Start () {
	skidAt = 1.2;
}

function Update () {
	var hit : WheelHit;
	transform.GetComponent(WheelCollider).GetGroundHit(hit);
	currentFrictionValue = Mathf.Abs(hit.sidewaysSlip);
	if(skidAt <= currentFrictionValue && soundWait <= 0){
		Instantiate(skidSound,hit.point,Quaternion.identity);
		soundWait = 1;
	}
	soundWait -= Time.deltaTime * soundEmission; 
}