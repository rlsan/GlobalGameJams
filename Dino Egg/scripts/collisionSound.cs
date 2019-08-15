using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class collisionSound : MonoBehaviour {

	AudioSource audio;
	Rigidbody2D rb;
	public AudioClip sound;

	// Use this for initialization
	void Start () {
		audio = GetComponent<AudioSource> ();
		rb = GetComponent<Rigidbody2D> ();
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	void OnCollisionEnter2D (Collision2D other)
	{
		audio.pitch = Random.Range(.9f,1.5f);
		audio.volume = rb.velocity.y-.1f;
		if (Mathf.Abs(rb.velocity.y) > 1.5f) {
			audio.PlayOneShot (sound);
		}
	}
}
