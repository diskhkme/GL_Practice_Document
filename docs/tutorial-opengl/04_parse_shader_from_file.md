---
sidebar_position: 4
---

# Parse Shader from File

이번 문서에서는 간단하게 별도의 파일로부터 셰이더를 읽어오는 방식으로 코드를 개선해 보도록 하겠습니다.

지난 번에도 보았지만 문자열 그 자체로 셰이더를 하드 코딩하면 일반 보기에도 좋지 않고, 실제 셰이더를 작성하는 작업도 상당히 오류가 발생하기 쉬워집니다.

따라서 별도의 파일에 셰이더 코드를 작성하고, 그 파일을 읽어서 활용할 수 있도록 방식을 바꿀 것입니다.

이 튜토리얼에서는 이런 식으로 그래픽스 관련 내용과 함께 코드를 개선하는 작업이 중간에 병행될 예정이니 참고 하시기 바랍니다.

## 셰이더 파일 생성

먼저 기존의 셰이더 코드를 별도의 파일로 옮겨 보도록 하겠습니다.

셰이더 파일이 어디에 위치해 있을지를 설계하는 것은 본인 설계 나름이지만, 저희의 경우 프로젝트 경로에 상대 경로로 `resources/shaders` 폴더를 만들 것입니다.

그리고 그 안에 테스트를 위해 지난번에 작성한 셰이더를 `basic.shader` 파일로 만들어서 저장해 둘 것입니다.

아래와 같이 경로가 구성되도록 만들어 보세요.

```
<솔루션 경로>
├── Dependencies
│   ├── GLFW
│   │   ├── include
|   │   ├── lib-vc2022
│   │   └── LICENSE.md
│   └── GLEW
│       ├── bin
|       ├── include
|       ├── lib
│       └── LICENSE.txt
├── <프로젝트이름>
|   ├── resources               // <- 폴더 생성
|   |   └── shaders             // <- 폴더 생성
|   |       └── basic.shader    // <- 파일 생성
|   └── main.cpp 등등
└── <프로젝트이름>.sln
```

`basic.shader`의 파일 내용은 아래와 같습니다. 지난번과 내용은 동일하고, 정점 셰이더 코드 구간과 프래그먼트 셰이더 코드를 한 파일에 작성할 것이므로, 코드 구간을 구분할 용도로 `#shader vertex`, `#shader fragment`만 추가 하였습니다.

```glsl title="resources/shaders/basic.shader"
#shader vertex
#version 330 core

layout(location = 0) in vec4 position; 

void main()
{
	gl_Position = position; 
};

#shader fragment
#version 330 core

layout(location = 0) out vec4 color;

void main()
{
	color = vec4(1.0, 1.0 ,0.0, 1.0); 
};
```

## 파일 입력을 통한 셰이더 사용

`main.cpp`에서 바뀌는 내용은 많지 않습니다. 우선 파일 입력에 필요한 헤더들을 몇 가지 추가로 include 해줍니다. 그리고 정점 셰이더와 프래그먼트 셰이더를 한 단위로 관리하기 위해 `ShaderProgramSource` 구조체를 새로 정의하였습니다.

```cpp title="main.cpp"
...
#include <iostream>
//diff-add
#include <fstream>
//diff-add
#include <string>
//diff-add
#include <sstream>

//diff-add
struct ShaderProgramSource
//diff-add
{
    //diff-add
	std::string VertexSource;
    //diff-add
	std::string FragSource;
    //diff-add
};
...
```

그리고 셰이더 컴파일 함수 앞에, 파일로부터 셰이더의 내용을 읽어오는 `ParseShader()` 함수를 추가 정의해 줍니다.

```cpp title="main.cpp"
	std::string FragSource;
};

//diff-add
static ShaderProgramSource ParseShader(const std::string& filepath)
//diff-add
{
    //diff-add
	std::ifstream stream(filepath);
    //diff-add
    enum class ShaderType
    //diff-add
	{
        //diff-add
		NONE = -1, VERTEX = 0, FRAGMENT = 1
        //diff-add
	};

    //diff-add
	std::string line;
    //diff-add
	std::stringstream ss[2];
    //diff-add
	ShaderType type = ShaderType::NONE;
    //diff-add
	while (getline(stream, line))
    //diff-add
	{
        //diff-add
		if (line.find("#shader") != std::string::npos)
        //diff-add
		{
            //diff-add
			if (line.find("vertex") != std::string::npos) //vertex 셰이더 섹션
            //diff-add
			{
                //diff-add
				type = ShaderType::VERTEX;
                //diff-add
			}
            //diff-add
			else if (line.find("fragment") != std::string::npos) //fragment 셰이더 섹션
            //diff-add
			{
                //diff-add
				type = ShaderType::FRAGMENT;
                //diff-add
			}
            //diff-add
		}
        //diff-add
		else
        //diff-add
		{
            //diff-add
			ss[(int)type] << line << '\n'; //코드를 stringstream에 삽입
            //diff-add
		}
        //diff-add
	}
    //diff-add
    return ShaderProgramSource{ ss[0].str(), ss[1].str() };
    //diff-add
}

static unsigned int CompileShader(unsigned int type, const std::string& source)
...
```

C++에 익숙하지 않으시다면 이 부분도 그냥 모르고 넘어가셔도 됩니다. (우리가 수정하지 않을 부분) API를 사용하듯이 기능만 알고 계시면 되는데 파일로부터 정점 셰이더 파트와 프래그먼트 셰이더 파트를 읽어와 `ShaderProgramSource` 구조체에 각각 소스가 담긴채로 반환해주는 함수입니다.

이제 아래쪽에서 기존에 `std::string` 변수로 하드코딩한 셰이더는 없애고, 방금 만든 `ParseShader`를 사용하는 코드로 바꿔 줍니다.

```cpp title="main.cpp"
glVertexAttribPointer(0, 2,	GL_FLOAT, GL_FALSE, sizeof(float) * 2, 0); 

//diff-remove
std::string vertexShader =
//diff-remove
    "#version 330 core\n"
    //diff-remove
    "layout(location = 0) in vec4 position;\n" 
    //diff-remove
    "void main()\n"
    //diff-remove
    "{\n"
    //diff-remove
    "	gl_Position = position;\n" 
    //diff-remove
    "}\n";

//diff-remove
std::string fragShader =
//diff-remove
    "#version 330 core\n"
    //diff-remove
    "layout(location = 0) out vec4 color;\n" 
    //diff-remove
    "void main()\n"
    //diff-remove
    "{\n"
    //diff-remove
    "	color = vec4(1.0, 1.0 ,0.0, 1.0);\n" 
    //diff-remove
    "}\n";

//diff-add
ShaderProgramSource source = ParseShader("resources/shaders/basic.shader");
//diff-add
unsigned int shaderID = CreateShader(source.VertexSource, source.FragSource);
//diff-remove
unsigned int shader = CreateShader(vertexShader, fragShader);
glUseProgram(shaderID);
```

이후 실행해서 확인해 보시면 기존과 동일하게 동작하는 것을 보실 수 있습니다.


## 마치며

1. Visual Studio에서 F5를 눌러 실행했을 때, 실행 파일의 루트 경로는 프로젝트 파일이 있는 경로입니다. 따라서 문제 없이 `basic.shader`파일을 읽어올 수 있습니다. 하지만 솔루션 경로의 `Build/x64Debug/Tutorial.exe`를 실행해 보시면 색상이 제대로 표시되지 않는 것을 보실 수 있는데 이는 `Build/x64Debug/resources/shaders/basic.shader` 경로에 파일이 없기 때문입니다. 이 문제를 해결해 주면 `Build/x64Debug/Tutorial.exe`를 실행해도 올바로 동작합니다.


## 연습 문제

- 없음

---

## 관련 링크
- [코드](assets/04_parse_shader_from_file/src/main_end.cpp)
- [셰이더](assets/04_parse_shader_from_file/src/basic.shader)


