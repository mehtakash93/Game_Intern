#pragma strict

public var Target:Transform;

function Start () {

}

function LateUpdate () {
	transform.position = new Vector3(Target.position.x,transform.position.y,Target.position.z);
}