---
sidebar_position: 0
---

# Introduction

이 장에서는 개발 환경 설정을 위해 우리가 사용하는 것들의 기본적인 개념을 알아볼 것입니다.

OpenGL과 OpenGL의 사용을 돕는 GLEW, 그리고 윈도우 생성, 입력 처리, 표시 등을 수행하기 위한 GLFW 라이브러리를 함께 사용할 예정입니다.

이 세 가지에 대해 간단히 짚고 넘어가 보겠습니다.

## OpenGL

OpenGL은 API(Application Programming Interface)로, 그래픽 카드에 연산을 수행하도록 명령을 내릴 수 있는 인터페이스입니다.

OpenGL은 Specification(명세)인데, 간단히 말하자면 그래픽 카드가 어떤 기능(함수)들을 수행할 수 있는지를 적어놓은 목록이라고 생각하시면 됩니다.

우리가 하는 것은 이 기능 목록들 중 적당한 것들을 사용해서 그래픽 카드에 데이터를 집어넣고, 연산을 수행하게 하고, 결과 데이터를 읽어 오는 것입니다.

"목록만 있으면 되나?" 라는 생각이 드실텐데, 목록에 따른 실제 구현은 드라이버에 있으며, 이에 대해서는 GLEW 섹션에서 간단히 설명 드리겠습니다.

OpenGL의 세부적인 동작 원리, 역사, 버전별 기능의 차이, Vulkan과의 차이점 등등 자세히 알고자 하면 알아야 할 내용이 많습니다만, 이 튜토리얼은 컴퓨터 그래픽스 강의를 통해 배운 내용을 직접 체험(?)해 보는 데 목적이 있으므로 이러한 내용들에 대해서는 여기서 장황하게 설명하지는 않겠습니다. (필요한 내용들은 강의 시간에 설명 드릴 예정입니다.)

## GLFW

함께 사용할 [GLFW(Graphics Library FrameWork)](https://www.glfw.org/)는 윈도우를 생성하고 그래픽 카드를 통해 생성된 이미지를 그 윈도우에 표시하기 위해 사용하는 라이브러리입니다.

우리가 그래픽 카드를 사용해 만든 이미지를 눈으로 확인하기 위해서는 결과적으로 그 이미지가 출력 장치(모니터)에 나타나야 하므로, 우리가 작성하는 프로그램은 기본적으로 이미지를 표시할 수 있는 윈도우를 만들 수 있어야 합니다.

윈도우를 만드는 방법은 다양한 방법이 있을 수 있지만 여기서는 가장 간편하게 사용할 수 있는 라이브러리인 GLFW를 사용할 예정입니다. GLFW는 또한 OpenGL Context를 표시하는 방법이 이미 구현되어 있어서 복잡한 작업 없이도 간편하게 결과물을 확인할 수 있습니다.

GLFW는 크로스 플랫폼 라이브러리이므로 macOS, Linux에서도 활용 가능합니다.

참고로 말씀 드리자면, WebGL을 사용한 개발에서는 웹 브라우저가 이러한 관리를 대신 해준다고 보시면 됩니다.

## GLEW

[GLEW(OpenGL Extension Wrangler Library)](https://glew.sourceforge.net/)는 OpenGL 기능을 사용하기 위한 라이브러리입니다.

OpenGL은 사실 단순히 *그래픽 카드가 이러이러한 기능을 지원해야 한다*는 것들이 적혀있는 문서일 뿐입니다.

실제 기능의 수행은 그래픽 카드라는 하드웨어에 직접 명령을 내리는 [드라이버](https://en.wikipedia.org/wiki/Device_driver)가 하게 되는데, 문제는 우리가 이 드라이버라는 내부 프로그램의 함수 위치에 접근해서 호출하는 과정이 번거롭다는 것입니다.

```cpp title="from https://learnopengl.com/Getting-started/Creating-a-window"
// 1) 함수의 프로토타입 정의
typedef void (*GL_GENBUFFERS) (GLsizei, GLuint*);
// 2) 드라이버에서 함수를 찾아서 함수 포인터 할당
GL_GENBUFFERS glGenBuffers  = (GL_GENBUFFERS)wglGetProcAddress("glGenBuffers");
// 3) 함수 호출
unsigned int buffer;
glGenBuffers(1, &buffer);
```

위 코드를 아직 이해하실 필요는 없고, 원래 위와 같이 하나의 기능을 수행하려 할 때마다 1)->2)->3)의 코드를 작성해야 하는 것을 GLEW를 사용하면 3)만 작성하면 되도록 단순화 해주기 위한 라이브러리라고 이해하시면 됩니다.


이렇게 우리가 사용하는 세 가지(OpenGL, GLFW, GLEW)에 대해서 간단히 알아보았습니다. 다음 문서에서는 이제 실제 개발 환경 설정을 진행해 보도록 하겠습니다.

---

## 관련 링크
- [OpenGL Specification](https://registry.khronos.org/OpenGL-Refpages/gl4/)
- [GLFW(Graphics Library FrameWork)](https://www.glfw.org/)
- [GLEW(OpenGL Extension Wrangler Library)](https://glew.sourceforge.net/)
- [OpenGL/GLFW/GLEW 간단 설명](https://kyoungwhankim.github.io/ko/blog/opengl_intro/)