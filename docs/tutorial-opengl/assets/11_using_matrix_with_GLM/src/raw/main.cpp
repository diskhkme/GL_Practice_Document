#define GLEW_STATIC
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

#include "VertexBuffer.h"
#include "IndexBuffer.h"
#include "VertexBufferLayout.h"
#include "VertexArray.h"
#include "Shader.h"
#include "Renderer.h"

#include "glm/glm.hpp"
#include "glm/ext.hpp"

int main(void)
{
	//glm::mat4 myMatrix = glm::mat4(1.0, 0.0, 0.0, 0.0,
	//	0.0, 1.0, 0.0, 0.0,
	//	0.0, 0.0, 1.0, 0.0,
	//	10.0, 20.0, 30.0, 1.0);
	//std::cout << myMatrix[0][0] << std::endl; // 1
	//std::cout << myMatrix[3][0] << std::endl; // 10
	//std::cout << myMatrix[3][2] << std::endl; // 30

	//glm::vec4 firstCol = myMatrix[0];
	//std::cout << firstCol.x << std::endl; // 1
	//glm::vec4 fourthCol = myMatrix[3];
	//std::cout << fourthCol.x << std::endl; // 10
	//std::cout << fourthCol[2] << std::endl; // 30

	//glm::mat4 myTanslation = glm::translate(glm::mat4(1.0), glm::vec3(10, 20, 30));
	//std::cout << myTanslation[0][0] << std::endl; // 1
	//std::cout << myTanslation[3][0] << std::endl; // 10
	//std::cout << myTanslation[3][2] << std::endl; // 30

	//glm::mat4 myTanslationAdd = glm::translate(myTanslation, glm::vec3(11, 22, 33));
	//std::cout << myTanslationAdd[0][0] << std::endl; // 1
	//std::cout << myTanslationAdd[3][0] << std::endl; // 21
	//std::cout << myTanslationAdd[3][2] << std::endl; // 63

	//glm::vec4 pos = glm::vec4(5.0, 6.0, 7.0, 1.0);
	//glm::vec4 translatedPos = myTanslation * pos;
	//std::cout << translatedPos[0] << std::endl; // 15
	//std::cout << translatedPos[1] << std::endl; // 26
	//std::cout << translatedPos[2] << std::endl; // 37
	

	// GLFW 초기화
	if (!glfwInit())
		return -1;

	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3); 
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

	// Window 정의 및 생성
	GLFWwindow* window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
	// 현재 윈도우를 그릴 대상으로 설정
	glfwMakeContextCurrent(window);

	// GLEW 초기화
	glewInit();

	// 배경색 설정
	glClearColor(0.25, 0.25, 0.7, 1);

	float positions[] = {
		//x     y    r    g    b    a
		-0.5, -0.5, 1.0, 0.0, 0.0, 1.0, //0번 vertex
		 0.5, -0.5, 0.0, 1.0, 0.0, 1.0, //1번 vertex
		 0.5,  0.5, 0.0, 0.0, 1.0, 1.0, //2번 vertex
		-0.5,  0.5, 0.8, 0.2, 0.3, 1.0, //3번 vertex
	};

	unsigned int indices[] = { 
		0, 1, 2, //vertex 0,1,2로 이루어진 삼각형
		2, 3, 0  //vertex 2,3,0로 이루어진 삼각형
	};

	float triangle_positions[] = {
		-0.5f, -0.5f, //0
		 0.5f, -0.5f, //1
		 0.5f,  0.5f, //2
	};

	unsigned int triangle_indices[] = {
		0, 1, 2, //vertex 0,1,2로 이루어진 삼각형
	};

	//--- 사각형 VAO 설정
	VertexArray squareVA;

	VertexBuffer squareVB{ positions, 4 * 6 * sizeof(float) };
		
	VertexBufferLayout squareLayout;
	squareLayout.Push<float>(2); // 0-th layout (position)
	squareLayout.Push<float>(4); // 1-th layout (color)

	squareVA.AddBuffer(squareVB, squareLayout);

	IndexBuffer squareIB{ indices, 6 };

	squareVA.Unbind();
	squareIB.Unbind();
	squareVB.Unbind();

	
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

	Shader squareShader{ "resources/shaders/basic_translation.shader" };
	Shader triangleShader{ "resources/shaders/basic_red.shader" };
	
	Renderer renderer;

	// Rendering Loop
	while (!glfwWindowShouldClose(window)) 
	{
		renderer.Clear();

		//--- 사각형 그리기
		squareVA.Bind();
		squareShader.Bind();

		glm::mat4 squareModelMat = glm::translate(glm::mat4(1.0), glm::vec3(0.7, 0.0, 0.0));
		squareShader.SetUniformMat4f("u_model", squareModelMat);
		
		renderer.Draw(squareVA, squareIB, squareShader);

		squareShader.Unbind();
		squareVA.Unbind();

		//--- 삼각형 그리기
		triangleVA.Bind();
		triangleShader.Bind();

		float triangle_offset = -0.7f;
		triangleShader.SetUniform4f("u_offset", triangle_offset, 0.0f, 0.0f, 0.0f);

		renderer.Draw(triangleVA, triangleIB, triangleShader);

		triangleShader.Unbind();
		triangleVA.Unbind();

		glfwSwapBuffers(window); 
		glfwPollEvents(); 
	}

	glfwTerminate();
	return 0;
}