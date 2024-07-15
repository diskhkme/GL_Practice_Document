#include "Window.h"
#include "Camera.h"
#include "Model.h"

#include "glm/glm.hpp"
#include "glm/ext.hpp"

int main(void)
{
	Window mainWindow{ 800, 600 };
	mainWindow.Initialize();

	Model cube;
	cube.LoadModel("resources/models/cube.obj");
	//cube.LoadModel("resources/models/teapot.obj");
	//cube.LoadModel("resources/models/shiba/scene.gltf");

	Shader squareShader{ "resources/shaders/basic_3d_texture.shader" };
	
	Camera camera{ glm::vec3{0.0f,0.0f,5.0f}, glm::vec3{0.0f,1.0f,0.0f}, -90.0f, 0.0f, 5.0f, 0.5f };

	Renderer renderer;

	squareShader.Bind();
	{
		glm::mat4 squareModelMat = glm::translate(glm::mat4(1.0), glm::vec3(0.7, 0.0, -5.0));
		squareShader.SetUniformMat4f("u_model", squareModelMat);

		float fovyDeg = 60.0f;
		float aspect = (float)mainWindow.GetBufferWidth() / mainWindow.GetBufferHeight();
		float near = 0.1f;
		float far = 100.0f;
		glm::mat4 squareProjMat = glm::perspective(glm::radians(fovyDeg), aspect, near, far);
		squareShader.SetUniformMat4f("u_projection", squareProjMat);
	}
	squareShader.Unbind();


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
		
		squareShader.SetUniformMat4f("u_view", camera.CalculateViewMatrix());

		cube.RenderModel(squareShader);

		mainWindow.SwapBuffers();
		glfwPollEvents(); 
	}

	return 0;
}