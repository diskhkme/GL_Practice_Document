---
sidebar_position: 10
---

# Shader and Renderer Abstraction

이번 장에서는 셰이더와 렌더러 부분을 추상화 해 보도록 하겠습니다.

메인함수 위쪽에 길게 들어가있는 셰이더 컴파일/링킹 부분도 클래스 안으로 집어넣을 것이고, 셰이더에 유니폼 값을 넘겨주는 기능도 클래스 메소드화 해줄 것입니다. 이 부분까지 거치고 나면 `main.cpp`가 상당히 깔끔해 질 것입니다.

렌더러는 간단하게 현재 그리기를 수행할 객체들을 바인딩하고 그리는 역할들 수행하도록 구현해 보겠습니다. 이 부분은 어렵지 않을 것입니다.

## Shader Class

앞서 말씀드렸듯이 셰이더의 역할은 크게 두 가지입니다.

1. 셰이더 코드를 입력받아 프로그램으로 컴파일/링킹
2. 셰이더 프로그램의 유니폼 입력

아래 클래스 정의를 보고 이 역할이 어떤 기능들에 들어 있는지 보도록 합시다.

```cpp title="Shader.h"
#pragma once

#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

struct ShaderProgramSource
{
	std::string VertexSource;
	std::string FragSource;
};

class Shader
{
private:
	std::string filepath;
	unsigned int shader;
public:
	Shader(const std::string& filepath);
	~Shader();

	void Bind() const;
	void Unbind() const;

	//Set Uniforms
	void SetUniform4f(const std::string& name, float v0, float v1, float v2, float v3);
	void SetUniform1f(const std::string& name, float value);
private:
	ShaderProgramSource ParseShader(const std::string& filepath);
	unsigned int CompileShader(unsigned int type, const std::string& source);
	unsigned int CreateShader(const std::string& vertexShader, const std::string& fragShader);

	int GetUniformLocation(const std::string& name);
};
```

셰이더 프로그램이 작성되어 있는 파일 경로를 입력으로 받아 생성될 것이고, 그 과정에서 사용되는 `ParseShader()` 등의 메소드는 외부에서 호출할 필요가 없기 때문에 private으로 선언하였습니다. 반면 셰이더의 유니폼을 입력하는 기능은 외부에서 호출이 필요하여 public으로 선언하였습니다.

아래는 셰이더 클래스의 구현입니다.

```cpp title="Shader.cpp"
#include "Shader.h"
#include <GL/glew.h>

Shader::Shader(const std::string& filepath)
	:filepath{ filepath }, shader{ 0 }
{
	ShaderProgramSource source = ParseShader(filepath);
	shader = CreateShader(source.VertexSource, source.FragSource);
}

Shader::~Shader()
{
	glDeleteProgram(shader);
}

ShaderProgramSource Shader::ParseShader(const std::string& filepath)
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


unsigned int Shader::CompileShader(unsigned int type, const std::string& source)
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

unsigned int Shader::CreateShader(const std::string& vertexShader, const std::string& fragShader)
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

void Shader::Bind() const
{
	glUseProgram(shader);
}

void Shader::Unbind() const
{
	glUseProgram(0);
}

void Shader::SetUniform4f(const std::string& name, float v0, float v1, float v2, float v3)
{
	glUniform4f(GetUniformLocation(name), v0, v1, v2, v3);
}

void Shader::SetUniform1f(const std::string& name, float value)
{
	glUniform1f(GetUniformLocation(name), value);
}

int Shader::GetUniformLocation(const std::string& name)
{
	int location = glGetUniformLocation(shader, name.c_str());
	if (location == -1)
	{
		std::cout << "Warning: unform '" << name << "' doesn't exist!\n";
	}
	return location;
}
```

코드는 길지만, 위쪽의 `ParseShader()`, `CompileShader()`, `CreateShader()` 모두 기존 메인함수 위쪽에 static 함수로 선언해 둔 코드를 가져와 붙인 것 뿐입니다. 이미 다 설명드린 내용이니 설명 드릴 것이 없네요.

아래도 마찬가지입니다. `GetUniformLocation()`으로 셰이더 내의 유니폼 위치를 찾는것도 내부적으로 `glGetUniformLocation()` 호출을 통해서 수행하는 것이 동일하며, 대신 `shader` 핸들 자체를 멤버로 가지고 있기 떄문에 별도의 매개변수로 넘겨줄 필요가 없어졌습니다. 유니폼 위치를 찾지 못한 경우 경고 메시지를 띄워 주는 소소한 기능을 추가하였습니다.

추가적으로 `SetUniformXX()`를 호출할 때 유니폼의 이름을 같이 넘겨주면 내부적으로 location을 알아서 찾아서 값을 집어넣도록 구현하였습니다.

<details>
<summary>성능 이슈</summary>

즉, 현재는 `glGetUniformLocation()`을 유니폼 값을 할당할 때마다 계속 호출한다는 의미이고, 현재 코드에서는 매 프레임마다 이러한 일이 발생하게 됩니다. 기본적으로 `glGetUniformLocation()`은 문자열 탐색으로 동작하기 때문에 성능에 좋지 않습니다.

첫 번째 최적화 방법으로는 `glGetUniformLocation()`을 노출하여 기존처럼 location을 미리 저장해 놓고 사용하는 방법이 있습니다. 단 이러한 경우에는 내가 location 핸들을 별도로 관리해야 하기 때문에 좋지 않은 설계입니다.

두 번째 방법으로는 hash table을 만들어 캐쉬로 사용하는 방법입니다. name(string)-location(int) 쌍을 저장해 두면 name 쿼리에 대해 빠르게 location을 반환해 줄 수 있습니다.

지금 당장은 부가적인 내용을 최소화 하기 위해 집어넣지 않았는데, 나중에 문제가 된다면 두 번째 방법을 추가하도록 하겠습니다. 이 시점에 직접 구현해 보시면 더 좋고요!
</details>

이제 셰이더 클래스를 사용하는 부분을 보면 아래와 같습니다. 수정된 부분이 여기저기 흩어져 있어서 그렇지 내용상 어려운 부분은 없으실 겁니다. `Shader` 클래스의 소멸자에 `glDeleteProgram()`도 알아서 호출하게 해 두었으니 나중에 명시적으로 따로 호출할 필요도 없어졌습니다.

```cpp title="main.cpp"
#include "VertexBuffer.h"
#include "IndexBuffer.h"
#include "VertexBufferLayout.h"
#include "VertexArray.h"
//diff-add
#include "Shader.h"

//diff-remove
struct ShaderProgramSource {...};
//diff-remove
static ShaderProgramSource ParseShader(const std::string& filepath){...}
//diff-remove
static unsigned int CompileShader(unsigned int type, const std::string& source){...}
//diff-remove
static unsigned int CreateShader(const std::string& vertexShader, const std::string& fragShader)

int main(void)
{
...
    //diff-remove
    ShaderProgramSource source = ParseShader("resources/shaders/basic.shader");
    //diff-remove
    unsigned int shaderID = CreateShader(source.VertexSource, source.FragSource);
    //diff-remove
    int square_offset_location = glGetUniformLocation(shaderID, "u_offset");
    //diff-add
    Shader squareShader{ "resources/shaders/basic.shader" };
    ...

    while (!glfwWindowShouldClose(window)) 
    {
        glClear(GL_COLOR_BUFFER_BIT);

        //--- 사각형 그리기
        squareVA.Bind();

        //diff-remove
        glUseProgram(shaderID);
        //diff-add 
        squareShader.Bind();
        float square_offset = 0.7f;
        //diff-remove
        glUniform4f(square_offset_location, square_offset, 0.0f, 0.0f, 0.0f);
        //diff-add
        squareShader.SetUniform4f("u_offset", square_offset, 0.0f, 0.0f, 0.0f);

        glDrawElements(GL_TRIANGLES, 9,	GL_UNSIGNED_INT, nullptr);
        ...
    }
    //diff-remove
    glDeleteProgram(shaderID);
    ...

```

모두 적지는 않았지만, 삼각형 그리기에 해당하는 부분까지 적정히 수정해 주시면 이전과 동일한 결과를 보실 수 있을겁니다.

## Renderer Class

다음은 `Renderer` 클래스입니다. 이 클래스가 담당할 코드는 아래 두줄입니다. 즉 "화면 지우기"와 "화면 그리기" 입니다.

```cpp
glClear(GL_COLOR_BUFFER_BIT);
glDrawElements(GL_TRIANGLES, 9,	GL_UNSIGNED_INT, nullptr);
```

`Renderer` 클래스 설계는 아래와 같습니다. `Clear()`와 `Draw()`를 가지고 있고 각각 어떤 역할을 할지는 명확하죠. 주의해서 보셔야 할 부분은 VA, IB, Shader를 인자로 넘기고 있다는 뜻입니다. 즉, 물체를 하나 그릴 때 필요한 모든 정보를 같이 넘겨주고 있는 것입니다.

```cpp title="Renderer.h"
#pragma once

#include "Shader.h"
#include "VertexArray.h"
#include "IndexBuffer.h"

class Renderer
{
public:
	void Draw(const VertexArray& va, const IndexBuffer& ib, const Shader& shader) const;
	void Clear() const;
};
```

`Renderer` 클래스 구현은 아래와 같습니다.

```cpp title="Renderer.cpp"
#include "Renderer.h"
#include <GL/glew.h>

void Renderer::Draw(const VertexArray& va, const IndexBuffer& ib, const Shader& shader) const
{
	shader.Bind();
	va.Bind();
	ib.Bind();

	glDrawElements(GL_TRIANGLES, ib.GetCount(), GL_UNSIGNED_INT, nullptr);
}

void Renderer::Clear() const
{
	glClear(GL_COLOR_BUFFER_BIT);
}
```

`main.cpp`에서는 아래와 같이 사용합니다.

```cpp title="main.cpp"
...
#include "VertexArray.h"
#include "Shader.h"
//diff-add
#include "Renderer.h"

...
//diff-add
Renderer renderer;

// Rendering Loop
while (!glfwWindowShouldClose(window)) 
{
    //diff-remove
    glClear(GL_COLOR_BUFFER_BIT);
    //diff-add
    renderer.Clear();

    //--- 사각형 그리기
    squareVA.Bind();

    //glUseProgram(shaderID);
    squareShader.Bind();
    float square_offset = 0.7f;
    //glUniform4f(square_offset_location, square_offset, 0.0f, 0.0f, 0.0f);
    squareShader.SetUniform4f("u_offset", square_offset, 0.0f, 0.0f, 0.0f);

    //diff-remove
    glDrawElements(GL_TRIANGLES, 9,	GL_UNSIGNED_INT, nullptr);
    //diff-add
    renderer.Draw(squareVA, squareIB, squareShader);

    squareVA.Unbind();

    ...
```

이상입니다. 삼각형 관련 코드는 스스로 수정해 보시기 바랍니다. 이로써 `main.cpp` 파일이 꽤나 짧아졌고, 이름을 잘 지어놔서 어떤 부분이 어떤 역할을 하는지 쉽게 파악이 가능하실겁니다.

이제 `main()` 안에 `gl`로 시작하는 OpenGL API 호출 코드가 아래 한 줄밖에 남지 않았다는 것입니다. 나머지는 모두 클래스가 호출을 담당합니다. 그리고 아래 코드도 곧 다른 클래스 안으로 들어갈 예정입니다.

```cpp
glClearColor(0.25, 0.25, 0.7, 1);
```

## 마치며

이번 문서까지 포함해서 지난 세 개의 문서가 기존 OpenGL 호출 코드들을 클래스 내부로 옮겨서 리팩터링 하는 것이 주 내용이었습니다.

그래픽스 이론 관련 내용이 아니라 생각하시고 첨부된 소스 코드만 보고 넘어가시는 분들도 있으실 수 있는데, 복습 겸 해서 꼭 읽어 보시면서 따라서 타이핑을 해 보시면, 실력 향상에 많은 도움이 되실 것으로 생각합니다.

또한 더 나아가서 제가 제시하는 내용이 정답이라고 생각하지 마시고, 이 부분은 왜 이렇게 했을까? 다른 방식으로 하는것이 더 좋지 않을까? 같은 생각들을 스스로 해 보시기 바랍니다. 결국 이러한 고민들을 많이 해 본 사람과 그렇지 않은 사람들은 많은 차이를 나타내게 됩니다.

## 연습 문제

- 없음

---

## 관련 링크

- [최종 코드(zip)](./assets/10_shader_and_renderer/src/src.zip)