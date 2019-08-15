using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollow : MonoBehaviour {

	public Transform target;

	public Vector3 offset;

	public Vector3 damp;

	public Vector3 targetPosition;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		//transform.position = new Vector3 (target.position.x + offset.x, offset.y, 0 + offset.z);

		if (target != null) {
			transform.position += new Vector3 ((target.position.x - transform.position.x) * damp.x, (target.position.y - transform.position.y) * damp.y, 0);
			transform.position = new Vector3 (transform.position.x + offset.x, offset.y, 0 + offset.z);
		}
	}
}
