using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OffScreen : MonoBehaviour {
	
	Vector3 StartPos;
	public float speedx;

	// Use this for initialization
	void Start () {
		StartPos = transform.position;
	}
	
	// Update is called once per frame
	void Update () {

		transform.Translate(Vector3.right * Time.deltaTime*speedx);
		//print(transform.position.x);
		if (transform.position.x > 650)
		{
			//print(3);
			transform.position = StartPos;
		}
	}
}
