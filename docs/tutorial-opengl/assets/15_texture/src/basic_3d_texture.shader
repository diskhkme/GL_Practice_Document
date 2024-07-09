#shader vertex
#version 330 core

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec2 a_texcoord;

out vec2 v_texcoord;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

void main()
{
	gl_Position = u_projection * u_view * u_model * a_position;
	v_texcoord = a_texcoord;
};

#shader fragment
#version 330 core

layout(location = 0) out vec4 out_color;

in vec2 v_texcoord;

uniform sampler2D u_texture;

void main()
{
	vec4 tex_color = texture(u_texture, v_texcoord);
	out_color = tex_color;
};