#define GLEW_STATIC
#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

struct ShaderProgramSource
{
	std::string VertexSource;
	std::string FragSource;
};

static ShaderProgramSource ParseShader(const std::string& filepath)
{
	std::ifstream stream(filepath);
	enum class ShaderType
	{
		NONE = -1, VERTEX = 0, FRAGMENT = 1
	};

	std::string line;
	std::stringstream ss[2];
	ShaderType type = ShaderType::NONE;
	while (getline(stream, line))
	{
		if (line.find("#shader") != std::string::npos)
		{
			if (line.find("vertex") != std::string::npos) //vertex 셰이더 섹션
			{
				type = ShaderType::VERTEX;
			}
			else if (line.find("fragment") != std::string::npos) //fragment 셰이더 섹션
			{
				type = ShaderType::FRAGMENT;
			}
		}
		else
		{
			ss[(int)type] << line << '\n'; //코드를 stringstream에 삽입
		}
	}
	return ShaderProgramSource{ ss[0].str(), ss[1].str() };
}

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
		-0.5f, -0.5f, //0
		 0.5f, -0.5f, //1
		 0.5f,  0.5f, //2
		-0.5f,  0.5f, //3
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
	unsigned int square_vao;
	glGenVertexArrays(1, &square_vao); 
	glBindVertexArray(square_vao); // <-- 기록 시작

	unsigned int square_vbo;
	glGenBuffers(1, &square_vbo);
	glBindBuffer(GL_ARRAY_BUFFER, square_vbo);
	glBufferData(GL_ARRAY_BUFFER, 8 * sizeof(float), positions, GL_STATIC_DRAW);
	
	glEnableVertexAttribArray(0); 
	glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, sizeof(float) * 2, 0);

	unsigned int square_ibo;
	glGenBuffers(1, &square_ibo); 
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, square_ibo); 
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, 6 * sizeof(unsigned int), indices, GL_STATIC_DRAW);

	glBindVertexArray(0); // <-- 기록 종료
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0); 
	glBindBuffer(GL_ARRAY_BUFFER, 0); 

	
	//--- 삼각형 VAO 설정
	unsigned int triangle_vao;
	glGenVertexArrays(1, &triangle_vao); 
	glBindVertexArray(triangle_vao); // <-- 기록 시작

	unsigned int triangle_vbo;
	glGenBuffers(1, &triangle_vbo);
	glBindBuffer(GL_ARRAY_BUFFER, triangle_vbo);
	glBufferData(GL_ARRAY_BUFFER, 6 * sizeof(float), triangle_positions, GL_STATIC_DRAW);

	glEnableVertexAttribArray(0);
	glVertexAttribPointer(0, 2, GL_FLOAT, GL_FALSE, sizeof(float) * 2, 0);

	unsigned int triangle_ibo;
	glGenBuffers(1, &triangle_ibo);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, triangle_ibo);
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, 3 * sizeof(unsigned int), triangle_indices, GL_STATIC_DRAW);

	glBindVertexArray(0); // <-- 기록 종료
	glBindBuffer(GL_ARRAY_BUFFER, 0);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);


	ShaderProgramSource source = ParseShader("resources/shaders/basic.shader");
	unsigned int shaderID = CreateShader(source.VertexSource, source.FragSource);
	int square_offset_location = glGetUniformLocation(shaderID, "u_offset");

	ShaderProgramSource triangle_source = ParseShader("resources/shaders/basic_red.shader");
	unsigned int triangle_shaderID = CreateShader(triangle_source.VertexSource, triangle_source.FragSource);
	int triangle_offset_location = glGetUniformLocation(triangle_shaderID, "u_offset");
	

	// Rendering Loop
	while (!glfwWindowShouldClose(window)) 
	{
		glClear(GL_COLOR_BUFFER_BIT);

		//--- 사각형 그리기
		// 1) 사각형을 위한 VAO 바인딩
		glBindVertexArray(square_vao);

		// 2) 사각형 그리기 프로그램 준비
		glUseProgram(shaderID);
		float square_offset = 0.7f;
		glUniform4f(square_offset_location, square_offset, 0.0f, 0.0f, 0.0f);

		// 3) 사각형 그리기
		glDrawElements(GL_TRIANGLES, 9,	GL_UNSIGNED_INT, nullptr);

		// 4) 사각형 VAO 정리
		glBindVertexArray(0);

		//--- 삼각형 그리기
		// 1) 삼각형을 위한 VAO 바인딩
		glBindVertexArray(triangle_vao);

		// 2) 삼각형 그리기 프로그램 준비
		glUseProgram(triangle_shaderID);
		float triangle_offset = -0.7f;
		glUniform4f(triangle_offset_location, triangle_offset, 0.0f, 0.0f, 0.0f);

		// 3) 삼각형 그리기
		glDrawElements(GL_TRIANGLES, 3, GL_UNSIGNED_INT, nullptr);

		// 4) 삼각형 VAO 정리
		glBindVertexArray(0);

		glfwSwapBuffers(window); 
		glfwPollEvents(); 
	}

	glDeleteProgram(shaderID);
	glfwTerminate();
	return 0;
}