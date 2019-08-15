using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class musicHandler : MonoBehaviour {

	AudioSource audio;

	// Use this for initialization
	void Start () {
		audio = GetComponent<AudioSource> ();
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void ChangeMusic (AudioClip music, bool loop)
	{
		if (audio != null) {
			audio.Stop ();
			audio.clip = music;
			audio.loop = loop;
			audio.Play();
		}
	}
}
