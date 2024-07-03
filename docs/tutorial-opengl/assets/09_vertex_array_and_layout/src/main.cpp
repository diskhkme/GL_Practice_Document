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
			if (line.find("vertex") != std::string::npos) //vertex ���̴� ����
			{
				type = ShaderType::VERTEX;
			}
			else if (line.find("fragment") != std::string::npos) //fragment ���̴� ����
			{
				type = ShaderType::FRAGMENT;
			}
		}
		else
		{
			ss[(int)type] << line << '\n'; //�ڵ带 stringstream�� ����
		}
	}
	return ShaderProgramSource{ ss[0].str(), ss[1].str() };
}

//--------Shader ������ �Լ�----------//
static unsigned int CompileShader(unsigned int type, const std::string& source)
{
	unsigned int id = glCreateShader(type);
	const char* src = source.c_str();
	glShaderSource(id, 1, &src, nullptr);
	glCompileShader(id);

	int result;
	glGetShaderiv(id, GL_COMPILE_STATUS, &result);
	if (result == GL_FALSE) //������ ����
	{
		int length;
		glGetShaderiv(id, GL_INFO_LOG_LENGTH, &length);
		char* message = (char*)alloca(length * sizeof(char));
		glGetShaderInfoLog(id, length, &length, message);
		std::cout << "���̴� ������ ����! " << (type == GL_VERTEX_SHADER ? "vertex" : "fragment") << std::endl;
		std::cout << message << std::endl;
		glDeleteShader(id);
		return 0;
	}

	return id;
}

//--------Shader ���α׷� ����, ������, ��ũ----------//
static unsigned int CreateShader(const std::string& vertexShader, const std::string& fragShader)
{
	unsigned int programID = glCreateProgram(); //���̴� ���α׷� ��ü ����(int�� ����Ǵ� ���� id)
	unsigned int vs = CompileShader(GL_VERTEX_SHADER, vertexShader);
	unsigned int fs = CompileShader(GL_FRAGMENT_SHADER, fragShader);

	//�����ϵ� ���̴� �ڵ带 program�� �߰��ϰ� ��ũ
	glAttachShader(programID, vs);
	glAttachShader(programID, fs);
	glLinkProgram(programID);
	glValidateProgram(programID);

	//���̴� ���α׷��� ���������Ƿ� vs, fs ���� ���α׷��� ���̻� �ʿ� ����
	glDeleteShader(vs);
	glDeleteShader(fs);

	return programID;
}

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

		//--- �簢�� �׸���
		squareVA.Bind();

		glUseProgram(shaderID);
		float square_offset = 0.7f;
		glUniform4f(square_offset_location, square_offset, 0.0f, 0.0f, 0.0f);

		glDrawElements(GL_TRIANGLES, 9,	GL_UNSIGNED_INT, nullptr);

		squareVA.Unbind();

		//--- �ﰢ�� �׸���
		triangleVA.Bind();

		glUseProgram(triangle_shaderID);
		float triangle_offset = -0.7f;
		glUniform4f(triangle_offset_location, triangle_offset, 0.0f, 0.0f, 0.0f);

		glDrawElements(GL_TRIANGLES, 3, GL_UNSIGNED_INT, nullptr);

		triangleVA.Unbind();

		glfwSwapBuffers(window); 
		glfwPollEvents(); 
	}

	glDeleteProgram(shaderID);
	glfwTerminate();
	return 0;
}