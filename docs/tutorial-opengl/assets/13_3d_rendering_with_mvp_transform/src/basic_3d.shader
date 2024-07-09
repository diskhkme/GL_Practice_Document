#shader vertex
#version 330 core

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec4 a_color;

out vec4 v_color;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

void main()
{
	gl_Position = u_projection * u_view * u_model * a_position;
	v_color = a_color;
};

#shader fragment
#version 330 core

layout(location = 0) out vec4 out_color;

in vec4 v_color;

void main()
{
	out_color = v_color;
};