using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ParallaxScrolling : MonoBehaviour {

	Camera cam;
	Renderer renderer;

	public Vector2 parallaxSpeed;

	// Use this for initialization
	void Start () {
		cam = Camera.main.GetComponent<Camera> ();
		renderer = GetComponent<Renderer> ();
	}
	
	// Update is called once per frame
	void Update () {


		transform.position = new Vector3 (Camera.main.transform.position.x,Camera.main.transform.position.y,10f);

		renderer.material.SetTextureOffset("_MainTex", new Vector2(Camera.main.transform.position.x * parallaxSpeed.x,Camera.main.transform.position.y * parallaxSpeed.y));
	}
}
