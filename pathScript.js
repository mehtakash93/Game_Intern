var path:Array;
var rayColor:Color = Color.red;

function OnDrawGizmos(){
	Gizmos.color = rayColor;
	
	for(var i:int = 0;i<path.length;i++){
		var pos : Vector3 = path[i].position;
		if(i>0){
			var prev = path[i-1].position;
			Gizmos.DrawLine(prev,pos);
			Gizmos.DrawWireSphere(pos,1.5);
		}
	}
}