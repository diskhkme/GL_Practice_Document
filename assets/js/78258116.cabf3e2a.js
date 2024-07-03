"use strict";(self.webpackChunkgl_practice_document=self.webpackChunkgl_practice_document||[]).push([[761],{3899:(r,e,n)=>{n.r(e),n.d(e,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>d,metadata:()=>i,toc:()=>l});var t=n(4848),s=n(8453);const d={sidebar_position:10},a="Shader and Renderer Abstraction",i={id:"tutorial-opengl/shader_and_renderer",title:"Shader and Renderer Abstraction",description:"\uc774\ubc88 \uc7a5\uc5d0\uc11c\ub294 \uc170\uc774\ub354\uc640 \ub80c\ub354\ub7ec \ubd80\ubd84\uc744 \ucd94\uc0c1\ud654 \ud574 \ubcf4\ub3c4\ub85d \ud558\uaca0\uc2b5\ub2c8\ub2e4.",source:"@site/docs/tutorial-opengl/10_shader_and_renderer.md",sourceDirName:"tutorial-opengl",slug:"/tutorial-opengl/shader_and_renderer",permalink:"/GL_Practice_Document/tutorial-opengl/shader_and_renderer",draft:!1,unlisted:!1,editUrl:"https://github.com/diskhkme/GL_Practice_Document/docs/tutorial-opengl/10_shader_and_renderer.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Vertex Array and Buffer Layout Abstraction",permalink:"/GL_Practice_Document/tutorial-opengl/vertex_array_and_layout"}},o={},l=[{value:"Shader Class",id:"shader-class",level:2},{value:"Renderer Class",id:"renderer-class",level:2},{value:"\ub9c8\uce58\uba70",id:"\ub9c8\uce58\uba70",level:2},{value:"\uc5f0\uc2b5 \ubb38\uc81c",id:"\uc5f0\uc2b5-\ubb38\uc81c",level:2},{value:"\uad00\ub828 \ub9c1\ud06c",id:"\uad00\ub828-\ub9c1\ud06c",level:2}];function c(r){const e={a:"a",code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...r.components},{Details:d}=e;return d||function(r,e){throw new Error("Expected "+(e?"component":"object")+" `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"shader-and-renderer-abstraction",children:"Shader and Renderer Abstraction"}),"\n",(0,t.jsx)(e.p,{children:"\uc774\ubc88 \uc7a5\uc5d0\uc11c\ub294 \uc170\uc774\ub354\uc640 \ub80c\ub354\ub7ec \ubd80\ubd84\uc744 \ucd94\uc0c1\ud654 \ud574 \ubcf4\ub3c4\ub85d \ud558\uaca0\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsxs)(e.p,{children:["\uba54\uc778\ud568\uc218 \uc704\ucabd\uc5d0 \uae38\uac8c \ub4e4\uc5b4\uac00\uc788\ub294 \uc170\uc774\ub354 \ucef4\ud30c\uc77c/\ub9c1\ud0b9 \ubd80\ubd84\ub3c4 \ud074\ub798\uc2a4 \uc548\uc73c\ub85c \uc9d1\uc5b4\ub123\uc744 \uac83\uc774\uace0, \uc170\uc774\ub354\uc5d0 \uc720\ub2c8\ud3fc \uac12\uc744 \ub118\uaca8\uc8fc\ub294 \uae30\ub2a5\ub3c4 \ud074\ub798\uc2a4 \uba54\uc18c\ub4dc\ud654 \ud574\uc904 \uac83\uc785\ub2c8\ub2e4. \uc774 \ubd80\ubd84\uae4c\uc9c0 \uac70\uce58\uace0 \ub098\uba74 ",(0,t.jsx)(e.code,{children:"main.cpp"}),"\uac00 \uc0c1\ub2f9\ud788 \uae54\ub054\ud574 \uc9c8 \uac83\uc785\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(e.p,{children:"\ub80c\ub354\ub7ec\ub294 \uac04\ub2e8\ud558\uac8c \ud604\uc7ac \uadf8\ub9ac\uae30\ub97c \uc218\ud589\ud560 \uac1d\uccb4\ub4e4\uc744 \ubc14\uc778\ub529\ud558\uace0 \uadf8\ub9ac\ub294 \uc5ed\ud560\ub4e4 \uc218\ud589\ud558\ub3c4\ub85d \uad6c\ud604\ud574 \ubcf4\uaca0\uc2b5\ub2c8\ub2e4. \uc774 \ubd80\ubd84\uc740 \uc5b4\ub835\uc9c0 \uc54a\uc744 \uac83\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsx)(e.h2,{id:"shader-class",children:"Shader Class"}),"\n",(0,t.jsx)(e.p,{children:"\uc55e\uc11c \ub9d0\uc500\ub4dc\ub838\ub4ef\uc774 \uc170\uc774\ub354\uc758 \uc5ed\ud560\uc740 \ud06c\uac8c \ub450 \uac00\uc9c0\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsxs)(e.ol,{children:["\n",(0,t.jsx)(e.li,{children:"\uc170\uc774\ub354 \ucf54\ub4dc\ub97c \uc785\ub825\ubc1b\uc544 \ud504\ub85c\uadf8\ub7a8\uc73c\ub85c \ucef4\ud30c\uc77c/\ub9c1\ud0b9"}),"\n",(0,t.jsx)(e.li,{children:"\uc170\uc774\ub354 \ud504\ub85c\uadf8\ub7a8\uc758 \uc720\ub2c8\ud3fc \uc785\ub825"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"\uc544\ub798 \ud074\ub798\uc2a4 \uc815\uc758\ub97c \ubcf4\uace0 \uc774 \uc5ed\ud560\uc774 \uc5b4\ub5a4 \uae30\ub2a5\ub4e4\uc5d0 \ub4e4\uc5b4 \uc788\ub294\uc9c0 \ubcf4\ub3c4\ub85d \ud569\uc2dc\ub2e4."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-cpp",metastring:'title="Shader.h"',children:"#pragma once\r\n\r\n#include <iostream>\r\n#include <fstream>\r\n#include <string>\r\n#include <sstream>\r\n\r\nstruct ShaderProgramSource\r\n{\r\n\tstd::string VertexSource;\r\n\tstd::string FragSource;\r\n};\r\n\r\nclass Shader\r\n{\r\nprivate:\r\n\tstd::string filepath;\r\n\tunsigned int shader;\r\npublic:\r\n\tShader(const std::string& filepath);\r\n\t~Shader();\r\n\r\n\tvoid Bind() const;\r\n\tvoid Unbind() const;\r\n\r\n\t//Set Uniforms\r\n\tvoid SetUniform4f(const std::string& name, float v0, float v1, float v2, float v3);\r\n\tvoid SetUniform1f(const std::string& name, float value);\r\nprivate:\r\n\tShaderProgramSource ParseShader(const std::string& filepath);\r\n\tunsigned int CompileShader(unsigned int type, const std::string& source);\r\n\tunsigned int CreateShader(const std::string& vertexShader, const std::string& fragShader);\r\n\r\n\tint GetUniformLocation(const std::string& name);\r\n};\n"})}),"\n",(0,t.jsxs)(e.p,{children:["\uc170\uc774\ub354 \ud504\ub85c\uadf8\ub7a8\uc774 \uc791\uc131\ub418\uc5b4 \uc788\ub294 \ud30c\uc77c \uacbd\ub85c\ub97c \uc785\ub825\uc73c\ub85c \ubc1b\uc544 \uc0dd\uc131\ub420 \uac83\uc774\uace0, \uadf8 \uacfc\uc815\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 ",(0,t.jsx)(e.code,{children:"ParseShader()"})," \ub4f1\uc758 \uba54\uc18c\ub4dc\ub294 \uc678\ubd80\uc5d0\uc11c \ud638\ucd9c\ud560 \ud544\uc694\uac00 \uc5c6\uae30 \ub54c\ubb38\uc5d0 private\uc73c\ub85c \uc120\uc5b8\ud558\uc600\uc2b5\ub2c8\ub2e4. \ubc18\uba74 \uc170\uc774\ub354\uc758 \uc720\ub2c8\ud3fc\uc744 \uc785\ub825\ud558\ub294 \uae30\ub2a5\uc740 \uc678\ubd80\uc5d0\uc11c \ud638\ucd9c\uc774 \ud544\uc694\ud558\uc5ec public\uc73c\ub85c \uc120\uc5b8\ud558\uc600\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(e.p,{children:"\uc544\ub798\ub294 \uc170\uc774\ub354 \ud074\ub798\uc2a4\uc758 \uad6c\ud604\uc785\ub2c8\ub2e4."}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-cpp",metastring:'title="Shader.cpp"',children:'#include "Shader.h"\r\n#include <GL/glew.h>\r\n\r\nShader::Shader(const std::string& filepath)\r\n\t:filepath{ filepath }, shader{ 0 }\r\n{\r\n\tShaderProgramSource source = ParseShader(filepath);\r\n\tshader = CreateShader(source.VertexSource, source.FragSource);\r\n}\r\n\r\nShader::~Shader()\r\n{\r\n\tglDeleteProgram(shader);\r\n}\r\n\r\nShaderProgramSource Shader::ParseShader(const std::string& filepath)\r\n{\r\n\tstd::ifstream stream(filepath);\r\n\tenum class ShaderType\r\n\t{\r\n\t\tNONE = -1, VERTEX = 0, FRAGMENT = 1\r\n\t};\r\n\r\n\tstd::string line;\r\n\tstd::stringstream ss[2];\r\n\tShaderType type = ShaderType::NONE;\r\n\twhile (getline(stream, line))\r\n\t{\r\n\t\tif (line.find("#shader") != std::string::npos)\r\n\t\t{\r\n\t\t\tif (line.find("vertex") != std::string::npos) //vertex \uc170\uc774\ub354 \uc139\uc158\r\n\t\t\t{\r\n\t\t\t\ttype = ShaderType::VERTEX;\r\n\t\t\t}\r\n\t\t\telse if (line.find("fragment") != std::string::npos) //fragment \uc170\uc774\ub354 \uc139\uc158\r\n\t\t\t{\r\n\t\t\t\ttype = ShaderType::FRAGMENT;\r\n\t\t\t}\r\n\t\t}\r\n\t\telse\r\n\t\t{\r\n\t\t\tss[(int)type] << line << \'\\n\'; //\ucf54\ub4dc\ub97c stringstream\uc5d0 \uc0bd\uc785\r\n\t\t}\r\n\t}\r\n\treturn ShaderProgramSource{ ss[0].str(), ss[1].str() };\r\n}\r\n\r\n\r\nunsigned int Shader::CompileShader(unsigned int type, const std::string& source)\r\n{\r\n\tunsigned int id = glCreateShader(type);\r\n\tconst char* src = source.c_str();\r\n\tglShaderSource(id, 1, &src, nullptr);\r\n\tglCompileShader(id);\r\n\r\n\tint result;\r\n\tglGetShaderiv(id, GL_COMPILE_STATUS, &result);\r\n\tif (result == GL_FALSE) //\ucef4\ud30c\uc77c \uc2e4\ud328\r\n\t{\r\n\t\tint length;\r\n\t\tglGetShaderiv(id, GL_INFO_LOG_LENGTH, &length);\r\n\t\tchar* message = (char*)alloca(length * sizeof(char));\r\n\t\tglGetShaderInfoLog(id, length, &length, message);\r\n\t\tstd::cout << "\uc170\uc774\ub354 \ucef4\ud30c\uc77c \uc2e4\ud328! " << (type == GL_VERTEX_SHADER ? "vertex" : "fragment") << std::endl;\r\n\t\tstd::cout << message << std::endl;\r\n\t\tglDeleteShader(id);\r\n\t\treturn 0;\r\n\t}\r\n\r\n\treturn id;\r\n}\r\n\r\nunsigned int Shader::CreateShader(const std::string& vertexShader, const std::string& fragShader)\r\n{\r\n\tunsigned int programID = glCreateProgram(); //\uc170\uc774\ub354 \ud504\ub85c\uadf8\ub7a8 \uac1d\uccb4 \uc0dd\uc131(int\uc5d0 \uc800\uc7a5\ub418\ub294 \uac83\uc740 id)\r\n\tunsigned int vs = CompileShader(GL_VERTEX_SHADER, vertexShader);\r\n\tunsigned int fs = CompileShader(GL_FRAGMENT_SHADER, fragShader);\r\n\r\n\t//\ucef4\ud30c\uc77c\ub41c \uc170\uc774\ub354 \ucf54\ub4dc\ub97c program\uc5d0 \ucd94\uac00\ud558\uace0 \ub9c1\ud06c\r\n\tglAttachShader(programID, vs);\r\n\tglAttachShader(programID, fs);\r\n\tglLinkProgram(programID);\r\n\tglValidateProgram(programID);\r\n\r\n\t//\uc170\uc774\ub354 \ud504\ub85c\uadf8\ub7a8\uc744 \uc0dd\uc131\ud588\uc73c\ubbc0\ub85c vs, fs \uac1c\ubcc4 \ud504\ub85c\uadf8\ub7a8\uc740 \ub354\uc774\uc0c1 \ud544\uc694 \uc5c6\uc74c\r\n\tglDeleteShader(vs);\r\n\tglDeleteShader(fs);\r\n\r\n\treturn programID;\r\n}\r\n\r\nvoid Shader::Bind() const\r\n{\r\n\tglUseProgram(shader);\r\n}\r\n\r\nvoid Shader::Unbind() const\r\n{\r\n\tglUseProgram(0);\r\n}\r\n\r\nvoid Shader::SetUniform4f(const std::string& name, float v0, float v1, float v2, float v3)\r\n{\r\n\tglUniform4f(GetUniformLocation(name), v0, v1, v2, v3);\r\n}\r\n\r\nvoid Shader::SetUniform1f(const std::string& name, float value)\r\n{\r\n\tglUniform1f(GetUniformLocation(name), value);\r\n}\r\n\r\nint Shader::GetUniformLocation(const std::string& name)\r\n{\r\n\tint location = glGetUniformLocation(shader, name.c_str());\r\n\tif (location == -1)\r\n\t{\r\n\t\tstd::cout << "Warning: unform \'" << name << "\' doesn\'t exist!\\n";\r\n\t}\r\n\treturn location;\r\n}\n'})}),"\n",(0,t.jsxs)(e.p,{children:["\ucf54\ub4dc\ub294 \uae38\uc9c0\ub9cc, \uc704\ucabd\uc758 ",(0,t.jsx)(e.code,{children:"ParseShader()"}),", ",(0,t.jsx)(e.code,{children:"CompileShader()"}),", ",(0,t.jsx)(e.code,{children:"CreateShader()"})," \ubaa8\ub450 \uae30\uc874 \uba54\uc778\ud568\uc218 \uc704\ucabd\uc5d0 static \ud568\uc218\ub85c \uc120\uc5b8\ud574 \ub454 \ucf54\ub4dc\ub97c \uac00\uc838\uc640 \ubd99\uc778 \uac83 \ubfd0\uc785\ub2c8\ub2e4. \uc774\ubbf8 \ub2e4 \uc124\uba85\ub4dc\ub9b0 \ub0b4\uc6a9\uc774\ub2c8 \uc124\uba85 \ub4dc\ub9b4 \uac83\uc774 \uc5c6\ub124\uc694."]}),"\n",(0,t.jsxs)(e.p,{children:["\uc544\ub798\ub3c4 \ub9c8\ucc2c\uac00\uc9c0\uc785\ub2c8\ub2e4. ",(0,t.jsx)(e.code,{children:"GetUniformLocation()"}),"\uc73c\ub85c \uc170\uc774\ub354 \ub0b4\uc758 \uc720\ub2c8\ud3fc \uc704\uce58\ub97c \ucc3e\ub294\uac83\ub3c4 \ub0b4\ubd80\uc801\uc73c\ub85c ",(0,t.jsx)(e.code,{children:"glGetUniformLocation()"})," \ud638\ucd9c\uc744 \ud1b5\ud574\uc11c \uc218\ud589\ud558\ub294 \uac83\uc774 \ub3d9\uc77c\ud558\uba70, \ub300\uc2e0 ",(0,t.jsx)(e.code,{children:"shader"})," \ud578\ub4e4 \uc790\uccb4\ub97c \uba64\ubc84\ub85c \uac00\uc9c0\uace0 \uc788\uae30 \ub584\ubb38\uc5d0 \ubcc4\ub3c4\uc758 \ub9e4\uac1c\ubcc0\uc218\ub85c \ub118\uaca8\uc904 \ud544\uc694\uac00 \uc5c6\uc5b4\uc84c\uc2b5\ub2c8\ub2e4. \uc720\ub2c8\ud3fc \uc704\uce58\ub97c \ucc3e\uc9c0 \ubabb\ud55c \uacbd\uc6b0 \uacbd\uace0 \uba54\uc2dc\uc9c0\ub97c \ub744\uc6cc \uc8fc\ub294 \uc18c\uc18c\ud55c \uae30\ub2a5\uc744 \ucd94\uac00\ud558\uc600\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsxs)(e.p,{children:["\ucd94\uac00\uc801\uc73c\ub85c ",(0,t.jsx)(e.code,{children:"SetUniformXX()"}),"\ub97c \ud638\ucd9c\ud560 \ub54c \uc720\ub2c8\ud3fc\uc758 \uc774\ub984\uc744 \uac19\uc774 \ub118\uaca8\uc8fc\uba74 \ub0b4\ubd80\uc801\uc73c\ub85c location\uc744 \uc54c\uc544\uc11c \ucc3e\uc544\uc11c \uac12\uc744 \uc9d1\uc5b4\ub123\ub3c4\ub85d \uad6c\ud604\ud558\uc600\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsxs)(d,{children:[(0,t.jsx)("summary",{children:"\uc131\ub2a5 \uc774\uc288"}),(0,t.jsxs)(e.p,{children:["\uc989, \ud604\uc7ac\ub294 ",(0,t.jsx)(e.code,{children:"glGetUniformLocation()"}),"\uc744 \uc720\ub2c8\ud3fc \uac12\uc744 \ud560\ub2f9\ud560 \ub54c\ub9c8\ub2e4 \uacc4\uc18d \ud638\ucd9c\ud55c\ub2e4\ub294 \uc758\ubbf8\uc774\uace0, \ud604\uc7ac \ucf54\ub4dc\uc5d0\uc11c\ub294 \ub9e4 \ud504\ub808\uc784\ub9c8\ub2e4 \uc774\ub7ec\ud55c \uc77c\uc774 \ubc1c\uc0dd\ud558\uac8c \ub429\ub2c8\ub2e4. \uae30\ubcf8\uc801\uc73c\ub85c ",(0,t.jsx)(e.code,{children:"glGetUniformLocation()"}),"\uc740 \ubb38\uc790\uc5f4 \ud0d0\uc0c9\uc73c\ub85c \ub3d9\uc791\ud558\uae30 \ub54c\ubb38\uc5d0 \uc131\ub2a5\uc5d0 \uc88b\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."]}),(0,t.jsxs)(e.p,{children:["\uccab \ubc88\uc9f8 \ucd5c\uc801\ud654 \ubc29\ubc95\uc73c\ub85c\ub294 ",(0,t.jsx)(e.code,{children:"glGetUniformLocation()"}),"\uc744 \ub178\ucd9c\ud558\uc5ec \uae30\uc874\ucc98\ub7fc location\uc744 \ubbf8\ub9ac \uc800\uc7a5\ud574 \ub193\uace0 \uc0ac\uc6a9\ud558\ub294 \ubc29\ubc95\uc774 \uc788\uc2b5\ub2c8\ub2e4. \ub2e8 \uc774\ub7ec\ud55c \uacbd\uc6b0\uc5d0\ub294 \ub0b4\uac00 location \ud578\ub4e4\uc744 \ubcc4\ub3c4\ub85c \uad00\ub9ac\ud574\uc57c \ud558\uae30 \ub54c\ubb38\uc5d0 \uc88b\uc9c0 \uc54a\uc740 \uc124\uacc4\uc785\ub2c8\ub2e4."]}),(0,t.jsx)(e.p,{children:"\ub450 \ubc88\uc9f8 \ubc29\ubc95\uc73c\ub85c\ub294 hash table\uc744 \ub9cc\ub4e4\uc5b4 \uce90\uc26c\ub85c \uc0ac\uc6a9\ud558\ub294 \ubc29\ubc95\uc785\ub2c8\ub2e4. name(string)-location(int) \uc30d\uc744 \uc800\uc7a5\ud574 \ub450\uba74 name \ucffc\ub9ac\uc5d0 \ub300\ud574 \ube60\ub974\uac8c location\uc744 \ubc18\ud658\ud574 \uc904 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),(0,t.jsx)(e.p,{children:"\uc9c0\uae08 \ub2f9\uc7a5\uc740 \ubd80\uac00\uc801\uc778 \ub0b4\uc6a9\uc744 \ucd5c\uc18c\ud654 \ud558\uae30 \uc704\ud574 \uc9d1\uc5b4\ub123\uc9c0 \uc54a\uc558\ub294\ub370, \ub098\uc911\uc5d0 \ubb38\uc81c\uac00 \ub41c\ub2e4\uba74 \ub450 \ubc88\uc9f8 \ubc29\ubc95\uc744 \ucd94\uac00\ud558\ub3c4\ub85d \ud558\uaca0\uc2b5\ub2c8\ub2e4. \uc774 \uc2dc\uc810\uc5d0 \uc9c1\uc811 \uad6c\ud604\ud574 \ubcf4\uc2dc\uba74 \ub354 \uc88b\uace0\uc694!"})]}),"\n",(0,t.jsxs)(e.p,{children:["\uc774\uc81c \uc170\uc774\ub354 \ud074\ub798\uc2a4\ub97c \uc0ac\uc6a9\ud558\ub294 \ubd80\ubd84\uc744 \ubcf4\uba74 \uc544\ub798\uc640 \uac19\uc2b5\ub2c8\ub2e4. \uc218\uc815\ub41c \ubd80\ubd84\uc774 \uc5ec\uae30\uc800\uae30 \ud769\uc5b4\uc838 \uc788\uc5b4\uc11c \uadf8\ub807\uc9c0 \ub0b4\uc6a9\uc0c1 \uc5b4\ub824\uc6b4 \ubd80\ubd84\uc740 \uc5c6\uc73c\uc2e4 \uac81\ub2c8\ub2e4. ",(0,t.jsx)(e.code,{children:"Shader"})," \ud074\ub798\uc2a4\uc758 \uc18c\uba78\uc790\uc5d0 ",(0,t.jsx)(e.code,{children:"glDeleteProgram()"}),"\ub3c4 \uc54c\uc544\uc11c \ud638\ucd9c\ud558\uac8c \ud574 \ub450\uc5c8\uc73c\ub2c8 \ub098\uc911\uc5d0 \uba85\uc2dc\uc801\uc73c\ub85c \ub530\ub85c \ud638\ucd9c\ud560 \ud544\uc694\ub3c4 \uc5c6\uc5b4\uc84c\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-cpp",metastring:'title="main.cpp"',children:'#include "VertexBuffer.h"\r\n#include "IndexBuffer.h"\r\n#include "VertexBufferLayout.h"\r\n#include "VertexArray.h"\r\n//diff-add\r\n#include "Shader.h"\r\n\r\n//diff-remove\r\nstruct ShaderProgramSource {...};\r\n//diff-remove\r\nstatic ShaderProgramSource ParseShader(const std::string& filepath){...}\r\n//diff-remove\r\nstatic unsigned int CompileShader(unsigned int type, const std::string& source){...}\r\n//diff-remove\r\nstatic unsigned int CreateShader(const std::string& vertexShader, const std::string& fragShader)\r\n\r\nint main(void)\r\n{\r\n...\r\n    //diff-remove\r\n    ShaderProgramSource source = ParseShader("resources/shaders/basic.shader");\r\n    //diff-remove\r\n    unsigned int shaderID = CreateShader(source.VertexSource, source.FragSource);\r\n    //diff-remove\r\n    int square_offset_location = glGetUniformLocation(shaderID, "u_offset");\r\n    //diff-add\r\n    Shader squareShader{ "resources/shaders/basic.shader" };\r\n    ...\r\n\r\n    while (!glfwWindowShouldClose(window)) \r\n    {\r\n        glClear(GL_COLOR_BUFFER_BIT);\r\n\r\n        //--- \uc0ac\uac01\ud615 \uadf8\ub9ac\uae30\r\n        squareVA.Bind();\r\n\r\n        //diff-remove\r\n        glUseProgram(shaderID);\r\n        //diff-add \r\n        squareShader.Bind();\r\n        float square_offset = 0.7f;\r\n        //diff-remove\r\n        glUniform4f(square_offset_location, square_offset, 0.0f, 0.0f, 0.0f);\r\n        //diff-add\r\n        squareShader.SetUniform4f("u_offset", square_offset, 0.0f, 0.0f, 0.0f);\r\n\r\n        glDrawElements(GL_TRIANGLES, 9,\tGL_UNSIGNED_INT, nullptr);\r\n        ...\r\n    }\r\n    //diff-remove\r\n    glDeleteProgram(shaderID);\r\n    ...\r\n\n'})}),"\n",(0,t.jsx)(e.p,{children:"\ubaa8\ub450 \uc801\uc9c0\ub294 \uc54a\uc558\uc9c0\ub9cc, \uc0bc\uac01\ud615 \uadf8\ub9ac\uae30\uc5d0 \ud574\ub2f9\ud558\ub294 \ubd80\ubd84\uae4c\uc9c0 \uc801\uc815\ud788 \uc218\uc815\ud574 \uc8fc\uc2dc\uba74 \uc774\uc804\uacfc \ub3d9\uc77c\ud55c \uacb0\uacfc\ub97c \ubcf4\uc2e4 \uc218 \uc788\uc744\uac81\ub2c8\ub2e4."}),"\n",(0,t.jsx)(e.h2,{id:"renderer-class",children:"Renderer Class"}),"\n",(0,t.jsxs)(e.p,{children:["\ub2e4\uc74c\uc740 ",(0,t.jsx)(e.code,{children:"Renderer"}),' \ud074\ub798\uc2a4\uc785\ub2c8\ub2e4. \uc774 \ud074\ub798\uc2a4\uac00 \ub2f4\ub2f9\ud560 \ucf54\ub4dc\ub294 \uc544\ub798 \ub450\uc904\uc785\ub2c8\ub2e4. \uc989 "\ud654\uba74 \uc9c0\uc6b0\uae30"\uc640 "\ud654\uba74 \uadf8\ub9ac\uae30" \uc785\ub2c8\ub2e4.']}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-cpp",children:"glClear(GL_COLOR_BUFFER_BIT);\r\nglDrawElements(GL_TRIANGLES, 9,\tGL_UNSIGNED_INT, nullptr);\n"})}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"Renderer"})," \ud074\ub798\uc2a4 \uc124\uacc4\ub294 \uc544\ub798\uc640 \uac19\uc2b5\ub2c8\ub2e4. ",(0,t.jsx)(e.code,{children:"Clear()"}),"\uc640 ",(0,t.jsx)(e.code,{children:"Draw()"}),"\ub97c \uac00\uc9c0\uace0 \uc788\uace0 \uac01\uac01 \uc5b4\ub5a4 \uc5ed\ud560\uc744 \ud560\uc9c0\ub294 \uba85\ud655\ud558\uc8e0. \uc8fc\uc758\ud574\uc11c \ubcf4\uc154\uc57c \ud560 \ubd80\ubd84\uc740 VA, IB, Shader\ub97c \uc778\uc790\ub85c \ub118\uae30\uace0 \uc788\ub2e4\ub294 \ub73b\uc785\ub2c8\ub2e4. \uc989, \ubb3c\uccb4\ub97c \ud558\ub098 \uadf8\ub9b4 \ub54c \ud544\uc694\ud55c \ubaa8\ub4e0 \uc815\ubcf4\ub97c \uac19\uc774 \ub118\uaca8\uc8fc\uace0 \uc788\ub294 \uac83\uc785\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-cpp",metastring:'title="Renderer.h"',children:'#pragma once\r\n\r\n#include "Shader.h"\r\n#include "VertexArray.h"\r\n#include "IndexBuffer.h"\r\n\r\nclass Renderer\r\n{\r\npublic:\r\n\tvoid Draw(const VertexArray& va, const IndexBuffer& ib, const Shader& shader) const;\r\n\tvoid Clear() const;\r\n};\n'})}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"Renderer"})," \ud074\ub798\uc2a4 \uad6c\ud604\uc740 \uc544\ub798\uc640 \uac19\uc2b5\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-cpp",metastring:'title="Renderer.cpp"',children:'#include "Renderer.h"\r\n#include <GL/glew.h>\r\n\r\nvoid Renderer::Draw(const VertexArray& va, const IndexBuffer& ib, const Shader& shader) const\r\n{\r\n\tshader.Bind();\r\n\tva.Bind();\r\n\tib.Bind();\r\n\r\n\tglDrawElements(GL_TRIANGLES, ib.GetCount(), GL_UNSIGNED_INT, nullptr);\r\n}\r\n\r\nvoid Renderer::Clear() const\r\n{\r\n\tglClear(GL_COLOR_BUFFER_BIT);\r\n}\n'})}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"main.cpp"}),"\uc5d0\uc11c\ub294 \uc544\ub798\uc640 \uac19\uc774 \uc0ac\uc6a9\ud569\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-cpp",metastring:'title="main.cpp"',children:'...\r\n#include "VertexArray.h"\r\n#include "Shader.h"\r\n//diff-add\r\n#include "Renderer.h"\r\n\r\n...\r\n//diff-add\r\nRenderer renderer;\r\n\r\n// Rendering Loop\r\nwhile (!glfwWindowShouldClose(window)) \r\n{\r\n    //diff-remove\r\n    glClear(GL_COLOR_BUFFER_BIT);\r\n    //diff-add\r\n    renderer.Clear();\r\n\r\n    //--- \uc0ac\uac01\ud615 \uadf8\ub9ac\uae30\r\n    squareVA.Bind();\r\n\r\n    //glUseProgram(shaderID);\r\n    squareShader.Bind();\r\n    float square_offset = 0.7f;\r\n    //glUniform4f(square_offset_location, square_offset, 0.0f, 0.0f, 0.0f);\r\n    squareShader.SetUniform4f("u_offset", square_offset, 0.0f, 0.0f, 0.0f);\r\n\r\n    //diff-remove\r\n    glDrawElements(GL_TRIANGLES, 9,\tGL_UNSIGNED_INT, nullptr);\r\n    //diff-add\r\n    renderer.Draw(squareVA, squareIB, squareShader);\r\n\r\n    squareVA.Unbind();\r\n\r\n    ...\n'})}),"\n",(0,t.jsxs)(e.p,{children:["\uc774\uc0c1\uc785\ub2c8\ub2e4. \uc0bc\uac01\ud615 \uad00\ub828 \ucf54\ub4dc\ub294 \uc2a4\uc2a4\ub85c \uc218\uc815\ud574 \ubcf4\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4. \uc774\ub85c\uc368 ",(0,t.jsx)(e.code,{children:"main.cpp"})," \ud30c\uc77c\uc774 \uaf64\ub098 \uc9e7\uc544\uc84c\uace0, \uc774\ub984\uc744 \uc798 \uc9c0\uc5b4\ub194\uc11c \uc5b4\ub5a4 \ubd80\ubd84\uc774 \uc5b4\ub5a4 \uc5ed\ud560\uc744 \ud558\ub294\uc9c0 \uc27d\uac8c \ud30c\uc545\uc774 \uac00\ub2a5\ud558\uc2e4\uac81\ub2c8\ub2e4."]}),"\n",(0,t.jsxs)(e.p,{children:["\uc774\uc81c ",(0,t.jsx)(e.code,{children:"main()"})," \uc548\uc5d0 ",(0,t.jsx)(e.code,{children:"gl"}),"\ub85c \uc2dc\uc791\ud558\ub294 OpenGL API \ud638\ucd9c \ucf54\ub4dc\uac00 \uc544\ub798 \ud55c \uc904\ubc16\uc5d0 \ub0a8\uc9c0 \uc54a\uc558\ub2e4\ub294 \uac83\uc785\ub2c8\ub2e4. \ub098\uba38\uc9c0\ub294 \ubaa8\ub450 \ud074\ub798\uc2a4\uac00 \ud638\ucd9c\uc744 \ub2f4\ub2f9\ud569\ub2c8\ub2e4. \uadf8\ub9ac\uace0 \uc544\ub798 \ucf54\ub4dc\ub3c4 \uace7 \ub2e4\ub978 \ud074\ub798\uc2a4 \uc548\uc73c\ub85c \ub4e4\uc5b4\uac08 \uc608\uc815\uc785\ub2c8\ub2e4."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-cpp",children:"glClearColor(0.25, 0.25, 0.7, 1);\n"})}),"\n",(0,t.jsx)(e.h2,{id:"\ub9c8\uce58\uba70",children:"\ub9c8\uce58\uba70"}),"\n",(0,t.jsx)(e.p,{children:"\uc774\ubc88 \ubb38\uc11c\uae4c\uc9c0 \ud3ec\ud568\ud574\uc11c \uc9c0\ub09c \uc138 \uac1c\uc758 \ubb38\uc11c\uac00 \uae30\uc874 OpenGL \ud638\ucd9c \ucf54\ub4dc\ub4e4\uc744 \ud074\ub798\uc2a4 \ub0b4\ubd80\ub85c \uc62e\uaca8\uc11c \ub9ac\ud329\ud130\ub9c1 \ud558\ub294 \uac83\uc774 \uc8fc \ub0b4\uc6a9\uc774\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,t.jsx)(e.p,{children:"\uadf8\ub798\ud53d\uc2a4 \uc774\ub860 \uad00\ub828 \ub0b4\uc6a9\uc774 \uc544\ub2c8\ub77c \uc0dd\uac01\ud558\uc2dc\uace0 \ucca8\ubd80\ub41c \uc18c\uc2a4 \ucf54\ub4dc\ub9cc \ubcf4\uace0 \ub118\uc5b4\uac00\uc2dc\ub294 \ubd84\ub4e4\ub3c4 \uc788\uc73c\uc2e4 \uc218 \uc788\ub294\ub370, \ubcf5\uc2b5 \uacb8 \ud574\uc11c \uaf2d \uc77d\uc5b4 \ubcf4\uc2dc\uba74\uc11c \ub530\ub77c\uc11c \ud0c0\uc774\ud551\uc744 \ud574 \ubcf4\uc2dc\uba74, \uc2e4\ub825 \ud5a5\uc0c1\uc5d0 \ub9ce\uc740 \ub3c4\uc6c0\uc774 \ub418\uc2e4 \uac83\uc73c\ub85c \uc0dd\uac01\ud569\ub2c8\ub2e4."}),"\n",(0,t.jsx)(e.p,{children:"\ub610\ud55c \ub354 \ub098\uc544\uac00\uc11c \uc81c\uac00 \uc81c\uc2dc\ud558\ub294 \ub0b4\uc6a9\uc774 \uc815\ub2f5\uc774\ub77c\uace0 \uc0dd\uac01\ud558\uc9c0 \ub9c8\uc2dc\uace0, \uc774 \ubd80\ubd84\uc740 \uc65c \uc774\ub807\uac8c \ud588\uc744\uae4c? \ub2e4\ub978 \ubc29\uc2dd\uc73c\ub85c \ud558\ub294\uac83\uc774 \ub354 \uc88b\uc9c0 \uc54a\uc744\uae4c? \uac19\uc740 \uc0dd\uac01\ub4e4\uc744 \uc2a4\uc2a4\ub85c \ud574 \ubcf4\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4. \uacb0\uad6d \uc774\ub7ec\ud55c \uace0\ubbfc\ub4e4\uc744 \ub9ce\uc774 \ud574 \ubcf8 \uc0ac\ub78c\uacfc \uadf8\ub807\uc9c0 \uc54a\uc740 \uc0ac\ub78c\ub4e4\uc740 \ub9ce\uc740 \ucc28\uc774\ub97c \ub098\ud0c0\ub0b4\uac8c \ub429\ub2c8\ub2e4."}),"\n",(0,t.jsx)(e.h2,{id:"\uc5f0\uc2b5-\ubb38\uc81c",children:"\uc5f0\uc2b5 \ubb38\uc81c"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\uc5c6\uc74c"}),"\n"]}),"\n",(0,t.jsx)(e.hr,{}),"\n",(0,t.jsx)(e.h2,{id:"\uad00\ub828-\ub9c1\ud06c",children:"\uad00\ub828 \ub9c1\ud06c"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:n(3668).A+"",children:"\ucd5c\uc885 \ucf54\ub4dc(zip)"})}),"\n"]})]})}function h(r={}){const{wrapper:e}={...(0,s.R)(),...r.components};return e?(0,t.jsx)(e,{...r,children:(0,t.jsx)(c,{...r})}):c(r)}},3668:(r,e,n)=>{n.d(e,{A:()=>t});const t=n.p+"assets/files/src-b8d00cbec55f1a51e6b9f3d77cf3083a.zip"},8453:(r,e,n)=>{n.d(e,{R:()=>a,x:()=>i});var t=n(6540);const s={},d=t.createContext(s);function a(r){const e=t.useContext(d);return t.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function i(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(s):r.components||s:a(r.components),t.createElement(d.Provider,{value:e},r.children)}}}]);