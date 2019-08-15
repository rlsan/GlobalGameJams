using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CharacterController2D : MonoBehaviour {

	Vector2 InputAxes;

	Rigidbody2D rb;

	public Vector2 speed;

	AudioSource audio;
	Animator animator;
	public AudioClip jumpSound;
	public AudioClip deathSound;
	public AudioClip stepSound;

	public AudioClip levelMusic;
	public AudioClip deathMusic;
	public AudioClip winMusic;
	public AudioClip theHolyHymnOfCage;

	public float forewardSpeed;

	public float jumpForce;
	private float jump;

	private bool canMove = true;

	private bool onGround;

	public bool isDead;
	public bool hasWon;

	public GameObject headEgg;
	public float eggDistance;
	public GameObject eggGib;

	private Vector2 eggDelta;
	public float eggDrag;
	public float eggSpeed;

	public int startEggs;

	private Vector2 prevVelocity;
	private Vector2 deltaVelocity;

	private Transform holdingTransform;

	List<GameObject> eggs;

	public GameObject music;
	public musicHandler musichandler;

	private Vector2 finalVelocity;

	public AudioClip[] leftFootSounds;
	public AudioClip[] rightFootSounds;

	public GameObject goal;
	private float totalDistanceFromGoal;
	private float distanceToGoal;

	public Slider progressIndicator;

	// Use this for initialization
	void Start () {

		audio = GetComponent<AudioSource> ();
		eggs = new List<GameObject> ();
		rb = GetComponent<Rigidbody2D> ();
		animator = GetComponent<Animator> ();

		musichandler = music.GetComponent<musicHandler> ();



		totalDistanceFromGoal = Mathf.Abs(transform.position.x - goal.transform.position.x);

		for (int i = 0; i < startEggs; i++) {
			eggs.Add((GameObject)Instantiate (headEgg, transform.position + Vector3.up, Quaternion.identity));
		}

		musichandler.ChangeMusic (levelMusic, true);
	}

	void PlaySound (AudioClip sound){

		audio.PlayOneShot (sound);
	}

	void PlayFootSound()
	{
		AudioClip footSound;

		//Random.InitState (Mathf.Round (transform.position.x));
		//int Rand = Random.Range (0, 3);
		float interval = Mathf.Repeat (transform.position.x*4f, 9);


		footSound = leftFootSounds [(int) interval];

		audio.PlayOneShot (footSound);
	}

	
	// Update is called once per frame
	void Win (){
		hasWon = true;
	
		musichandler.ChangeMusic (winMusic, false);
		int i = 0;
		foreach (GameObject egg in eggs) {
			if (egg != null) {
				//snaps egg to player position
				//egg.transform.position = new Vector3(eggDelta.x * Mathf.Pow(i,2f) + transform.position.x, transform.position.y + 1f + (i*eggDistance), transform.position.z);
				Destroy (egg.gameObject);

				i++;
			}
		}

		canMove = false;



		animator.SetTrigger ("win");
	}

	IEnumerator Restart(float time)
	{
		yield return new WaitForSeconds(time);

		Animator camAnim = Camera.main.GetComponent<Animator> ();

		camAnim.SetTrigger ("transitionDeath");

		//Application.LoadLevel(Application.loadedLevel);
	}
	IEnumerator Next(float time)
	{
		yield return new WaitForSeconds(time);

		Animator camAnim = Camera.main.GetComponent<Animator> ();

		camAnim.SetTrigger ("transitionOut");

		//Application.LoadLevel(Application.loadedLevel);
	}

	void Update () {
		distanceToGoal = Mathf.Abs(transform.position.x - goal.transform.position.x)/totalDistanceFromGoal;
			
		//print (distanceToGoal);

		progressIndicator.value = 1-distanceToGoal;


		if (hasWon) {
			rb.velocity = new Vector2 (0, rb.velocity.y);
			rb.constraints = RigidbodyConstraints2D.FreezePositionX;
		}

		animator.SetFloat ("runSpeed", rb.velocity.x*.2f);

		deltaVelocity = rb.velocity - prevVelocity;

		prevVelocity = rb.velocity;

		if (canMove) {
			InputAxes.x = Input.GetAxis ("Horizontal");
			InputAxes.y = Input.GetAxis ("Vertical");
		}

		//finalVelocity = new Vector2 (InputAxes.x * speed.x, rb.velocity.y + InputAxes.y * speed.y);

		if (canMove) {
			finalVelocity = new Vector2 (forewardSpeed + InputAxes.x * speed.x, rb.velocity.y + InputAxes.y * speed.y);
		} else {
			finalVelocity = rb.velocity;
		}

		if (onGround) {
			if (canMove && Input.GetButton ("Jump")) {
				finalVelocity = new Vector2 (finalVelocity.x, jumpForce);
				//audio.PlayOneShot (jumpSound);
				animator.SetTrigger ("jump");
				transform.up = Vector2.up;
				//rb.velocity += new Vector2 (0, jumpForce);
			}
		} else {
			//jump = 0;
		}

		animator.SetBool ("onGround", onGround);

		if (isDead) {
			int x = 0;
			rb.freezeRotation = false;
			foreach (GameObject egg in eggs) {
				if (egg != null) {
					//snaps egg to player position
					//egg.transform.position = new Vector3(eggDelta.x * Mathf.Pow(i,2f) + transform.position.x, transform.position.y + 1f + (i*eggDistance), transform.position.z);

					GameObject gib = Instantiate (eggGib, egg.transform.position, Quaternion.identity);
					gib.GetComponent<Rigidbody2D> ().velocity = rb.velocity;
					Destroy (egg.gameObject);

					x++;
				}
			}
			//Destroy (transform.gameObject);
			//rb.simulated = false;
			rb.drag = 2f;
			canMove = false;


		}

		int i = 0;
		foreach (GameObject egg in eggs) {
			if (egg != null) {
				//snaps egg to player position
				//egg.transform.position = new Vector3(eggDelta.x * Mathf.Pow(i,2f) + transform.position.x, transform.position.y + 1f + (i*eggDistance), transform.position.z);

				if (Mathf.Abs (egg.transform.position.x - transform.position.x) > startEggs*0.3f) {
					GameObject gib = Instantiate (eggGib, egg.transform.position, egg.transform.rotation);
					gib.GetComponent<Rigidbody2D> ().velocity = rb.velocity;
					Destroy (egg.gameObject);
					startEggs--;
					return;
				} else {


					egg.transform.position = new Vector3 (i * 0.05f * eggDelta.x + transform.position.x, transform.position.y + 1f + (i * eggDistance), transform.position.z);
				}



				//egg.transform.RotateAround (transform.position, Vector3.forward, 5f);

				//if(Input.GetButtonDown("Jump"))
				//{
				//	egg.GetComponent<Animator>().SetTrigger("Jump");
				//}

				float difference = egg.transform.position.x - transform.position.x;

				if(InputAxes.x>0.1f)
				{
					float straightenAmount = (12f-startEggs)/10f;
					straightenAmount *= 0.1f;

					eggDelta.x += (transform.position.x-egg.transform.position.x)*straightenAmount;
				}else{
					
					eggDelta.x += rb.velocity.x * 0.001f;
				}

				float tiltAmount = ((12f - startEggs) / 10f);
				tiltAmount *= 1f;

				eggDelta.x += difference * tiltAmount * 0.05f;

				//eggDelta.x += InputAxes.x*0.01f;

				i++;
			}
		}
	}

	void FixedUpdate () {
		//rb.velocity += new Vector2 (InputAxes.x * speed.x, InputAxes.y * speed.y);
		rb.velocity = finalVelocity;
	}

	void OnCollisionEnter2D (Collision2D other)
	{
		if (other.gameObject.tag == "Ground") {
			onGround = true;
		}
	}
	void OnCollisionStay2D (Collision2D other)
	{
		if (other.gameObject.tag == "Ground") {
			onGround = true;

			ContactPoint2D point = other.contacts [0];

			if (isDead == false) {
				transform.up = point.normal;
			}
		}
	}
	void OnTriggerStay2D (Collider2D other)
	{
		if (other.gameObject.tag == "Hazard") {
			if(isDead == false && hasWon == false)
			{
				//audio.PlayOneShot (deathSound);

				musichandler.ChangeMusic (deathMusic, false);
				animator.SetTrigger ("dead");

				StartCoroutine("Restart",5.5f);

			}
			isDead = true;
		}
		if (other.gameObject.tag == "Win") {
			if (isDead == false && hasWon == false) {
				hasWon = true;
				Win ();
				StartCoroutine("Next",6.5f);
			}

		}
		if (other.gameObject.tag == "Egg") {
			Destroy (other.gameObject);
			eggs.Add((GameObject)Instantiate (headEgg, transform.position + Vector3.up, Quaternion.identity));

			//Instantiate (headEgg, transform.position + Vector3.up, Quaternion.identity);

		}
	}
	void OnTriggerEnter2D (Collider2D other)
	{
		if (other.gameObject.tag == "Cage") {
			musichandler.ChangeMusic (theHolyHymnOfCage,true);
			rb.drag = 100f;
		}
		if (other.gameObject.tag == "TheOneTrueGod") {
			StartCoroutine("Next",0.5f);
		}
	}
	void OnCollisionExit2D (Collision2D other)
	{
		onGround = false;
	}
}
