using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class hextodec : MonoBehaviour {
	
	public string hexcode;
	
	public int hexlength;
	
	public char[] hexarray;
	public string[] decarray;
	
	public string add1;
	public string add2;
	public string add3;
	public string add4;
	
	public string dec1;
	public string dec2;
	public string dec3;
	public string dec4;
	
	
	
	void Awake(){
		hexcode = "0100A8C0";
		hexlength = hexcode.Length;
	}
	
	void Start(){
		
			hexarray = hexcode.ToCharArray();
			for(int i =0;i<hexlength/2;i++){
				if(i==0){
					add1 = hexarray[i].ToString();
					add1 += hexarray[i+1].ToString();
					char[] a1 = add1.ToCharArray();
					dec1 = HexToDec(a1[0])+HexToDec(a1[1]);
				}	
				if(i==1){
					add2 = hexarray[i+1].ToString();
					add2 += hexarray[i+2].ToString();
					char[] a2 = add2.ToCharArray();
					dec2 = HexToDec(a2[0])+HexToDec(a2[1]);
				}
				if(i==2){
					add3 = hexarray[i+2].ToString();
					add3 += hexarray[i+3].ToString();
					char[] a3 = add3.ToCharArray();
					dec3 = HexToDec(a3[0])+HexToDec(a3[1]);
				}
				if(i==3){
					add4 = hexarray[i+3].ToString();
					add4 += hexarray[i+4].ToString();
					char[] a4 = add4.ToCharArray();
					if(a4[0].ToString() == "A" || a4[0].ToString() == "B" || a4[0].ToString() == "C"|| a4[0].ToString() == "D"||a4[0].ToString() == "E"||a4[0].ToString() == "F"){
					dec4 = HexToDec(a4[0])+ "9";
					}
					else{
						dec4 = HexToDec(a4[0])+HexToDec(a4[1]);
					}
				}
				
				Debug.Log("The ip of "+hexcode+" is "+dec4+"."+dec3+"."+dec2+"."+dec1);
					
			}
		
		for(int i = 0;i<hexlength;i++){
			decarray[i] = HexToDec(hexarray[i]);
		}
		
	}
	
	private string HexToDec(char h){
		if(h.ToString() == "0"){
			string d = "0";
			return d;
		}
		else if(h.ToString() == "1"){
			string d = "1";
			return d;
		}
		else if(h.ToString() == "2"){
			string d = "2";
			return d;
		}
		else if(h.ToString() == "3"){
			string d = "3";
			return d;
		}
		else if(h.ToString() == "4"){
			string d = "4";
			return d;
		}
		else if(h.ToString() == "5"){
			string d = "5";
			return d;
		}
		else if(h.ToString() == "6"){
			string d = "6";
			return d;
		}
		else if(h.ToString() == "7"){
			string d = "7";
			return d;
		}
		else if(h.ToString() == "8"){
			string d = "8";
			return d;
		}
		else if(h.ToString() == "9"){
			string d = "9";
			return d;
		}
		else if(h.ToString() == "A"){
			string d = "10";
			return d;
		}
		else if(h.ToString() == "B"){
			string d = "11";
			return d;
		}
		else if(h.ToString() == "C"){
			string d = "12";
			return d;
		}
		else if(h.ToString() == "D"){
			string d = "13";
			return d;
		}
		else if(h.ToString() == "E"){
			string d = "14";
			return d;
		}
		else if(h.ToString() == "F"){
			string d = "15";
			return d;
		}
		else{
			return "";
		}
	}
	
	void Update(){
		
	}
}
