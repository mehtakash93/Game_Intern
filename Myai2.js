var path : Array;  
var pathGroup : Transform;  
var maxSteer : float;  
var wheelFL : WheelCollider;   
var wheelFR : WheelCollider;  
var wheelRL : WheelCollider;   
var wheelRR : WheelCollider;  
var currentPathObj : int;  
var xpos:float;
var mag:float;
var dir:float;
 var dist:float;
 var maxTorque:float;
 var decelerationSpeed:float;
 var gearRatio:int[];
var gear : int;
var inSector : boolean;  

private var mySidewayFriction : float;
private var myForwardFriction : float;
private var slipSidewayFriction: float;
private var slipForwardFriction: float;

var currentSpeed:float;
var topSpeed:float;
  function Awake()
  {
  maxSteer=30; 
dist=15;
maxSteer=15.0;
rigidbody.centerOfMass.y = -0.7;
decelerationSpeed = 40;
topSpeed = 120;

  }
function Start () { 
maxSteer=30; 
dist=15;
maxSteer=15.0;
rigidbody.centerOfMass.y = -0.7;
decelerationSpeed = 40;
topSpeed = 120;
minCarSpeed=20;
GetPath();
  SetValues();

}  
function SetValues(){
	myForwardFriction = wheelRR.forwardFriction.stiffness;
	mySidewayFriction = wheelRR.forwardFriction.stiffness;
	slipForwardFriction = 0.04;
	slipSidewayFriction = 0.08;
}
  
function GetPath (){  
var path_objs : Array = pathGroup.GetComponentsInChildren(Transform);  
path = new Array();  
  
for (var path_obj : Transform in path_objs){  
 if (path_obj != pathGroup)  
  path [path.length] = path_obj;  
}  
Debug.Log(path.length);
}  
  
  
function Update () {  
GetSteer();
MoveCar();  
Engine();
}  

function GetSteer(){  
var steerVector : Vector3 = transform.InverseTransformPoint(Vector3(path[currentPathObj].position.x,transform.position.y,path[currentPathObj].position.z));  
var newSteer : float = maxSteer * (steerVector.x / steerVector.magnitude);  
xpos=steerVector.x;
mag=steerVector.magnitude;
dir=steerVector.x / steerVector.magnitude;
wheelFL.steerAngle = newSteer;  
wheelFR.steerAngle = newSteer;  
if(steerVector.magnitude<=dist)
{
currentPathObj++;
}
if(currentPathObj >=path.length)
{
currentPathObj=0;
}
}  
function MoveCar()
{
currentSpeed = 2*Mathf.PI*wheelRR.radius*wheelRR.rpm*60/1000;
currentSpeed = Mathf.Round(currentSpeed);
if(currentSpeed < topSpeed  && !inSector)
{
wheelRL.motorTorque = maxTorque; 
wheelRR.motorTorque = maxTorque; 
wheelRL.brakeTorque = 0;
wheelRR.brakeTorque =0;
SetSlip(myForwardFriction,mySidewayFriction);
}
else if (!inSector){  
wheelRL.motorTorque = 0;  
wheelRR.motorTorque = 0;  
wheelRL.brakeTorque = decelerationSpeed;  
wheelRR.brakeTorque = decelerationSpeed;  
}  
}

function Engine(){
for(var i = 0; i < gearRatio.length; i++){
		if(gearRatio[i] > currentSpeed){
			gear = i;
			}
			}
}
function SetSlip(currentForwardFriction:float,currentSidewayFriction:float){
	wheelRR.forwardFriction.stiffness = currentForwardFriction;
	wheelRL.forwardFriction.stiffness = currentForwardFriction;
	wheelFR.forwardFriction.stiffness = currentForwardFriction;
	wheelFL.forwardFriction.stiffness = currentForwardFriction;
	
	wheelRR.sidewaysFriction.stiffness = currentSidewayFriction;
	wheelRL.sidewaysFriction.stiffness = currentSidewayFriction;
	wheelFR.sidewaysFriction.stiffness = currentSidewayFriction;
	wheelFL.sidewaysFriction.stiffness = currentSidewayFriction;
}

  
  
			
			