var waypt:Transform[];
var speed=10;
var curr:int=0;
function Update () {

if(curr<waypt.length)
{
var way:Vector3=waypt[curr].position;
var dir:Vector3= way-transform.position;
var vel=rigidbody.velocity;
if(dir.magnitude<1)
{
curr++;
}
else{
vel=dir.normalized*speed;
}
}
rigidbody.velocity=vel;


}