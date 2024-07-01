#define GLEW_STATIC
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>

//--------Shader 컴파일 함수----------//
static unsigned int CompileShader(unsigned int type, const std::string& source)
{
	unsigned int id = glCreateShader(type);
	const char* src = source.c_str();
	glShaderSource(id, 1, &src, nullptr);
	glCompileShader(id);

	int result;
	glGetShaderiv(id, GL_COMPILE_STATUS, &result);
	if (result == GL_FALSE) //컴파일 실패
	{
		int length;
		glGetShaderiv(id, GL_INFO_LOG_LENGTH, &length);
		char* message = (char*)alloca(length * sizeof(char));
		glGetShaderInfoLog(id, length, &length, message);
		std::cout << "셰이더 컴파일 실패! " << (type == GL_VERTEX_SHADER ? "vertex" : "fragment") << std::endl;
		std::cout << message << std::endl;
		glDeleteShader(id);
		return 0;
	}

	return id;
}

//--------Shader 프로그램 생성, 컴파일, 링크----------//
static unsigned int CreateShader(const std::string& vertexShader, const std::string& fragShader)
{
	unsigned int programID = glCreateProgram(); //셰이더 프로그램 객체 생성(int에 저장되는 것은 id)
	unsigned int vs = CompileShader(GL_VERTEX_SHADER, vertexShader);
	unsigned int fs = CompileShader(GL_FRAGMENT_SHADER, fragShader);

	//컴파일된 셰이더 코드를 program에 추가하고 링크
	glAttachShader(programID, vs);
	glAttachShader(programID, fs);
	glLinkProgram(programID);
	glValidateProgram(programID);

	//셰이더 프로그램을 생성했으므로 vs, fs 개별 프로그램은 더이상 필요 없음
	glDeleteShader(vs);
	glDeleteShader(fs);

	return programID;
}

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

	float positions[6] = {
		-0.5f, -0.5f,
		 0.0f,  0.5f,
		 0.5f, -0.5f
	};

	unsigned int bufferID;
	glGenBuffers(1, &bufferID);
	glBindBuffer(GL_ARRAY_BUFFER, bufferID);
	glBufferData(GL_ARRAY_BUFFER, 6 * sizeof(float), positions, GL_STATIC_DRAW);

	glEnableVertexAttribArray(0); 
	glVertexAttribPointer(0, 2,	GL_FLOAT, GL_FALSE, sizeof(float) * 2, 0); 
	
	std::string vertexShader =
		"#version 330 core\n"
		"layout(location = 0) in vec4 position;\n" 
		"void main()\n"
		"{\n"
		"	gl_Position = position;\n" 
		"}\n";

	std::string fragShader =
		"#version 330 core\n"
		"layout(location = 0) out vec4 color;\n" 
		"void main()\n"
		"{\n"
		"	color = vec4(1.0, 1.0 ,0.0, 1.0);\n" 
		"}\n";

	unsigned int shaderID = CreateShader(vertexShader, fragShader);
	glUseProgram(shaderID);

	// Rendering Loop
	int frame_count = 0;
	while (!glfwWindowShouldClose(window)) 
	{
		//std::cout << frame_count << std::endl;
		frame_count++;
		glClear(GL_COLOR_BUFFER_BIT);

		glDrawArrays(GL_TRIANGLES, 0, 3);

		glfwSwapBuffers(window); 
		glfwPollEvents(); 
	}

	glDeleteProgram(shaderID);
	glfwTerminate();
	return 0;
}