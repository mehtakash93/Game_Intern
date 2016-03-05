using UnityEngine;
using System.Collections;

public class CD : MonoBehaviour {
	
	public GameObject OA;
	
	void Awake(){
		OA = GameObject.FindGameObjectWithTag("OA");
	}
	
	void OnTriggerEnter(Collider hit){
		if(hit.tag == "Player"){
			OA.GetComponent<OrionAnalytics>().CollisionCount++;
		}
	}
}
