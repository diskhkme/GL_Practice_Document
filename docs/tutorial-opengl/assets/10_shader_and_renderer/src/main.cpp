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

int main(void)
{
	// GLFW �ʱ�ȭ
	if (!glfwInit())
		return -1;

	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3); 
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

	// Window ���� �� ����
	GLFWwindow* window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
	// ���� �����츦 �׸� ������� ����
	glfwMakeContextCurrent(window);

	// GLEW �ʱ�ȭ
	glewInit();

	// ���� ����
	glClearColor(0.25, 0.25, 0.7, 1);

	float positions[] = {
		//x     y    r    g    b    a
		-0.5, -0.5, 1.0, 0.0, 0.0, 1.0, //0�� vertex
		 0.5, -0.5, 0.0, 1.0, 0.0, 1.0, //1�� vertex
		 0.5,  0.5, 0.0, 0.0, 1.0, 1.0, //2�� vertex
		-0.5,  0.5, 0.8, 0.2, 0.3, 1.0, //3�� vertex
	};

	unsigned int indices[] = { 
		0, 1, 2, //vertex 0,1,2�� �̷���� �ﰢ��
		2, 3, 0  //vertex 2,3,0�� �̷���� �ﰢ��
	};

	float triangle_positions[] = {
		-0.5f, -0.5f, //0
		 0.5f, -0.5f, //1
		 0.5f,  0.5f, //2
	};

	unsigned int triangle_indices[] = {
		0, 1, 2, //vertex 0,1,2�� �̷���� �ﰢ��
	};

	//--- �簢�� VAO ����
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

	
	//--- �ﰢ�� VAO ����
	VertexArray triangleVA;

	VertexBuffer triangleVB{ triangle_positions, 3 * 2 * sizeof(float) };

	VertexBufferLayout triangleLayout;
	triangleLayout.Push<float>(2); // 0-th layout (position)

	triangleVA.AddBuffer(triangleVB, triangleLayout);

	IndexBuffer triangleIB{ triangle_indices, 3 };

	triangleVA.Unbind();
	triangleIB.Unbind();
	triangleVB.Unbind();

	Shader squareShader{ "resources/shaders/basic.shader" };
	Shader triangleShader{ "resources/shaders/basic_red.shader" };
	
	Renderer renderer;

	// Rendering Loop
	while (!glfwWindowShouldClose(window)) 
	{
		renderer.Clear();

		//--- �簢�� �׸���
		squareVA.Bind();

		//glUseProgram(shaderID);
		squareShader.Bind();
		float square_offset = 0.7f;
		//glUniform4f(square_offset_location, square_offset, 0.0f, 0.0f, 0.0f);
		squareShader.SetUniform4f("u_offset", square_offset, 0.0f, 0.0f, 0.0f);

		renderer.Draw(squareVA, squareIB, squareShader);

		squareVA.Unbind();

		//--- �ﰢ�� �׸���
		triangleVA.Bind();

		//glUseProgram(triangle_shaderID);
		triangleShader.Bind();
		float triangle_offset = -0.7f;
		//glUniform4f(triangle_offset_location, triangle_offset, 0.0f, 0.0f, 0.0f);
		triangleShader.SetUniform4f("u_offset", triangle_offset, 0.0f, 0.0f, 0.0f);

		glDrawElements(GL_TRIANGLES, 3, GL_UNSIGNED_INT, nullptr);

		triangleVA.Unbind();

		glfwSwapBuffers(window); 
		glfwPollEvents(); 
	}

	//glDeleteProgram(shaderID);
	glfwTerminate();
	return 0;
}