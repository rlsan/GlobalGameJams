using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelManager : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	public void LoadNextLevel(){
		print(3);
		SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex +1);
	}
	public void LoadALevel(string LevelName)
	{
		SceneManager.LoadScene(LevelName);
	}
}
