#pragma strict

public var Wheel_fl:WheelCollider;
public var Wheel_fr:WheelCollider;
public var Wheel_rl:WheelCollider;
public var Wheel_rr:WheelCollider;

public var Wheel_flTrans:Transform;
public var Wheel_frTrans:Transform;
public var Wheel_rlTrans:Transform;
public var Wheel_rrTrans:Transform;

public var MaxTorque:float;

var LowestSteerAtSpeed:float;
var lowSpeedSteerAngle:float;
var highSpeedSteerAngle:float;

var decelerationSpeed:float;

var currentSpeed:float;
var topSpeed:float;
var maxReverseSpeed:float;

var timer:float;

public var WS1:GameObject;
public var Weapons:boolean;


private var braked : boolean;
var maxBrakeTorque: float;

private var mySidewayFriction : float;
private var myForwardFriction : float;
private var slipSidewayFriction: float;
private var slipForwardFriction: float;

var gearRatio:int[];
var gear : int;

public var gearSparks1:ParticleEmitter;
public var gearSparks2:ParticleEmitter;
var sparkTimer:float;


function Awake(){
	
	MaxTorque = 30;

	LowestSteerAtSpeed = 40;
	lowSpeedSteerAngle = 10;
	highSpeedSteerAngle = 1;
	
	decelerationSpeed = 40;
	
	topSpeed = 120;
	maxReverseSpeed = 40;
	
	braked = false;
	maxBrakeTorque = 100;
	
	gearSparks1.emit = false;
	gearSparks2.emit = false;
	sparkTimer = 0;

}

function Start () {
	rigidbody.centerOfMass.y = -0.7;
	//rigidbody.centerOfMass.z = 0.5;
	SetValues();
}

function SetValues(){
	myForwardFriction = Wheel_rr.forwardFriction.stiffness;
	mySidewayFriction = Wheel_rr.forwardFriction.stiffness;
	slipForwardFriction = 0.04;
	slipSidewayFriction = 0.08;
}

function FixedUpdate(){
	Control();
	WheelPosition();
	
	SteerControls();
	HandBrake();
	TransmissionSparks();
	
}

function Update(){
	EngineSound();
}

function HandBrake(){
	if(Input.GetButton("Jump")){
		braked = true;	
	}
	else{
		braked = false;
	}
	
	if(braked == true){
		Wheel_fr.brakeTorque = maxBrakeTorque;
		Wheel_fl.brakeTorque = maxBrakeTorque;
		Wheel_rr.motorTorque = 0;
		Wheel_rl.motorTorque = 0;
		if(rigidbody.velocity.magnitude > 1){
			SetSlip(slipForwardFriction,slipSidewayFriction);
		}
		else{
			SetSlip(1,1);
		}
	}
	else{
		Wheel_fr.brakeTorque = 0;
		Wheel_fl.brakeTorque = 0;
		SetSlip(myForwardFriction,mySidewayFriction);
	}
}



function Control(){
	currentSpeed = 2*Mathf.PI*Wheel_rr.radius*Wheel_rr.rpm*60/1000;
	currentSpeed = Mathf.Round(currentSpeed);
	if(currentSpeed < topSpeed && currentSpeed > -maxReverseSpeed && !braked){
		Wheel_rl.motorTorque = MaxTorque*Input.GetAxis("Vertical");
		Wheel_rr.motorTorque = MaxTorque*Input.GetAxis("Vertical");
		Wheel_flTrans.Rotate(Wheel_fl.rpm/60*360*Time.deltaTime,0,0);
		Wheel_frTrans.Rotate(Wheel_fr.rpm/60*360*Time.deltaTime,0,0);
		Wheel_rlTrans.Rotate(Wheel_rl.rpm/60*360*Time.deltaTime,0,0);
		Wheel_rrTrans.Rotate(Wheel_rr.rpm/60*360*Time.deltaTime,0,0);
	}
	else{
		Wheel_rl.motorTorque = 0;
		Wheel_rr.motorTorque = 0;
	}
	
	if(Input.GetButton("Vertical")==false){
		Wheel_rl.brakeTorque = decelerationSpeed;
		Wheel_rr.brakeTorque = decelerationSpeed;
	}
	else{
		Wheel_rl.brakeTorque = 0;
		Wheel_rr.brakeTorque = 0;
	}
	
}

function SteerControls(){
	var speedFactor = rigidbody.velocity.magnitude/LowestSteerAtSpeed;
	var currentSteerAngle = Mathf.Lerp(lowSpeedSteerAngle,highSpeedSteerAngle,speedFactor);
	currentSteerAngle *= Input.GetAxis("Horizontal");
	
	Wheel_fl.steerAngle = currentSteerAngle;
	Wheel_fr.steerAngle = currentSteerAngle;
	
	Wheel_flTrans.localEulerAngles.y = Wheel_fl.steerAngle - Wheel_flTrans.localEulerAngles.z;
	Wheel_frTrans.localEulerAngles.y = Wheel_fr.steerAngle - Wheel_frTrans.localEulerAngles.z;
}

function WheelPosition(){
	var hitfl:RaycastHit;
	var hitfr:RaycastHit;
	var WheelPosfl:Vector3;
	var WheelPosfr:Vector3;
	if(Physics.Raycast(Wheel_fl.transform.position,-Wheel_fl.transform.up,hitfl,Wheel_fl.radius+Wheel_fl.suspensionDistance)){
		WheelPosfl = hitfl.point+Wheel_fl.transform.up*Wheel_fl.radius;
	}
	else{
		WheelPosfl = Wheel_fl.transform.position - Wheel_fl.transform.up*Wheel_fl.suspensionDistance;
	}
	
	if(Physics.Raycast(Wheel_fr.transform.position,-Wheel_fr.transform.up,hitfr,Wheel_fr.radius+Wheel_fr.suspensionDistance)){
		WheelPosfr = hitfr.point+Wheel_fr.transform.up*Wheel_fr.radius;
	}
	else{
		WheelPosfr = Wheel_fr.transform.position - Wheel_fr.transform.up*Wheel_fr.suspensionDistance;
	}
	
	Wheel_flTrans.position = WheelPosfl;
	Wheel_frTrans.position = WheelPosfr;
	
}

function SetSlip(currentForwardFriction:float,currentSidewayFriction:float){
	Wheel_rr.forwardFriction.stiffness = currentForwardFriction;
	Wheel_rl.forwardFriction.stiffness = currentForwardFriction;
	Wheel_fr.forwardFriction.stiffness = currentForwardFriction;
	Wheel_fl.forwardFriction.stiffness = currentForwardFriction;
	
	Wheel_rr.sidewaysFriction.stiffness = currentSidewayFriction;
	Wheel_rl.sidewaysFriction.stiffness = currentSidewayFriction;
	Wheel_fr.sidewaysFriction.stiffness = currentSidewayFriction;
	Wheel_fl.sidewaysFriction.stiffness = currentSidewayFriction;
}

function OnTriggerEnter(hit:Collider){
	if(hit.tag == "WeaponMarker"){
		WS1.animation["ws1active"].wrapMode = WrapMode.Once;
		Weapons = true;
	}
}

function EngineSound(){
	for(var i = 0; i < gearRatio.length; i++){
		if(gearRatio[i] > currentSpeed){
			gear = i;
			
			break;
		}
	}
	var gearMinValue : float = 0.00;
	var gearMaxValue : float = 0.00;
	if(i == 0){
		gearMinValue = 0;
		gearMaxValue = gearRatio[i];
	}
	else{
		gearMinValue = gearRatio[i-1];
		gearMaxValue = gearRatio[i];
	}
	var enginePitch : float = ((Mathf.Abs(currentSpeed) - gearMinValue)/(gearMaxValue - gearMinValue)) +1;
	audio.pitch = enginePitch;
	if(audio.pitch -1 == 0.6){
		sparkTimer = 2;
	}
}

function TransmissionSparks(){
	if(sparkTimer > 0){
		gearSparks1.emit = true;
		gearSparks2.emit = true;
		sparkTimer -= 0.25;
	}
	
	if(sparkTimer < 0){
		sparkTimer = 0;
	}
	
	if(sparkTimer == 0){
		gearSparks1.emit = false;
		gearSparks2.emit = false;
	}
}
