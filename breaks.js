var maxBreakTorque : float;  
var minCarSpeed : float;  
  
  
function OnTriggerStay (other : Collider){  
  
if (other.tag == "aiplayer"){  
var controlCurrentSpeed : float = other.transform.root.GetComponent(Myai2).currentSpeed;  
if (controlCurrentSpeed >= minCarSpeed){  
other.transform.root.GetComponent(Myai2).inSector = true;  
other.transform.root.GetComponent(Myai2).wheelRR.brakeTorque = maxBreakTorque;  
other.transform.root.GetComponent(Myai2).wheelRL.brakeTorque = maxBreakTorque;  
}  
else {  
other.transform.root.GetComponent(Myai2).inSector = false;  
other.transform.root.GetComponent(Myai2).wheelRR.brakeTorque = 0;  
other.transform.root.GetComponent(Myai2).wheelRL.brakeTorque = 0;  
}    
}  
}  
  
function OnTriggerExit (other : Collider){  
if (other.tag == "aiplayer"){  
other.transform.root.GetComponent(Myai2).inSector = false;  
other.transform.root.GetComponent(Myai2).wheelRR.brakeTorque = 0;  
other.transform.root.GetComponent(Myai2).wheelRL.brakeTorque = 0;  
 
}  
} 