using UnityEngine;
using System.Collections;

public class MainMenu : MonoBehaviour {
	
	public GUIStyle bg;
	public GUIStyle btnrace;
	public GUIStyle btnexit;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnGUI(){
		GUI.Label(new Rect(0,0,Screen.width,Screen.height),"Biker Fest\n of \nIndia",bg);
		if(GUI.Button(new Rect(Screen.width/2-100,Screen.height-220,200,200),"Race",btnrace)){
			Application.LoadLevel(1);
		}
		if(GUI.Button(new Rect(Screen.width/2+100,Screen.height-220,200,200),"Exit",btnrace)){
			Application.Quit();
		}
	}
}
