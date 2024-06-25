#define GLEW_STATIC
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>

int main(void)
{
	// GLFW 초기화
	if (!glfwInit())
		return -1;

	// Window 정의 및 생성
	GLFWwindow* window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
	// 현재 윈도우를 그릴 대상으로 설정
	glfwMakeContextCurrent(window);

	// GLEW 초기화
	glewInit();

	// 배경색 설정
	glClearColor(0.25, 0.25, 0.7, 1);

	// Rendering Loop
	while (!glfwWindowShouldClose(window)) // 윈도우가 닫히면 루프 탈출
	{
		glClear(GL_COLOR_BUFFER_BIT); // <- 배경색 그리기
		glfwSwapBuffers(window); // <- 윈도우에 이미지 표시
		glfwPollEvents(); // <- 윈도우가 닫히는지 탐지하는 부분
	}

	// Rendering Loop가 끝나면 종료
	glfwTerminate();
	return 0;
}