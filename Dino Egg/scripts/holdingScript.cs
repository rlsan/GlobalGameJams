using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class holdingScript : MonoBehaviour {

	public Vector2 InputAxes;

	Rigidbody2D rb;

	// Use this for initialization
	void Start () {
		rb = GetComponent<Rigidbody2D> ();
	}
	
	// Update is called once per frame
	void Update () {
		InputAxes.x = Input.GetAxis ("Horizontal");
		InputAxes.y = Input.GetAxis ("Vertical");

		rb.AddTorque (InputAxes.x*.7f);
	}
}
