#include "Window.h"
#include <iostream>
#include <string>

Window::Window()
	:width{ 800 }, height{ 600 }, isMouseFirstMoved{ true }
{
}

Window::Window(int windowWidth, int windowHeight)
	: width{ windowWidth }, height{ windowHeight }, isMouseFirstMoved{ true }
{
}

Window::~Window()
{
	glfwDestroyWindow(mainWindow);
	glfwTerminate();
}

void Window::CreateCallback()
{
	glfwSetKeyCallback(mainWindow, HandleKeys);
	glfwSetCursorPosCallback(mainWindow, HandleMouse);
}

int Window::Initialize()
{
	// GLFW 초기화
	if (!glfwInit())
		return -1;

	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

	// Window 정의 및 생성
	mainWindow = glfwCreateWindow(width, height, "Hello World", NULL, NULL);

	// 현재 윈도우를 그릴 대상으로 설정
	glfwMakeContextCurrent(mainWindow);

	// GLEW 초기화
	glewInit();

	// 배경색 설정
	glClearColor(0.25, 0.25, 0.7, 1);

	CreateCallback();
	glfwSetInputMode(mainWindow, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
	glfwSetWindowUserPointer(mainWindow, this);
}

void Window::HandleKeys(GLFWwindow* window, int key, int code, int action, int mode)
{
	Window* windowObject = static_cast<Window*>(glfwGetWindowUserPointer(window));

	if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
	{
		glfwSetWindowShouldClose(window, true);
	}

	if (key >= 0 && key < 1024)
	{
		if (action == GLFW_PRESS)
		{
			windowObject->keys[key] = true;
			std::cout << "Pressed : " << key << std::endl;
		}
		else if (action == GLFW_RELEASE)
		{
			windowObject->keys[key] = false;
			std::cout << "Release : " << key << std::endl;
		}
	}
}

void Window::HandleMouse(GLFWwindow* window, double xPos, double yPos)
{
	Window* windowObject = static_cast<Window*>(glfwGetWindowUserPointer(window));

	if (windowObject->isMouseFirstMoved)
	{
		windowObject->lastX = xPos;
		windowObject->lastY = yPos;
		windowObject->isMouseFirstMoved = false;
	}
	else
	{
		windowObject->changeX = xPos - windowObject->lastX;
		windowObject->changeY = windowObject->lastY - yPos;

		windowObject->lastX = xPos;
		windowObject->lastY = yPos;

		std::cout << "XChange : " << windowObject->changeX <<
			" YChange : " << windowObject->changeY << std::endl;
	}
}

float Window::GetXChange()
{
	float theChange = changeX;
	changeX = 0.0f;
	return theChange;
}

float Window::GetYChange()
{
	float theChange = changeY;
	changeY = 0.0f; 
	return theChange;
}