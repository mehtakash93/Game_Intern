#pragma strict

var carTransform:Transform;
var distance:float;
var height:float;
var rotationDamp:float;
var heightDamp:float;
var zoomRatio:float;
var defaultFOV:float;
private var rotationVector:Vector3;
var acceleration:float;

function Start () {
	distance = 3.3;
	height = 0.8;
	rotationDamp = 3.0;
	heightDamp = 2.0;
	zoomRatio = 1;
	defaultFOV = 60;
}

function LateUpdate () {
	var wantedAngle = rotationVector.y;
	var wantedHeight = carTransform.position.y + height;
	var myAngle = transform.eulerAngles.y;
	var myHeight = transform.position.y;
	
	myAngle = Mathf.LerpAngle(myAngle,wantedAngle,rotationDamp*Time.deltaTime);
	myHeight = Mathf.Lerp(myHeight,wantedHeight,heightDamp*Time.deltaTime);
	
	var currentRotation = Quaternion.Euler(0,myAngle,0);
	transform.position = carTransform.position;
	transform.position -= currentRotation*Vector3.forward*distance;
	transform.position.y = myHeight;
	transform.LookAt(carTransform);

}

function FixedUpdate(){
	var localVelocity = carTransform.InverseTransformDirection(carTransform.rigidbody.velocity);
	if(localVelocity.z<-0.5){
	rotationVector.y = carTransform.eulerAngles.y + 180;
	}
	else{
	rotationVector.y = carTransform.eulerAngles.y;
	}
	acceleration = carTransform.rigidbody.velocity.magnitude;
	camera.fieldOfView = defaultFOV + acceleration*zoomRatio;
}