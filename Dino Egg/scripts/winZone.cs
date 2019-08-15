using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class winZone : MonoBehaviour {

	public GameObject player;
	public GameObject eggPrefab;
	CharacterController2D playerController;

	private bool playerHasWon = false;

	// Use this for initialization
	void Start () {
		playerController = player.GetComponent<CharacterController2D> ();
	}
	
	// Update is called once per frame
	void Update () {
		if(playerController.hasWon == true && playerHasWon == false)
		{
			playerHasWon = true;
		for (int i = 0; i < playerController.startEggs; i++) {
			Instantiate(eggPrefab, new Vector3(transform.position.x,transform.position.y + i * .6f,0),Quaternion.identity);
		}
		}
	}
}
