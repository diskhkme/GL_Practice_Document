"use strict";(self.webpackChunkgl_practice_document=self.webpackChunkgl_practice_document||[]).push([[618],{515:(r,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>s,default:()=>f,frontMatter:()=>t,metadata:()=>a,toc:()=>c});var d=n(4848),i=n(8453);const t={sidebar_position:5},s="Parse Shader from File",a={id:"tutorial-opengl/parse_shader_from_file",title:"Parse Shader from File",description:"\uc774\ubc88 \ubb38\uc11c\uc5d0\uc11c\ub294 \uac04\ub2e8\ud558\uac8c \ubcc4\ub3c4\uc758 \ud30c\uc77c\ub85c\ubd80\ud130 \uc170\uc774\ub354\ub97c \uc77d\uc5b4\uc624\ub294 \ubc29\uc2dd\uc73c\ub85c \ucf54\ub4dc\ub97c \uac1c\uc120\ud574 \ubcf4\ub3c4\ub85d \ud558\uaca0\uc2b5\ub2c8\ub2e4.",source:"@site/docs/tutorial-opengl/parse_shader_from_file.md",sourceDirName:"tutorial-opengl",slug:"/tutorial-opengl/parse_shader_from_file",permalink:"/GL_Practice_Document/tutorial-opengl/parse_shader_from_file",draft:!1,unlisted:!1,editUrl:"https://github.com/diskhkme/GL_Practice_Document/docs/tutorial-opengl/parse_shader_from_file.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Shader and Vertex Attribute",permalink:"/GL_Practice_Document/tutorial-opengl/shader_and_vertex_attribute"}},o={},c=[{value:"\uc170\uc774\ub354 \ud30c\uc77c \uc0dd\uc131",id:"\uc170\uc774\ub354-\ud30c\uc77c-\uc0dd\uc131",level:2},{value:"\ud30c\uc77c \uc785\ub825\uc744 \ud1b5\ud55c \uc170\uc774\ub354 \uc0ac\uc6a9",id:"\ud30c\uc77c-\uc785\ub825\uc744-\ud1b5\ud55c-\uc170\uc774\ub354-\uc0ac\uc6a9",level:2},{value:"\ub9c8\uce58\uba70",id:"\ub9c8\uce58\uba70",level:2},{value:"\uc5f0\uc2b5 \ubb38\uc81c",id:"\uc5f0\uc2b5-\ubb38\uc81c",level:2},{value:"\uad00\ub828 \ub9c1\ud06c",id:"\uad00\ub828-\ub9c1\ud06c",level:2}];function l(r){const e={a:"a",code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...r.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(e.h1,{id:"parse-shader-from-file",children:"Parse Shader from File"}),"\n",(0,d.jsx)(e.p,{children:"\uc774\ubc88 \ubb38\uc11c\uc5d0\uc11c\ub294 \uac04\ub2e8\ud558\uac8c \ubcc4\ub3c4\uc758 \ud30c\uc77c\ub85c\ubd80\ud130 \uc170\uc774\ub354\ub97c \uc77d\uc5b4\uc624\ub294 \ubc29\uc2dd\uc73c\ub85c \ucf54\ub4dc\ub97c \uac1c\uc120\ud574 \ubcf4\ub3c4\ub85d \ud558\uaca0\uc2b5\ub2c8\ub2e4."}),"\n",(0,d.jsx)(e.p,{children:"\uc9c0\ub09c \ubc88\uc5d0\ub3c4 \ubcf4\uc558\uc9c0\ub9cc \ubb38\uc790\uc5f4 \uadf8 \uc790\uccb4\ub85c \uc170\uc774\ub354\ub97c \ud558\ub4dc \ucf54\ub529\ud558\uba74 \uc77c\ubc18 \ubcf4\uae30\uc5d0\ub3c4 \uc88b\uc9c0 \uc54a\uace0, \uc2e4\uc81c \uc170\uc774\ub354\ub97c \uc791\uc131\ud558\ub294 \uc791\uc5c5\ub3c4 \uc0c1\ub2f9\ud788 \uc624\ub958\uac00 \ubc1c\uc0dd\ud558\uae30 \uc26c\uc6cc\uc9d1\ub2c8\ub2e4."}),"\n",(0,d.jsx)(e.p,{children:"\ub530\ub77c\uc11c \ubcc4\ub3c4\uc758 \ud30c\uc77c\uc5d0 \uc170\uc774\ub354 \ucf54\ub4dc\ub97c \uc791\uc131\ud558\uace0, \uadf8 \ud30c\uc77c\uc744 \uc77d\uc5b4\uc11c \ud65c\uc6a9\ud560 \uc218 \uc788\ub3c4\ub85d \ubc29\uc2dd\uc744 \ubc14\uafc0 \uac83\uc785\ub2c8\ub2e4."}),"\n",(0,d.jsx)(e.p,{children:"\uc774 \ud29c\ud1a0\ub9ac\uc5bc\uc5d0\uc11c\ub294 \uc774\ub7f0 \uc2dd\uc73c\ub85c \uadf8\ub798\ud53d\uc2a4 \uad00\ub828 \ub0b4\uc6a9\uacfc \ud568\uaed8 \ucf54\ub4dc\ub97c \uac1c\uc120\ud558\ub294 \uc791\uc5c5\uc774 \uc911\uac04\uc5d0 \ubcd1\ud589\ub420 \uc608\uc815\uc774\ub2c8 \ucc38\uace0 \ud558\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4."}),"\n",(0,d.jsx)(e.h2,{id:"\uc170\uc774\ub354-\ud30c\uc77c-\uc0dd\uc131",children:"\uc170\uc774\ub354 \ud30c\uc77c \uc0dd\uc131"}),"\n",(0,d.jsx)(e.p,{children:"\uba3c\uc800 \uae30\uc874\uc758 \uc170\uc774\ub354 \ucf54\ub4dc\ub97c \ubcc4\ub3c4\uc758 \ud30c\uc77c\ub85c \uc62e\uaca8 \ubcf4\ub3c4\ub85d \ud558\uaca0\uc2b5\ub2c8\ub2e4."}),"\n",(0,d.jsxs)(e.p,{children:["\uc170\uc774\ub354 \ud30c\uc77c\uc774 \uc5b4\ub514\uc5d0 \uc704\uce58\ud574 \uc788\uc744\uc9c0\ub97c \uc124\uacc4\ud558\ub294 \uac83\uc740 \ubcf8\uc778 \uc124\uacc4 \ub098\ub984\uc774\uc9c0\ub9cc, \uc800\ud76c\uc758 \uacbd\uc6b0 \ud504\ub85c\uc81d\ud2b8 \uacbd\ub85c\uc5d0 \uc0c1\ub300 \uacbd\ub85c\ub85c ",(0,d.jsx)(e.code,{children:"resources/shaders"})," \ud3f4\ub354\ub97c \ub9cc\ub4e4 \uac83\uc785\ub2c8\ub2e4."]}),"\n",(0,d.jsxs)(e.p,{children:["\uadf8\ub9ac\uace0 \uadf8 \uc548\uc5d0 \ud14c\uc2a4\ud2b8\ub97c \uc704\ud574 \uc9c0\ub09c\ubc88\uc5d0 \uc791\uc131\ud55c \uc170\uc774\ub354\ub97c ",(0,d.jsx)(e.code,{children:"basic.shader"})," \ud30c\uc77c\ub85c \ub9cc\ub4e4\uc5b4\uc11c \uc800\uc7a5\ud574 \ub458 \uac83\uc785\ub2c8\ub2e4."]}),"\n",(0,d.jsx)(e.p,{children:"\uc544\ub798\uc640 \uac19\uc774 \uacbd\ub85c\uac00 \uad6c\uc131\ub418\ub3c4\ub85d \ub9cc\ub4e4\uc5b4 \ubcf4\uc138\uc694."}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{children:"<\uc194\ub8e8\uc158 \uacbd\ub85c>\r\n\u251c\u2500\u2500 Dependencies\r\n\u2502   \u251c\u2500\u2500 GLFW\r\n\u2502   \u2502   \u251c\u2500\u2500 include\r\n|   \u2502   \u251c\u2500\u2500 lib-vc2022\r\n\u2502   \u2502   \u2514\u2500\u2500 LICENSE.md\r\n\u2502   \u2514\u2500\u2500 GLEW\r\n\u2502       \u251c\u2500\u2500 bin\r\n|       \u251c\u2500\u2500 include\r\n|       \u251c\u2500\u2500 lib\r\n\u2502       \u2514\u2500\u2500 LICENSE.txt\r\n\u251c\u2500\u2500 <\ud504\ub85c\uc81d\ud2b8\uc774\ub984>\r\n|   \u251c\u2500\u2500 resources               // <- \ud3f4\ub354 \uc0dd\uc131\r\n|   |   \u2514\u2500\u2500 shaders             // <- \ud3f4\ub354 \uc0dd\uc131\r\n|   |       \u2514\u2500\u2500 basic.shader    // <- \ud30c\uc77c \uc0dd\uc131\r\n|   \u2514\u2500\u2500 main.cpp \ub4f1\ub4f1\r\n\u2514\u2500\u2500 <\ud504\ub85c\uc81d\ud2b8\uc774\ub984>.sln\n"})}),"\n",(0,d.jsxs)(e.p,{children:[(0,d.jsx)(e.code,{children:"basic.shader"}),"\uc758 \ud30c\uc77c \ub0b4\uc6a9\uc740 \uc544\ub798\uc640 \uac19\uc2b5\ub2c8\ub2e4. \uc9c0\ub09c\ubc88\uacfc \ub0b4\uc6a9\uc740 \ub3d9\uc77c\ud558\uace0, \uc815\uc810 \uc170\uc774\ub354 \ucf54\ub4dc \uad6c\uac04\uacfc \ud504\ub798\uadf8\uba3c\ud2b8 \uc170\uc774\ub354 \ucf54\ub4dc\ub97c \ud55c \ud30c\uc77c\uc5d0 \uc791\uc131\ud560 \uac83\uc774\ubbc0\ub85c, \ucf54\ub4dc \uad6c\uac04\uc744 \uad6c\ubd84\ud560 \uc6a9\ub3c4\ub85c ",(0,d.jsx)(e.code,{children:"#shader vertex"}),", ",(0,d.jsx)(e.code,{children:"#shader fragment"}),"\ub9cc \ucd94\uac00 \ud558\uc600\uc2b5\ub2c8\ub2e4."]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-glsl",metastring:'title="resources/shaders/basic.shader"',children:"#shader vertex\r\n#version 330 core\r\n\r\nlayout(location = 0) in vec4 position; \r\n\r\nvoid main()\r\n{\r\n\tgl_Position = position; \r\n};\r\n\r\n#shader fragment\r\n#version 330 core\r\n\r\nlayout(location = 0) out vec4 color;\r\n\r\nvoid main()\r\n{\r\n\tcolor = vec4(1.0, 1.0 ,0.0, 1.0); \r\n};\n"})}),"\n",(0,d.jsx)(e.h2,{id:"\ud30c\uc77c-\uc785\ub825\uc744-\ud1b5\ud55c-\uc170\uc774\ub354-\uc0ac\uc6a9",children:"\ud30c\uc77c \uc785\ub825\uc744 \ud1b5\ud55c \uc170\uc774\ub354 \uc0ac\uc6a9"}),"\n",(0,d.jsxs)(e.p,{children:[(0,d.jsx)(e.code,{children:"main.cpp"}),"\uc5d0\uc11c \ubc14\ub00c\ub294 \ub0b4\uc6a9\uc740 \ub9ce\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \uc6b0\uc120 \ud30c\uc77c \uc785\ub825\uc5d0 \ud544\uc694\ud55c \ud5e4\ub354\ub4e4\uc744 \uba87 \uac00\uc9c0 \ucd94\uac00\ub85c include \ud574\uc90d\ub2c8\ub2e4. \uadf8\ub9ac\uace0 \uc815\uc810 \uc170\uc774\ub354\uc640 \ud504\ub798\uadf8\uba3c\ud2b8 \uc170\uc774\ub354\ub97c \ud55c \ub2e8\uc704\ub85c \uad00\ub9ac\ud558\uae30 \uc704\ud574 ",(0,d.jsx)(e.code,{children:"ShaderProgramSource"})," \uad6c\uc870\uccb4\ub97c \uc0c8\ub85c \uc815\uc758\ud558\uc600\uc2b5\ub2c8\ub2e4."]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-cpp",metastring:'title="main.cpp"',children:"...\r\n#include <iostream>\r\n//diff-add\r\n#include <fstream>\r\n//diff-add\r\n#include <string>\r\n//diff-add\r\n#include <sstream>\r\n\r\n//diff-add\r\nstruct ShaderProgramSource\r\n//diff-add\r\n{\r\n    //diff-add\r\n\tstd::string VertexSource;\r\n    //diff-add\r\n\tstd::string FragSource;\r\n    //diff-add\r\n};\r\n...\n"})}),"\n",(0,d.jsxs)(e.p,{children:["\uadf8\ub9ac\uace0 \uc170\uc774\ub354 \ucef4\ud30c\uc77c \ud568\uc218 \uc55e\uc5d0, \ud30c\uc77c\ub85c\ubd80\ud130 \uc170\uc774\ub354\uc758 \ub0b4\uc6a9\uc744 \uc77d\uc5b4\uc624\ub294 ",(0,d.jsx)(e.code,{children:"ParseShader()"})," \ud568\uc218\ub97c \ucd94\uac00 \uc815\uc758\ud574 \uc90d\ub2c8\ub2e4."]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-cpp",metastring:'title="main.cpp"',children:'\tstd::string FragSource;\r\n};\r\n\r\n//diff-add\r\nstatic ShaderProgramSource ParseShader(const std::string& filepath)\r\n//diff-add\r\n{\r\n    //diff-add\r\n\tstd::ifstream stream(filepath);\r\n    //diff-add\r\n    enum class ShaderType\r\n    //diff-add\r\n\t{\r\n        //diff-add\r\n\t\tNONE = -1, VERTEX = 0, FRAGMENT = 1\r\n        //diff-add\r\n\t};\r\n\r\n    //diff-add\r\n\tstd::string line;\r\n    //diff-add\r\n\tstd::stringstream ss[2];\r\n    //diff-add\r\n\tShaderType type = ShaderType::NONE;\r\n    //diff-add\r\n\twhile (getline(stream, line))\r\n    //diff-add\r\n\t{\r\n        //diff-add\r\n\t\tif (line.find("#shader") != std::string::npos)\r\n        //diff-add\r\n\t\t{\r\n            //diff-add\r\n\t\t\tif (line.find("vertex") != std::string::npos) //vertex \uc170\uc774\ub354 \uc139\uc158\r\n            //diff-add\r\n\t\t\t{\r\n                //diff-add\r\n\t\t\t\ttype = ShaderType::VERTEX;\r\n                //diff-add\r\n\t\t\t}\r\n            //diff-add\r\n\t\t\telse if (line.find("fragment") != std::string::npos) //fragment \uc170\uc774\ub354 \uc139\uc158\r\n            //diff-add\r\n\t\t\t{\r\n                //diff-add\r\n\t\t\t\ttype = ShaderType::FRAGMENT;\r\n                //diff-add\r\n\t\t\t}\r\n            //diff-add\r\n\t\t}\r\n        //diff-add\r\n\t\telse\r\n        //diff-add\r\n\t\t{\r\n            //diff-add\r\n\t\t\tss[(int)type] << line << \'\\n\'; //\ucf54\ub4dc\ub97c stringstream\uc5d0 \uc0bd\uc785\r\n            //diff-add\r\n\t\t}\r\n        //diff-add\r\n\t}\r\n    //diff-add\r\n    return ShaderProgramSource{ ss[0].str(), ss[1].str() };\r\n    //diff-add\r\n}\r\n\r\nstatic unsigned int CompileShader(unsigned int type, const std::string& source)\r\n...\n'})}),"\n",(0,d.jsxs)(e.p,{children:["C++\uc5d0 \uc775\uc219\ud558\uc9c0 \uc54a\uc73c\uc2dc\ub2e4\uba74 \uc774 \ubd80\ubd84\ub3c4 \uadf8\ub0e5 \ubaa8\ub974\uace0 \ub118\uc5b4\uac00\uc154\ub3c4 \ub429\ub2c8\ub2e4. (\uc6b0\ub9ac\uac00 \uc218\uc815\ud558\uc9c0 \uc54a\uc744 \ubd80\ubd84) API\ub97c \uc0ac\uc6a9\ud558\ub4ef\uc774 \uae30\ub2a5\ub9cc \uc54c\uace0 \uacc4\uc2dc\uba74 \ub418\ub294\ub370 \ud30c\uc77c\ub85c\ubd80\ud130 \uc815\uc810 \uc170\uc774\ub354 \ud30c\ud2b8\uc640 \ud504\ub798\uadf8\uba3c\ud2b8 \uc170\uc774\ub354 \ud30c\ud2b8\ub97c \uc77d\uc5b4\uc640 ",(0,d.jsx)(e.code,{children:"ShaderProgramSource"})," \uad6c\uc870\uccb4\uc5d0 \uac01\uac01 \uc18c\uc2a4\uac00 \ub2f4\uae34\ucc44\ub85c \ubc18\ud658\ud574\uc8fc\ub294 \ud568\uc218\uc785\ub2c8\ub2e4."]}),"\n",(0,d.jsxs)(e.p,{children:["\uc774\uc81c \uc544\ub798\ucabd\uc5d0\uc11c \uae30\uc874\uc5d0 ",(0,d.jsx)(e.code,{children:"std::string"})," \ubcc0\uc218\ub85c \ud558\ub4dc\ucf54\ub529\ud55c \uc170\uc774\ub354\ub294 \uc5c6\uc560\uace0, \ubc29\uae08 \ub9cc\ub4e0 ",(0,d.jsx)(e.code,{children:"ParseShader"}),"\ub97c \uc0ac\uc6a9\ud558\ub294 \ucf54\ub4dc\ub85c \ubc14\uafd4 \uc90d\ub2c8\ub2e4."]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-cpp",metastring:'title="main.cpp"',children:'glVertexAttribPointer(0, 2,\tGL_FLOAT, GL_FALSE, sizeof(float) * 2, 0); \r\n\r\n//diff-remove\r\nstd::string vertexShader =\r\n//diff-remove\r\n    "#version 330 core\\n"\r\n    //diff-remove\r\n    "layout(location = 0) in vec4 position;\\n" \r\n    //diff-remove\r\n    "void main()\\n"\r\n    //diff-remove\r\n    "{\\n"\r\n    //diff-remove\r\n    "\tgl_Position = position;\\n" \r\n    //diff-remove\r\n    "}\\n";\r\n\r\n//diff-remove\r\nstd::string fragShader =\r\n//diff-remove\r\n    "#version 330 core\\n"\r\n    //diff-remove\r\n    "layout(location = 0) out vec4 color;\\n" \r\n    //diff-remove\r\n    "void main()\\n"\r\n    //diff-remove\r\n    "{\\n"\r\n    //diff-remove\r\n    "\tcolor = vec4(1.0, 1.0 ,0.0, 1.0);\\n" \r\n    //diff-remove\r\n    "}\\n";\r\n\r\n//diff-add\r\nShaderProgramSource source = ParseShader("resources/shaders/basic.shader");\r\n//diff-add\r\nunsigned int shaderID = CreateShader(source.VertexSource, source.FragSource);\r\n//diff-remove\r\nunsigned int shader = CreateShader(vertexShader, fragShader);\r\nglUseProgram(shaderID);\n'})}),"\n",(0,d.jsx)(e.p,{children:"\uc774\ud6c4 \uc2e4\ud589\ud574\uc11c \ud655\uc778\ud574 \ubcf4\uc2dc\uba74 \uae30\uc874\uacfc \ub3d9\uc77c\ud558\uac8c \ub3d9\uc791\ud558\ub294 \uac83\uc744 \ubcf4\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,d.jsx)(e.h2,{id:"\ub9c8\uce58\uba70",children:"\ub9c8\uce58\uba70"}),"\n",(0,d.jsxs)(e.ol,{children:["\n",(0,d.jsxs)(e.li,{children:["Visual Studio\uc5d0\uc11c F5\ub97c \ub20c\ub7ec \uc2e4\ud589\ud588\uc744 \ub54c, \uc2e4\ud589 \ud30c\uc77c\uc758 \ub8e8\ud2b8 \uacbd\ub85c\ub294 \ud504\ub85c\uc81d\ud2b8 \ud30c\uc77c\uc774 \uc788\ub294 \uacbd\ub85c\uc785\ub2c8\ub2e4. \ub530\ub77c\uc11c \ubb38\uc81c \uc5c6\uc774 ",(0,d.jsx)(e.code,{children:"basic.shader"}),"\ud30c\uc77c\uc744 \uc77d\uc5b4\uc62c \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \uc194\ub8e8\uc158 \uacbd\ub85c\uc758 ",(0,d.jsx)(e.code,{children:"Build/x64Debug/Tutorial.exe"}),"\ub97c \uc2e4\ud589\ud574 \ubcf4\uc2dc\uba74 \uc0c9\uc0c1\uc774 \uc81c\ub300\ub85c \ud45c\uc2dc\ub418\uc9c0 \uc54a\ub294 \uac83\uc744 \ubcf4\uc2e4 \uc218 \uc788\ub294\ub370 \uc774\ub294 ",(0,d.jsx)(e.code,{children:"Build/x64Debug/resources/shaders/basic.shader"})," \uacbd\ub85c\uc5d0 \ud30c\uc77c\uc774 \uc5c6\uae30 \ub54c\ubb38\uc785\ub2c8\ub2e4. \uc774 \ubb38\uc81c\ub97c \ud574\uacb0\ud574 \uc8fc\uba74 ",(0,d.jsx)(e.code,{children:"Build/x64Debug/Tutorial.exe"}),"\ub97c \uc2e4\ud589\ud574\ub3c4 \uc62c\ubc14\ub85c \ub3d9\uc791\ud569\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,d.jsx)(e.h2,{id:"\uc5f0\uc2b5-\ubb38\uc81c",children:"\uc5f0\uc2b5 \ubb38\uc81c"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"\uc5c6\uc74c"}),"\n"]}),"\n",(0,d.jsx)(e.hr,{}),"\n",(0,d.jsx)(e.h2,{id:"\uad00\ub828-\ub9c1\ud06c",children:"\uad00\ub828 \ub9c1\ud06c"}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(6199).A+"",children:"\ucf54\ub4dc"})}),"\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(8476).A+"",children:"\uc170\uc774\ub354"})}),"\n"]})]})}function f(r={}){const{wrapper:e}={...(0,i.R)(),...r.components};return e?(0,d.jsx)(e,{...r,children:(0,d.jsx)(l,{...r})}):l(r)}},8476:(r,e,n)=>{n.d(e,{A:()=>d});const d=n.p+"assets/files/basic-674716dc03ea048d8e8bbed29e8916f1.shader"},6199:(r,e,n)=>{n.d(e,{A:()=>d});const d=n.p+"assets/files/main_end-006973248f3a607915be80ef77e806fa.cpp"},8453:(r,e,n)=>{n.d(e,{R:()=>s,x:()=>a});var d=n(6540);const i={},t=d.createContext(i);function s(r){const e=d.useContext(t);return d.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function a(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(i):r.components||i:s(r.components),d.createElement(t.Provider,{value:e},r.children)}}}]);