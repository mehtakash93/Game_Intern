using UnityEngine;
using System.Collections;

public class GUIManager : MonoBehaviour {
	
	public RenderTexture MiniMapTex;
	public Material MiniMapMaterial;
	
	private float offset;
	
	public GUIStyle btn1;
	
	// Use this for initialization
	void Awake () {
		offset = 10;
	}
	
	// Update is called once per frame
	void OnGUI () {
		if(Event.current.type == EventType.Repaint){
			Graphics.DrawTexture(new Rect(Screen.width-200-offset,offset,200,200),MiniMapTex,MiniMapMaterial);
		}
		
		if(GUI.Button(new Rect(10,10,100,100),"Menu",btn1)){
			Application.LoadLevel(0);
		}
	}
}
