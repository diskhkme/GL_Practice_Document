---
sidebar_position: 11
---

# Window Abstraction and Input Handling

이번 문서에서는 사용자의 키보드, 마우스 입력을 받을 수 있도록 프로그램을 확장하기 위해 Window 클래스를 구현하고 기본적인 입력 처리 방법을 구현해 보도록 하겠습니다.

윈도우를 생성하는 부분은 GLFW가 담당하고 있고, 이러한 윈도우에 들어오는 입력 이벤트들도 GLFW가 전달해 줄 수 있습니다. 그러므로 윈도우를 관리하는 클래스를 만들어 이러한 기능들을 담당하도록 할 것입니다.

참고로 지금 시점에서 이러한 내용을 진행하는 이유는 다음 문서에서 본격적으로 3D 그래픽스 기능의 구현을 시작하게 될텐데, 카메라 시점을 자유롭게 움직이지 못하면 장면을 관찰하기 어렵고 필요한 부분을 자세히 들여다 보기 어렵기 때문입니다.

## Window Class

우선 기본적인 `Window` 클래스는 다음과 같이 정의할 것입니다.

```cpp title="Window.h"
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

private:
	GLFWwindow* mainWindow;
	int width, height; //윈도우의 크기

};
```

`main.cpp`에서 GLFW와 관련한 코드들을 이제 `Window`의 기능으로 구현할 것입니다. 초반에 수행하는 윈도우 정의 및 생성과 GLEW 초기화를 이제 윈도우의 초기화(`Initialize()`) 과정에서 수행하도록 할 것입니다. 

화면을 새로 그리는 버퍼의 스왑(`glfwSwapBuffers()`)과 렌더링 루프를 종료를 탐지하는 (`glfwWindowShouldClose()`)도 이제 각각 `SwapBuffers()`와 `GetShouldClose()`가 담당하며, 각각은 한 줄의 코드 호출로 끝나기 때문에 헤더 파일에 구현을 해 두었습니다.

`Window` 클래스의 구현은 아래와 같습니다.

```cpp title="Window.cpp"
#include "Window.h"

Window::Window()
	:width{ 800 }, height{ 600 }
{
}

Window::Window(int windowWidth, int windowHeight)
	: width{ windowWidth }, height{ windowHeight }
{
}

Window::~Window()
{
	glfwDestroyWindow(mainWindow);
	glfwTerminate();
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
}
```

기존 `main()` 함수 위쪽에서 하던 작업을 그대로 가져왔습니다. 이제 `mainWindow` 필드에 `glfwCreateWindow()`를 통해 생성된 윈도우의 핸들을 저장해 두는 것이 차이점이라면 차이점입니다.

이에 따라 `main.cpp`에는 아래와 같은 변경이 필요합니다. 대체될 부분만 대체되었기 때문에 따로 설명이 필요 없을 것 같습니다. 추가적으로 위쪽의 헤더를 추가하는 부분이 이제 모두 클래스 안으로 들어갔으므로 `main.cpp`에서는 삭제해 줍니다.

```cpp title="main.cpp"
//diff-remove
#define GLEW_STATIC
//diff-remove
#include <GL/glew.h>
//diff-remove
#include <GLFW/glfw3.h>
//diff-remove
#include <iostream>
//diff-remove
#include <fstream>
//diff-remove
#include <string>
//diff-remove
#include <sstream>

#include "VertexBuffer.h"
#include "IndexBuffer.h"
#include "VertexBufferLayout.h"
#include "VertexArray.h"
#include "Shader.h"
#include "Renderer.h"
//diff-add
#include "Window.h"

...

int main(void)
{
    //이하 모두 제거
    //diff-remove
    if (!glfwInit())
    //diff-remove
		return -1;
    //diff-remove
    ...

    //diff-add
    Window mainWindow{ 800, 600 };
    //diff-add
    mainWindow.Initialize();

    float positions[] = {
    ...

    //diff-remove
    while (!glfwWindowShouldClose(window)) 
    //diff-add
    while (!mainWindow.GetShouldClose())
    {
        ...

        //diff-remove
        glfwSwapBuffers(window); 
        //diff-add
        mainWindow.SwapBuffers();
        glfwPollEvents(); 
    }   
    //diff-remove
    glfwTerminate();
    return 0;
}

```


## Window Class Extend for Input Handling

다음은 사용자 입력을 받을 수 있도록 `Window` 클래스를 확장해 보겠습니다. GLFW에서는 다양한 [입력 처리 방법](https://www.glfw.org/docs/3.3/input_guide.html)을 제공하는데, 여기서는 기초적인 내용만을 활용해 보도록 하겠습니다.

### Window 클래스 정의 확장

먼저 `Window.h`에, 필요한 기능과 데이터들을 먼저 추가하도록 하겠습니다.

```cpp title="Window.h"
    ...
    void SwapBuffers() { glfwSwapBuffers(mainWindow); }

    //diff-add
    bool* GetKeys() {return keys;}
    //diff-add
    float GetXChange();
    //diff-add
    float GetYChange();

private:
    GLFWwindow* mainWindow;
    int width, height; //윈도우의 크기

    //diff-add
    bool keys[1024];
    //diff-add
    float lastX, lastY;
    //diff-add
    float changeX, changeY;
    //diff-add
    bool isMouseFirstMoved;

    //diff-add
    static void HandleKeys(GLFWwindow* window, int key, int code, int action, int mode);
    //diff-add
    static void HandleMouse(GLFWwindow* window, double xPos, double yPos);

    //diff-add
    void CreateCallback();
};
```

여기서 핵심이 되는 부분은 아래쪽의 `HandleKeys()`와 `HandleMouse()` 함수입니다. 이벤트 기반의 GUI 프로그래밍 경험이 있으신 분들은 익숙하실텐데, 이 함수들은 [콜백(callback)](https://en.wikipedia.org/wiki/Callback_(computer_programming)) 함수입니다.

간단하게 이야기해서 **위 함수들을 GLFW에 등록해 놓으면, 윈도우에서 키보드나 마우스 입력을 탐지하면 위 함수를 자동으로 호출**해 주게 됩니다. 또한 **호출 매개변수에 필요한 입력 정보들이 담겨있게 되므로** 우리는 그 값들을 활용해서 로직을 작성하면 됩니다.

예를 들자면 `HandleMouse()` 콜백을 등록해 놓으면 사용자가 마우스를 움직일 때마다 이 함수가 자동으로 호출되면서, `xPos`와 `yPos`에 마우스 커서의 위치가 전달됩니다. 우리는 그 위치값을 사용해 무엇을 할지만 구현해 주면 됩니다.

위쪽에서 선언한 `keys` 배열과 `lastX, lastY` 등 변수는 실제 구현 코드를 보면서 좀 더 설명드리도록 하겠습니다.


### Window 클래스 구현 확장

이제 `Window.cpp`의 수정 사항입니다. 여러 파트로 나누어 보여드리겠습니다. 

먼저 생성자 부분입니다. 추가된 `isMouseFirstMoved` 멤버 변수를 `true`로 초기화하여 생성합니다. 나머지 변수들도 초기화 해주어도 되지만, 현재는 코드를 줄이기 위해서 중요한 변수들만 초기화 하도록 했습니다.

```cpp title="Window.cpp"
Window::Window()
    //diff-remove
    :width{ 800 }, height{ 600 }
    //diff-add
    :width{ 800 }, height{ 600 }, isMouseFirstMoved { true }
{
}

Window::Window(int windowWidth, int windowHeight)
    //diff-remove
    : width{ windowWidth }, height{ windowHeight }
    //diff-add
    : width{ windowWidth }, height{ windowHeight }, isMouseFirstMoved { true }
{
}
```

다음은 콜백함수 등록입니다. `Window::CreateCallback()` 함수를 구현하고 `Window::Initialize()` 과정에서 호출해줄 겁니다.

```cpp title="Window.cpp"
//diff-add
void Window::CreateCallback()
//diff-add
{
    //diff-add
    glfwSetKeyCallback(mainWindow, HandleKeys);
    //diff-add
    glfwSetCursorPosCallback(mainWindow, HandleMouse);
    //diff-add
}

int Window::Initialize()
{
    ...
    // 배경색 설정
    glClearColor(0.25, 0.25, 0.7, 1);

    //diff-add
    CreateCallback();
    //diff-add
    glfwSetInputMode(mainWindow, GLFW_CURSOR, GLFW_CURSOR_HIDDEN);
    //diff-add
    glfwSetWindowUserPointer(mainWindow, this);
}
```

`glfwSetKeyCallback()`/`glfwSetCursorPosCallback()`의 매개변수로  `HandleKeys`와 `HandleMouse` 함수 포인터를 넘겨 해당 윈도우에서 키보드나 마우스 입력이 발생하면 그 함수들을 호출하도록 등록해줍니다.

`Window::Initialize()`에서는 위와 같은 등록 과정과 함께 마우스 커서를 숨기는 옵션을 설정하고(`glfwSetInputMode()`), 현재 객체의 주소를 알려줍니다.(`glfwSetWindowUserPointer()`)

<details>
`glfwSetWindowUserPointer()`는 콜백 함수가 호출된 객체를 명시하고, static 함수인 callback에서 해당 객체의 멤버에 접근하기 위해서 필요한 작업입니다.

우선 GLFW는 C를 기반으로 구현되어있기 때문에 `glfwSetKeyCallback()`의 두 번째 매개변수인 함수의 포인터는 객체의 멤버 함수를 받을 수 없고 전역 함수만 받을 수 있습니다. 따라서 우리는 `Window::HandleKeys()`와 `Window::HandleMouse()`를 static 변수로 선언 하였습니다.

한편, `Window` 클래스는 싱글턴이 아니므로 이론적으로는 여러 개의 윈도우를 생성할 수 있습니다. 따라서 한 프로그램에서 윈도우를 두 개 이상 생성할 수 있다는 이야기입니다. 그러면 어떤 윈도우에서 입력이 발생했는지를 알 수 있어야 제대로 로직을 작성할 수 있을겁니다. 그렇지 못하면 콜백함수들은 static이므로 특정 객체의 데이터에 접근할 수 없습니다.

그래서 `glfwSetWindowUserPointer()`를 사용해 윈도우 객체의 포인터까지  명시해 주는 것입니다. 그러면 이후 콜백 함수 내부에서 `glfwGetWindowUserPointer()`를 사용해 입력이 발생한 `Window` 객체의 주소값을 얻어와 해당 객체의 멤버 변수에 접근할 수 있습니다.
</details>

이제 마우스 입력을 받아 보겠습니다. 마우스 입력에 관한 콜백 함수인 `Window::HandleMouse()` 함수를 구현하면 됩니다. 아래 코드는 모두 추가되는 코드입니다.

```cpp "Window.cpp"
void Window::HandleMouse(GLFWwindow * window, double xPos, double yPos)
{
    Window *windowObject = static_cast<Window*>(glfwGetWindowUserPointer(window));

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
```

먼저 입력이 발생한 윈도우 객체의 주소값을 얻어오기 위해 `glfwGetWindowUserPointer()`를 사용합니다. 그리고 현재 마우스 커서의 위치인 `xPos`와 `yPos`를 처리해 줄 것인데, 입력이 최초로 발생한 시점에서는 `lastX/lastY`에 커서 위치를 저장하며 그 이후에는 마우스가 얼마나 이동했는지를 `changeX/changeY`에 저장해 둡니다.

`changeY`의 경우 윈도우의 원점(`0,0`)이 좌하단이 아니라 좌상단에 위치해 있기 때문에 우리가 직관적으로 알 수 있도록 바꿔준 것입니다. 즉, 콜백을 통해 들어오는 값은 커서가 아래로 내려가면 y값이 증가하게 되는데, 우리는 마우스를 올리면 `changeY`를 +값으로, 마우스를 내리면 -값으로 저장해 두기 위해 좌표를 뒤집어 주었습니다.

추가적으로 제대로 값이 계산되고 있는지를 확인해 보기 위해서 콘솔창에 `changeX/changeY` 값을 출력하도록 했습니다. (`Window.cpp` 첫줄에 `#include <iostream>` 추가 해주세요.)

:::note
일반적으로 게임 엔진 등에서는 이러한 변화값을 내부적으로 계산하여 input.relative 등 속성으로 제공해 주지만 GLFW는 그런 기능까지는 제공하지 않으므로 우리가 직접 구현한 것입니다.
:::

다음으로는 키보드 입력입니다. `Window::HandleKeys()`를 구현합니다.

```cpp title="Window.cpp"
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
```

키보드 입력이 발생하면, `key`, `code`, `action`, `mode`가 인자로 전달됩니다. `code`와 `mode`는 현재 사용하지 않고 `key`와 `action`만 사용합니다. `key`는 어떤 키가 대상인인지, `action`은 누르는 이벤트(`GLFW_PRESS`)인지 떼는 이벤트(`GLFW_RELEASE`)인지 정보를 담고 있습니다. 

위 정보들을 바탕으로 멤버 변수인 `keys`배열에 해당 key 인덱스의 값을 `true/false`로 바꿔주는 로직이고, 이벤트가 발생할 때마다 콘솔창에 출력을 하도록 했습니다.

추가적으로 윈도우를 편리하게 끄기 위해 ESC 키를 눌렀을 때 `glfwWindowShouldClose()`를 반환하도록 설정해 주었습니다.

마지막으로 `Window::GetXChange()`와 `Window::GetYChange()`를 구현해줍니다. 이 함수를 호출할 때마다 `changeX/Y`값을 0으로 초기화 해 주는데, 이러한 과정이 왜 필요한지는 다음 문서에서 설명드리겠습니다.

```cpp title="Window.cpp"
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
```

여기까지 구현하고 실행해 보면 이제 윈도우 내에서 마우스를 움직이거나 키보드를 누르면 콘솔 창에 메시지가 뜨는 것을 볼 수 있으실겁니다. 마우스 입력 이벤트가 발생하는 경우 `XChange: ...` 메시지가, 키보드 입력 이벤트가 발생하는 경우 `Pressed: ...` 및 `Released: ...`가 발생합니다.

실제로 이러한 입력 데이터를 활용해 보는 것은 다음 문서에서 진행할 예정입니다. 코드를 보시면, 어떻게 입력 데이터를 얻어오실 수 있는지 예상이 되시나요? 미리 한 번 예상해 보신 후에 다음 문서에서 이어서 진행해 보시면 좋겠습니다.

## 연습 문제

- 없음

---

## 관련 링크

- [최종 코드(zip)](./assets/12_window_input_handle/src/src.zip)
- [GLFW Input Guide](https://www.glfw.org/docs/3.3/input_guide.html)
