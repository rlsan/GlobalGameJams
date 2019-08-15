using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimationRandomOffset : MonoBehaviour {

	Animator animator;
	// Use this for initialization
	void Start () {
		animator = GetComponent<Animator> ();

		animator.SetFloat ("animOffset", Random.value);
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
