#pragma strict
var myparts1:GameObject;
var myparts2:GameObject;
function Start()
{
myparts1.SetActive(false);
myparts2.SetActive(false);

}
function OnTriggerEnter (coll : Collider)
{
if(coll.gameObject.name=="PoliceCar")
{
myparts1.SetActive(true);
Destroy(myparts1,7);
}
if(coll.gameObject.name=="CompCar")
{
myparts2.SetActive(true);
Destroy(myparts2,7);
}
}
