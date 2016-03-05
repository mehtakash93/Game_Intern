var mypath: Array;
var rayColor:Color;
function OnDrawGizmos() {
		// Draw a yellow sphere at the transform's position
		Gizmos.color = rayColor;
		var mypath_child:Array=transform.GetComponentsInChildren(Transform);
	mypath=new Array();
		for(var putobjs:Transform in mypath_child)
		{
		if(putobjs!=transform)
		mypath [mypath.length]=putobjs;
		}
		for(var i:int=0; i<mypath.length; i++)
		{
		var current:Vector3=mypath[i].position;
	if(i>0)
		{
	var previous=mypath[i-1].position;
	Gizmos.DrawLine(previous,current);
	Gizmos.DrawSphere(current,0.4);
	
		
		}	
	}
	}
	
	
	
	
	


