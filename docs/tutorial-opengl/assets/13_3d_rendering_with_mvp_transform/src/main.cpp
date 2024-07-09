#include "VertexBuffer.h"
#include "IndexBuffer.h"
#include "VertexBufferLayout.h"
#include "VertexArray.h"
#include "Shader.h"
#include "Renderer.h"
#include "Window.h"

#include "glm/glm.hpp"
#include "glm/ext.hpp"

int main(void)
{
	Window mainWindow{ 800, 600 };
	mainWindow.Initialize();

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

	Shader squareShader{ "resources/shaders/basic_3d.shader" };
	Shader triangleShader{ "resources/shaders/basic_red.shader" };
	
	Renderer renderer;

	// Rendering Loop
	while (!mainWindow.GetShouldClose())
	{
		renderer.Clear();

		//--- 사각형 그리기
		squareVA.Bind();
		squareShader.Bind();

		glm::mat4 squareModelMat = glm::translate(glm::mat4(1.0), glm::vec3(0.7, 0.0, -5.0));
		squareShader.SetUniformMat4f("u_model", squareModelMat);
		
		glm::vec3 eyePos = glm::vec3(0.0, 0.0, 0.0);
		glm::vec3 atPos = glm::vec3(0.0, 0.0, -1.0);
		glm::vec3 upVec = glm::vec3(0.0, 1.0, 0.0);
		glm::mat4 squareViewMat = glm::lookAt(eyePos, atPos, upVec);
		squareShader.SetUniformMat4f("u_view", squareViewMat);

		float fovyDeg = 60.0f;
		float aspect = (float)mainWindow.GetBufferWidth() / mainWindow.GetBufferHeight();
		float near = 0.1f;
		float far = 100.0f;
		glm::mat4 squareProjMat = glm::perspective(glm::radians(fovyDeg), aspect, near, far);
		squareShader.SetUniformMat4f("u_projection", squareProjMat);

		renderer.Draw(squareVA, squareIB, squareShader);

		squareShader.Unbind();
		squareVA.Unbind();

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