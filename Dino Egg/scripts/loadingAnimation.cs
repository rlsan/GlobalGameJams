using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class loadingAnimation : MonoBehaviour {

	RectTransform rect;

	// Use this for initialization
	void Start () {
		rect = GetComponent<RectTransform> ();
	}
	
	// Update is called once per frame
	void Update () {
		rect.localScale = new Vector3 ((Mathf.Sin(Time.time*4f)+2f)*0.5f, (Mathf.Cos(Time.time*4f)+2f)*0.5f, 1f);
	}
}
