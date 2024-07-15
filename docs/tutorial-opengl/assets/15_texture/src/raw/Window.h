#pragma once

#define GLEW_STATIC
#include <GL/glew.h>
#include <GLFW/glfw3.h>

class Window
{
public:
	Window();
	Window(int windowWidth, int windowHeight);
	~Window();

	int Initialize();

	bool GetShouldClose() { return glfwWindowShouldClose(mainWindow); }

	void SwapBuffers() { glfwSwapBuffers(mainWindow); }

	bool* GetKeys() { return keys; }
	float GetXChange();
	float GetYChange();

	int GetBufferWidth() { return width; }
	int GetBufferHeight() { return height; }

private:
	GLFWwindow* mainWindow;
	int width, height; //윈도우의 크기

	bool keys[1024];
	float lastX, lastY;
	float changeX, changeY;
	bool isMouseFirstMoved;

	static void HandleKeys(GLFWwindow* window, int key, int code, int action, int mode);
	static void HandleMouse(GLFWwindow* window, double xPos, double yPos);

	void CreateCallback();

};