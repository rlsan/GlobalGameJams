using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovingHazard : MonoBehaviour {

	private Vector3 StartPos;
	public Vector3 MovementAmplitude = Vector3.one;
	public Vector3 MovementSpeed = Vector3.one;

	// Use this for initialization
	void Start () {
		StartPos = transform.position;
	}

	// Update is called once per frame
	void Update () {
		transform.position = StartPos + new Vector3(Mathf.Sin((Time.time+StartPos.x)*MovementSpeed.x)*MovementAmplitude.x, Mathf.Sin((Time.time+StartPos.y)*MovementSpeed.y)*MovementAmplitude.y,0.0f);
	}
}
