using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]

public class GroundGeneration : MonoBehaviour {

	EdgeCollider2D collider;

	Vector2[] newPoints;

	public int xSize, ySize;

	private Mesh mesh;
	private Vector3[] vertices;

	public int seed;
	public Vector2 scale;
	
	// Update is called once per frame
	void Update () {


		Random.InitState (seed);

		mesh = GetComponent<MeshFilter> ().sharedMesh;
		collider = GetComponent<EdgeCollider2D> ();

		newPoints = collider.points;

		for (int i = 0; i < collider.pointCount; i++) {
			newPoints[i] = new Vector2 (i*scale.x,
				//Random.Range(0,scale.y)
				//Mathf.Sin(i*0.5f) + Mathf.Cos(i*0.4f)
				Perlin.Fbm(i*0.05f+seed*90f,5)*scale.y

			);


			//tempArray[i]  = new Vector2 (i,Random.Range(0,10f));
		}
		//print (collider.points[0]);
		collider.points = newPoints;


		Generate();

	}
	private void Awake () {
		
	}

	void Generate () {

		mesh.Clear ();

		//mesh.vertices = new Vector3[] {
		//	new Vector3(newPoints[0].x, newPoints[0].y, 0),
		//	new Vector3(newPoints[0].x, -5f, 0), 
		//	new Vector3(newPoints[1].x, -5f, 0),

		//	new Vector3(newPoints[0].x, newPoints[0].y, 0),
		//	new Vector3(newPoints[1].x, newPoints[1].y, 0), 
		//	new Vector3(newPoints[1].x, -5f, 0)};
		/*
		vertices = new Vector3[xSize];

		for (int i = 0; i < xSize; i++) {
			vertices[i] = new Vector3(newPoints[i].x, newPoints[i].y, 0);
		}
		*/

		xSize = collider.pointCount-1;

		vertices = new Vector3[(xSize + 1) * (ySize + 1)];
		Vector2[] uv = new Vector2[vertices.Length];

		for (int i = 0, y = 0; y <= ySize; y++) {
			for (int x = 0; x <= xSize; x++, i++) {
				if (y == 0) {
					vertices [i] = new Vector3 (newPoints[x].x, -15f);

					uv[i] = new Vector2(newPoints[x].x,0);
				} else {
					vertices [i] = new Vector3 (newPoints[x].x, newPoints[x].y);

					uv[i] = new Vector2(newPoints[x].x, newPoints[y].y);
				}

			}
		}

		mesh.vertices = vertices;
		mesh.uv = uv;

		int[] triangles = new int[xSize * 6];

		for (int triIndex = 0, vertIndex = 0, index = 0; index < xSize; index++, triIndex += 6, vertIndex++) {
			triangles[triIndex] = vertIndex;
			triangles[triIndex + 3] = triangles[triIndex + 2] = vertIndex + 1;
			triangles[triIndex + 4] = triangles[triIndex + 1] = vertIndex + xSize + 1;
			triangles[triIndex + 5] = vertIndex + xSize + 2;
		}
		//mesh.uv = new Vector2[] {new Vector2(0, 0), new Vector2(0, 1), new Vector2(1, 1)};

		mesh.triangles = triangles;

		//for (int i = 0; i < newPoints.Length; i++) {

			
		//}
	}
}
