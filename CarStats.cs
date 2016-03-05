using UnityEngine;
using System.Collections;

public class CarStats : MonoBehaviour {
	
	public float CarHealth;
	public float acceleration;
	
	public float degenerationFactor;
	
	public float LapTimer;
	public float[] LapChart;
	
	public string TM;
	public int lap;
	
	public float totalTime;
	
	public GameObject bullet;
	public GameObject bulletSpawn;
	
	public GameObject gunspark;
	public Material[] fire;
	
	public AudioSource MGShoot;
	public AudioClip MG_sound;
	
	public Light MGLight;
	
	public int bulletMags;
	
	public GameObject ChainGun;
	public bool Weapons;
	public float Wtimer;
	public GameObject CGSpawn;
	public GameObject CGspark;
	public AudioSource CGShoot;
	public AudioClip CG_sound;
	
	public Light CGLight;
	
	void Awake(){
		CarHealth = 100;
		GameObject.FindGameObjectWithTag("OA").GetComponent<OrionAnalytics>().PlayerHealth = CarHealth;
		LapTimer = 0;
		lap = 0;
		totalTime = 0;
		gunspark.renderer.material = fire[0];
		CGspark.renderer.material = fire[0];
		bulletMags = 800;
		Weapons = false;
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	private void WeaponSystem(){
	
		if(Weapons == true){
			Wtimer += 0.025f;
			ChainGun.animation["ws1active"].wrapMode = WrapMode.ClampForever;
			ChainGun.animation["ws1active"].speed = 2;
			ChainGun.animation.CrossFade("ws1active");
		}
		else{
			ChainGun.animation["ws1active"].wrapMode = WrapMode.Once;
			ChainGun.animation["ws1active"].speed = -5;
			ChainGun.animation.CrossFade("ws1active");
		}
		
		if(Wtimer > 10){
			Wtimer = 0;
			Weapons = false;
		}
		
	}

	
	void FixedUpdate(){
		acceleration = gameObject.transform.rigidbody.velocity.magnitude;
		degenerationFactor = acceleration*0.9f;
		if(lap < 6){
			LapTimer = Time.time;
		}
		else{
			LapTimer = 0;
		}
		
		MachineGun();
		WeaponSystem();

	}
	
	private void MachineGun(){
		if(Input.GetKey(KeyCode.RightControl)){
			if(bulletMags > 0){
				gunspark.renderer.material = fire[1];
				GameObject bo = Instantiate(bullet,bulletSpawn.transform.position,bulletSpawn.transform.rotation) as GameObject;
				bulletMags--;
				MGShoot.PlayOneShot(MG_sound);
				MGLight.intensity = 8;
				bo.rigidbody.AddForce(transform.TransformDirection(Vector3.forward)*5000);
				
				if(Weapons == true){
					CGspark.renderer.material = fire[1];
					GameObject co = Instantiate(bullet,CGSpawn.transform.position,CGSpawn.transform.rotation) as GameObject;
					bulletMags--;
					CGShoot.PlayOneShot(CG_sound);
					CGLight.intensity = 8;
					co.rigidbody.AddForce(transform.TransformDirection(Vector3.forward*5000));
				}
			}
		}
		else{
			gunspark.renderer.material = fire[0];
			CGspark.renderer.material = fire[0];
			CGLight.intensity = 0;
			MGLight.intensity = 0;
		}
	}
	
	
	void OnTriggerEnter(Collider hit){
		
		if(hit.tag == "WeaponMarker"){
			ChainGun.animation["ws1active"].wrapMode = WrapMode.Once;
			Weapons = true;
		}
		
		if(hit.tag == "CD"){
			CarHealth = CarHealth - degenerationFactor;
			GameObject.FindGameObjectWithTag("OA").GetComponent<OrionAnalytics>().PlayerHealth = CarHealth;
		}
		
		if(hit.tag == "TM"){
			TM = hit.name;
			if(TM == "1"){
				lap++;
				if(lap < 6){
					LapChart[lap-1] = LapTimer;
				}
				else{
					totalTime = LapTimer;
					
				}
				LapChartUpdater();
			}
		}
	}
	
	private void LapChartUpdater(){
		if(lap == 6){
			for(int i = 1;i< lap-1;i++){
				if(i == 1){
					LapChart[i] = LapChart[i] - LapChart[i-1];
				}
				if(i == 2){
					LapChart[i] = LapChart[i] - LapChart[i-1] - LapChart[i-2];
				}
				if(i == 3){
					LapChart[i] = LapChart[i] - LapChart[i-1] - LapChart[i-2] - LapChart[i-3];
				}
				if(i == 4){
					LapChart[i] = LapChart[i] - LapChart[i-1] - LapChart[i-2] - LapChart[i-3] - LapChart[i-4];
				}
				if(i == 5){
					LapChart[i] = LapChart[i] - LapChart[i-1] - LapChart[i-2]- LapChart[i-3] - LapChart[i-4] - LapChart[i-5];
				}
			}
		}
	}
}
