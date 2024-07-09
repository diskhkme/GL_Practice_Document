---
sidebar_position: 15
---

# Model Import

이번 문서에서는 파일로부터 3D 모델을 로드하는 기능을 추가해 보도록 하겠습니다. 앞으로는 프래그먼트 셰이더를 작성하여 텍스처, 조명 효과, 그림자 등을 추가할 예정인데 단순한 모델을 그려보는 것으로는 장면이 좀 심심해 보이기 때문에 복잡한 모델을 사용할 수 있도록 하려고 합니다.

지금까지는 `positions`, `indices`와 같이 우리가 직접 배열을 정의하고 이를 VBO와 VAO를 통해 GPU로 전달하고 활용하는 방식이었습니다. 하지만 이러한 방식으로는 복잡한 모델을 생성하는 것이 불가능하기 때문에, 이미 누군가가 만들어놓은 멋진 모델로부터 `positions`, `indices`를 포함한 다양한 정보들을 불러와서 활용하는 방법이 필요합니다.

지금까지와 마찬가지로 이러한 작업을 위해서는 외부 라이브러리의 도움이 필요하며 이를 위해서 우리는 오픈소스 에셋 임포트 라이브러리인 assimp를 사용할 예정입니다.

## Assimp

[Assimp](https://github.com/assimp/assimp)는 오픈소스 에셋 임포트 라이브러리로, 다양한 3D 모델 파일을 파싱해서 내부 데이터에 접근할 수 있도록 해 줍니다. [다양한 포맷](https://github.com/assimp/assimp/blob/master/doc/Fileformats.md)의 파일들을 지원하기 때문에 편리하게 활용이 가능합니다.

### Assimp 설치

레포지토리에 방문해 보시면 소스코드가 존재하며, 직접 컴파일해서 라이브러리를 사용해도 됩니다. 하지만 여기서는 복잡한 과정은 제외하고 가장 빠르게 우리 프로젝트에 포함해서 사용할 수 있도록 pre-built binary를 사용하겠습니다. [여기](https://kimkulling.itch.io/the-asset-importer-lib)에 방문하셔서 exe 설치 파일을 다운로드 하시고 설치하세요.

:::warning
설치 후 컴퓨터가 재부팅됩니다. 필요한 것들은 미리 저장해 두시고 설치하세요.
:::

윈도우 기준으로 기본 설치 경로는 `C:\Program Files\Assimp`입니다. 들어가 보시면 이제는 익숙한 `include`/`lib`와 같은 폴더들이 보일겁니다. 아래와 같이 폴더 구조가 되도록 프로젝트 폴더 쪽으로 복사해 줍니다.

```
<솔루션 경로>
├── Dependencies
│   ├── GLFW
│   │   ├── include
|   │   ├── lib-vc2022
│   │   └── LICENSE.md
│   ├── GLEW
│   │   ├── bin
|   │   ├── include
|   │   ├── lib
│   │   └── LICENSE.txt
│   └── Assimp
|       ├── include             // <- 폴더 복사
|       ├── lib                 // <- 폴더 복사
│       └── LICENSE             // <- 파일 복사
├── <프로젝트이름>
|   ├── resources               
|   |   └── shaders             
|   ├── vendors                 
|   |   └── glm                 
|   |       └── glm.hpp 등등
|   ├── main.cpp 등등
|   └── assimp-vc143-mt.dll     // <- 파일 복사 (bin/x64 폴더 내 dll 파일)
└── <프로젝트이름>.sln
```

그리고 프로젝트 설정에서 "C/C++▶일반"의 추가 포함 디렉터리를 아래와 같이 설정해 줍니다.

```
$(SolutionDir)Dependencies/GLFW/include;$(SolutionDir)Dependencies/GLEW/include;$(ProjectDir)/vendors;$(SolutionDir)Dependencies/Assimp/include
```

"구성 속성▶링커▶일반"의 "추가 라이브러리 디렉터리"에는 아래와 같이 lib 폴더를 추가해 줍니다.

```
$(SolutionDir)Dependencies/GLFW/lib-vc2022;$(SolutionDir)Dependencies/GLEW/lib/Release/$(Platform);$(SolutionDir)Dependencies/Assimp/lib/$(Platform)
```

마지막으로 "구성 속성▶링커▶입력"의 추가 종속성에 assimp 라이브러리 파일을 추가해 줍니다.

```
assimp-vc143-mt.lib;glew32s.lib;glfw3.lib;opengl32.lib;User32.lib;Gdi32.lib;Shell32.lib
```

### Assimp 설치 테스트

이렇게 하면 준비는 다 된 것인데, 문제가 없는지 확인하기 위해 테스트 모델을 준비해서 확인해 보겠습니다.

[모델을 다운로드](./assets/16_model_import/src/models.zip)해서 압축을 풀어 보시면 테스트 용으로 준비한 obj 파일 두 개가 있을 것입니다. 이 파일들을 아래와 같은 경로에 위치시켜줍니다. 앞으로 우리가 사용할 모델 파일들은 이렇게 `resources/models` 경로에 위치시켜 줄 것입니다.

```
<솔루션 경로>
├── Dependencies
│   ├── GLFW
│   │   ├── include
|   │   ├── lib-vc2022
│   │   └── LICENSE.md
│   ├── GLEW
│   │   ├── bin
|   │   ├── include
|   │   ├── lib
│   │   └── LICENSE.txt
│   └── Assimp
|       ├── include             
|       ├── lib                 
│       └── LICENSE             
├── <프로젝트이름>
|   ├── resources               
|   |   ├── shaders             
|   |   └── models              // <- 폴더 생성             
|   |       ├── cube.obj        // <- 파일 복사
|   |       └── teapot.obj      // <- 파일 복사
|   ├── vendors                 
|   |   └── glm                 
|   |       └── glm.hpp 등등
|   ├── main.cpp 등등
|   └── assimp-vc143-mt.dll     
└── <프로젝트이름>.sln
```

그리고 `main.cpp`에서는 아래와 같이 짧은 코드로 라이브러리 링크가 제대로 되었는지 확인해 봅니다.

```cpp title="main.cpp"
...
#include "glm/glm.hpp"
#include "glm/ext.hpp"

//diff-add
#include <assimp/Importer.hpp>
//diff-add
#include <assimp/postprocess.h>

int main(void)
{
    //diff-add
    Assimp::Importer importer;
    //diff-add
    const aiScene* scene = importer.ReadFile("resources/models/teapot.obj", aiProcess_Triangulate);

    Window mainWindow{ 800, 600 };
    mainWindow.Initialize();
    ...
```

이렇게 코드를 작성하고 실행했을 때, 빌드에 문제가 생기지 않고, 기존과 동일한 화면이 보인다면 문제 없는 것입니다. 




## 연습 문제

1. `CalculateViewMatrix()`에서 `glm::lookAt()` 함수를 사용하지 않고, 직접 `front(-n)`, `right(u)`, `up(v)` 벡터 값으로 뷰 변환 행렬을 반환하도록 바꿔 보세요.

2. Q/E 키를 누르면 카메라가 상/하로 이동하도록 하는 기능을 추가적으로 구현해 보세요.

3. 카메라의 이동(키보드)에 비해 시점 변경(마우스)은 뭔가 부드럽지 못하게 느껴지지 않나요? 부드럽게 변환이 되도록 한 번 개선해 보세요.

---

## 관련 링크

- [최종 코드(zip)](./assets/14_interactive_camera/src/src.zip)
- [Yaw, Pitch, Roll](https://en.wikipedia.org/wiki/Aircraft_principal_axes)
- [구면 좌표계](https://en.wikipedia.org/wiki/Spherical_coordinate_system)
- [FPS independency](https://webgl2fundamentals.org/webgl/lessons/ko/webgl-animation.html)