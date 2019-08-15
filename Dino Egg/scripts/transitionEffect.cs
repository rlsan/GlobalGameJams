using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

[ExecuteInEditMode]
public class transitionEffect : MonoBehaviour {

	[Range(0,1)]
	public float offset;
	private Material material;

	Animator animator;
	AudioSource audio;
	public AudioClip startSound;

	// Creates a private material used to the effect
	void Awake ()
	{
		audio = GetComponent<AudioSource> ();
		animator = GetComponent<Animator> ();
		material = new Material( Shader.Find("Hidden/transitionEffect") );
	}
	public void PlayAudio ()
	{
		audio.PlayOneShot (startSound);
	}
	void ChangeLevel (string level)
	{
		SceneManager.LoadScene (level);
	}
	public void transitionOut ()
	{
		animator.SetTrigger ("transitionOut");
	}
	void NextLevel ()
	{
		SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex+1);
	}

	void RestartLevel ()
	{
		SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
	}

	// Postprocess the image
	void OnRenderImage (RenderTexture source, RenderTexture destination)
	{
		if (offset == 0)
		{
			Graphics.Blit (source, destination);
			return;
		}

		material.SetFloat("_Offset", offset);
		Graphics.Blit (source, destination, material);
	}
}