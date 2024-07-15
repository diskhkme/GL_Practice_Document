//#include "VertexBuffer.h"
//#include "IndexBuffer.h"
//#include "VertexBufferLayout.h"
//#include "VertexArray.h"
//#include "Shader.h"
//#include "Renderer.h"
#include "Window.h"
#include "Camera.h"
//#include "Texture.h"
#include "Model.h"

#include "glm/glm.hpp"
#include "glm/ext.hpp"

//#include <assimp/Importer.hpp>
//#include <assimp/postprocess.h>
//#include <assimp/scene.h>
//
//#include <vector>

int main(void)
{
	/*Assimp::Importer importer;
	const aiScene* scene = importer.ReadFile("resources/models/cube.obj", aiProcess_Triangulate);

	auto rootNode = scene->mRootNode;
	std::cout << rootNode->mNumMeshes << std::endl;
	std::cout << rootNode->mNumChildren << std::endl;
	std::cout << rootNode->mChildren[0]->mNumMeshes << std::endl;

	auto childNode = rootNode->mChildren[0];
	auto mesh = scene->mMeshes[childNode->mMeshes[0]];
	std::cout << mesh->mNumVertices << std::endl;
	std::cout << mesh->mNumFaces << std::endl;

	std::cout << "---Vertices---" << std::endl;
	for (int i = 0; i < mesh->mNumVertices; i++)
	{
		std::cout << mesh->mVertices[i].x << ", " << mesh->mVertices[i].y << ", " << mesh->mVertices[i].z << std::endl;
	}

	std::cout << "---UV---" << std::endl;
	auto uv = mesh->mTextureCoords[0];
	for (int i = 0; i < mesh->mNumVertices; i++)
	{
		std::cout << uv[i].x << ", " << uv[i].y << std::endl;
	}

	std::cout << "---Faces(Index)---" << std::endl;
	for (int i = 0; i < mesh->mNumFaces; i++)
	{
		auto face = mesh->mFaces[i];
		std::cout << face.mIndices[0] << ", " << face.mIndices[1] << ", " << face.mIndices[2] << std::endl;
	}

	std::vector<float> positionsVec;
	for (int i = 0; i < mesh->mNumVertices; i++)
	{
		positionsVec.push_back(mesh->mVertices[i].x);
		positionsVec.push_back(mesh->mVertices[i].y);
		positionsVec.push_back(mesh->mVertices[i].z);
		positionsVec.push_back(uv[i].x);
		positionsVec.push_back(uv[i].y);
	}

	std::vector<unsigned int> indicesVec;
	for (int i = 0; i < mesh->mNumFaces; i++)
	{
		auto face = mesh->mFaces[i];
		indicesVec.push_back(face.mIndices[0]);
		indicesVec.push_back(face.mIndices[1]);
		indicesVec.push_back(face.mIndices[2]);
	}*/

	Window mainWindow{ 800, 600 };
	mainWindow.Initialize();

	//float positions[] = {
	//	//x     y   
	//	-0.5, -0.5, 0.0, 0.0,
	//	 0.5, -0.5, 1.0, 0.0,
	//	 0.5,  0.5, 1.0, 1.0,
	//	-0.5,  0.5, 0.0, 1.0
	//};

	//unsigned int indices[] = { 
	//	0, 1, 2, //vertex 0,1,2로 이루어진 삼각형
	//	2, 3, 0  //vertex 2,3,0로 이루어진 삼각형
	//};

	/*float* positions = &positionsVec[0];
	unsigned int* indices = &indicesVec[0];*/

	float triangle_positions[] = {
		-0.5f, -0.5f, //0
		 0.5f, -0.5f, //1
		 0.5f,  0.5f, //2
	};

	unsigned int triangle_indices[] = {
		0, 1, 2, //vertex 0,1,2로 이루어진 삼각형
	};

	//--- 사각형 VAO 설정
	//VertexArray squareVA;

	////VertexBuffer squareVB{ positions, 4 * 4 * sizeof(float) };
	//VertexBuffer squareVB{ positions, mesh->mNumVertices * (3+2) * sizeof(float)};
	//	
	//VertexBufferLayout squareLayout;
	////squareLayout.Push<float>(2); // 0-th layout (position)
	//squareLayout.Push<float>(3); // 0-th layout (position)
	//squareLayout.Push<float>(2); // 1-th layout (texture coord)

	//squareVA.AddBuffer(squareVB, squareLayout);

	////IndexBuffer squareIB{ indices, 6 };
	//IndexBuffer squareIB{ indices, mesh->mNumFaces * 3 };

	//squareVA.Unbind();
	//squareIB.Unbind();
	//squareVB.Unbind();

	Model cube;
	cube.LoadModel("resources/models/cube.obj");

	
	//--- 삼각형 VAO 설정
	VertexArray triangleVA;

	VertexBuffer triangleVB{ triangle_positions, 3 * 2 * sizeof(float) };

	VertexBufferLayout triangleLayout;
	triangleLayout.Push<float>(2); // 0-th layout (position)

	triangleVA.AddBuffer(triangleVB, triangleLayout);

	IndexBuffer triangleIB{ triangle_indices, 3 };

	triangleVA.Unbind();
	triangleIB.Unbind();
	triangleVB.Unbind();

	Shader squareShader{ "resources/shaders/basic_3d_texture.shader" };
	Shader triangleShader{ "resources/shaders/basic_red.shader" };

	Texture checkerTexture{ "resources/textures/uv_checker.png" };
	
	Camera camera{ glm::vec3{0.0f,0.0f,5.0f}, glm::vec3{0.0f,1.0f,0.0f}, -90.0f, 0.0f, 5.0f, 0.5f };

	Renderer renderer;

	float deltaTime = 0.0f;
	float lastTime = 0.0f;

	// Rendering Loop
	while (!mainWindow.GetShouldClose())
	{
		float now = glfwGetTime(); //현재 시간
		deltaTime = now - lastTime; //deltaTime = 현재시간 - 이전시간 
		lastTime = now;

		camera.KeyControl(mainWindow.GetKeys(), deltaTime);
		camera.MouseControl(mainWindow.GetXChange(), mainWindow.GetYChange());

		renderer.Clear();

		//--- 사각형 그리기
		/*squareVA.Bind();
		squareShader.Bind();*/

		checkerTexture.Bind(0);
		squareShader.SetUniform1i("u_texture", 0);

		glm::mat4 squareModelMat = glm::translate(glm::mat4(1.0), glm::vec3(0.7, 0.0, -5.0));
		squareShader.SetUniformMat4f("u_model", squareModelMat);
		
		squareShader.SetUniformMat4f("u_view", camera.CalculateViewMatrix());

		float fovyDeg = 60.0f;
		float aspect = (float)mainWindow.GetBufferWidth() / mainWindow.GetBufferHeight();
		float near = 0.1f;
		float far = 100.0f;
		glm::mat4 squareProjMat = glm::perspective(glm::radians(fovyDeg), aspect, near, far);
		squareShader.SetUniformMat4f("u_projection", squareProjMat);

		cube.RenderModel(squareShader);

		/*renderer.Draw(squareVA, squareIB, squareShader);

		squareShader.Unbind();
		squareVA.Unbind();*/

		//--- 삼각형 그리기
		//triangleVA.Bind();
		//triangleShader.Bind();

		//float triangle_offset = -0.7f;
		//triangleShader.SetUniform4f("u_offset", triangle_offset, 0.0f, 0.0f, 0.0f);

		//renderer.Draw(triangleVA, triangleIB, triangleShader);

		//triangleShader.Unbind();
		//triangleVA.Unbind();

		mainWindow.SwapBuffers();
		glfwPollEvents(); 
	}

	return 0;
}