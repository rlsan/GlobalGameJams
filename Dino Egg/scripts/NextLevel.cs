using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NextLevel : MonoBehaviour {

	Animator animator;

	// Use this for initialization
	void Start () {
		animator = GetComponent<Animator> ();

		animator.SetTrigger ("transitionOut");
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
